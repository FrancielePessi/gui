const Utils = require('../Utils');

Feature('Tenant verification');

newUser = () => ({
    name: 'Random Morty',
    username: `a${Utils.sid()}`,
    service: `a${Utils.sid()}`,
    email: `${Utils.sid()}@noemail.com`,
    profile: 'admin',
});

const jsonTemplate = {
    label: 'String Template',
    attrs: [
        {
            label: 'text',
            type: 'dynamic',
            value_type: 'string',
        },
    ],
};


async function CreateTemplateAndDeviceByJSON(I, templ, dev) {
    const template = await I.createTemplate(templ);
    I.wait(1);
    const templateId = template.template.id;
    I.wait(1);
    const device = await I.createDevice({
        templates: [templateId],
        label: dev,
    });
    I.wait(1);
    return device.devices[0].id;
}

function checkMessage(I, Device, deviceId, msg) {
    I.amOnPage(`#/device/id/${deviceId}/detail`);
    I.wait(2);
    Device.selectAttr('text');
    I.wait(3);
    Device.shouldSeeMessage(msg);
}

function checkingTenant(I, tenant) {
    I.click(locate('div').withAttr({ title: 'Login details' }));
    I.wait(1);
    I.seeElement(locate('.logout-page-info').withText(tenant));
    I.wait(1);
    I.click(locate('div').withAttr({ title: 'Login details' }));
    I.wait(1);
}

function logout(I) {
    I.click(locate('div').withAttr({ title: 'Login details' }));
    I.wait(1);
    I.click('.btn-logout');
    I.wait(3);
}

function genericLogin(I, username, pass = 'temppwd') {
    logout(I);
    I.wait(1);
    I.see('Sign in');
    I.wait(1);
    I.fillField('Username', username);
    I.wait(1);
    I.fillField('Password', pass);
    I.wait(1);
    I.click('Login');
    I.wait(3);
}

/*
    This scenario checks if a new user inherits the parent's tenant. Besides that, 
    checks when an admin changes the user metadata, the tenant still the same.
*/

Scenario('@adv: Checking child tenant equals parent tenant', async (I, Commons, User) => {
    // At first, do login
    I.loginAdmin(I, false);

    // Create a user A using API with a different tenant
    // 1. create User A
    const jUserA = newUser();
    I.wait(1);
    const jUserB = newUser();
    I.wait(1);
    await I.createUser(jUserA);
    I.wait(1);

    // Logout and Login user A
    genericLogin(I, jUserA.username);
    I.wait(1);

    // Create via GUI user B
    User.init(I);
    I.wait(1);
    User.openUserPage();
    I.wait(1);
    User.clickCreateNew();
    I.wait(1);
    User.fillAndSave(jUserB);
    I.wait(1);
    User.seeHasCreated();
    I.wait(1);

    // Logout and Login user B
    genericLogin(I, jUserB.username);
    I.wait(1);
    // Check with user B has the same tenant than user A
    checkingTenant(I, jUserA.service);
    I.wait(1);
    // Login admin
    genericLogin(I, 'admin', 'admin');
    I.wait(1);
    // Edit user B
    User.openUserPage();
    I.wait(1);
    Commons.clickCardByName(jUserB.name);
    I.wait(1);
    User.fillEmailAndSave(`w${Utils.sid()}@noemail.com`);
    I.wait(1);
    User.seeHasUpdated();
    I.wait(1);

    // Logout and Login user B
    genericLogin(I, jUserB.username);
    I.wait(1);
    // Check with user B has the same tenant than user A
    checkingTenant(I, jUserA.service);
    I.wait(1);

    // back to admin
    genericLogin(I, 'admin', 'admin');
    I.wait(1);
    User.openUserPage();

    // remove user A
    Commons.clickCardByName(jUserA.name);
    I.wait(1);
    User.clickRemove();
    I.wait(1);
    User.confirmRemove();
    I.wait(1);
    User.seeHasRemoved();
    I.wait(3);

    // remove user B
    Commons.clickCardByName(jUserB.name);
    I.wait(1);
    User.clickRemove();
    I.wait(1);
    User.confirmRemove();
    I.wait(1);
    User.seeHasRemoved();
    I.wait(1);

    logout(I);
    I.wait(1);
});


Scenario('@adv: Checking message in 2 tenants', async (I, Device) => {
    // At first, do login
    I.loginAdmin(I, false);
    I.wait(1);

    // create variables
    Device.init(I);
    I.wait(1);
    genericLogin(I, 'admin', 'admin');
    I.wait(1);

    const deviceA = 'device A';
    I.wait(1);
    const deviceB = 'device B';
    I.wait(1);
    const userA = newUser();
    I.wait(1);
    const userB = newUser();
    I.wait(1);
    let deviceId = 0;
    I.wait(1);

    // 1. create User A
    await I.createUser(userA);
    I.wait(1);

    // 2. create User B
    await I.createUser(userB);
    I.wait(1);

    // 3 .Login user A
    genericLogin(I, userA.username);
    I.wait(1);

    // 4. create Template and Device for User A
    const templateA = jsonTemplate;
    I.wait(1);
    templateA.label = 'template A';
    I.wait(1);
    deviceId = await CreateTemplateAndDeviceByJSON(I, templateA, deviceA);
    I.wait(1);

    // 5. Checking devices
    Device.clickOpenDevicePage();
    I.wait(1);
    I.refreshPage();
    I.wait(1);
    Device.checkExistCard(deviceA);
    I.wait(1);
    Device.checkNonExistCard(deviceB);
    I.wait(1);
    
    // 6. Send Message in User A device, to go detail page and check the message
    await I.sendMQTTMessage(deviceId, '{"text": "data A"}', userA.service);
    I.wait(1);
    checkMessage(I, Device, deviceId, 'data A');
    I.wait(1);

    // 7. login User B
    genericLogin(I, userB.username);
    I.wait(1);

    // 8. create Template and Device for User B
    const templateB = jsonTemplate;
    I.wait(1);
    templateB.label = 'template B';
    I.wait(1);
    deviceId = await CreateTemplateAndDeviceByJSON(I, templateB, deviceB);
    I.wait(1);

    // 9. Checking devices
    Device.clickOpenDevicePage();
    I.wait(1);
    I.refreshPage();
    I.wait(1);
    Device.checkExistCard(deviceB);
    I.wait(1);
    Device.checkNonExistCard(deviceA);
    I.wait(1);

    // 10. Send Message in User B device, to go detail page and check the message
    await I.sendMQTTMessage(deviceId, '{"text": "data B"}', userB.service);
    I.wait(1);
    checkMessage(I, Device, deviceId, 'data B');
    I.wait(1);

    logout(I);
});
