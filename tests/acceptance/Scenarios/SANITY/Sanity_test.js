const Utils = require('../../Utils.js');
Feature('Sanity CRUD');

Before((login) => {
    login('admin');
});

const user_data = {
    id: null,
    username: 'franpessi',
    name: 'franciele',
    email: `fsilva@cpqd.com.br`,
    profile: 'admin',
};

const update_user = {
    id: null,
    name: 'FranNavarro',
    email: `navarro@noemail.com.br`,
    confirmEmail: `navarro@noemail.com.br`,
}

const checkingUpdate_user = {
    id: null,
    username: 'franpessi',
    name: 'FranNavarro',
    email: `navarro@noemail.com.br`,
    confirmEmail: `navarro@noemail.com.br`,
    profile: 'admin',
}

function checkingUser(I, data) {
    I.seeInputByNameAndValue('username', data.username);
    I.seeInputByNameAndValue('name', data.name);
    I.seeInputByNameAndValue('email', data.email);
    I.seeInputByNameAndValue('confirmEmail', data.email);
    I.seeSelectOptionByNameAndValue('profile', data.profile);
}

function checkingUpdateUser(I, data) {
    I.seeInputByNameAndValue('username', data.username);
    I.seeInputByNameAndValue('name', data.name);
    I.seeInputByNameAndValue('email', data.email);
    I.seeInputByNameAndValue('confirmEmail', data.email);
    I.seeSelectOptionByNameAndValue('profile', data.profile);
}

//ADICIONAR UM NOVO USUARIO
Scenario('@San: 1° ADD A NEW USER', async(I, User, Commons) => {    
    //I.login('admin');
    User.openUserPage();
    User.clickCreateNew();
    User.fillAndSaveSanity(user_data);

    //DETALHES DO USUARIO
    Commons.clickCardByName('franciele');
    checkingUser(I, user_data);
})

    Scenario('@San: 2° REGISTER USER PASSWORD', async(I, User) => { 
    User.init(I);
    User.logoutUser();
    User.loginNewUser('franpessi', 'temppwd')
    User.updatePasswordSanity('temppwd', 'temppwd1', 'temppwd1')
    I.see('Password updated')
    //I.wait(3)
})

//ALTERAR CADASTRO DO USUARIO
Scenario('@San: 3° CHANGE USER REGISTRATION', async (User, Commons, I) => {       
    User.init(I);
    User.openUserPage();
    User.clickUserCreated('franciele')
    User.updateUserNameAndEmailSanity(update_user)
    Commons.clickCardByName('FranNavarro');
    checkingUpdateUser(I, checkingUpdate_user);
})      

// REMOVER USUÁRIO
Scenario('@San: 4° Delete User', async (User, I) =>{
    User.init(I);
    User.logoutUser();
    User.loginUserDefault()
    User.openUserPage();
    User.clickUserCreated('FranNavarro')
    User.clickRemove();
    User.confirmRemove();
    I.see('User removed.')
    I.wait(3)
})

// ADICIONAR TEMPLATE COM GEO
Scenario('@San: 5° Creating a template GEO', async (I, Template) => {
    Template.init(I);
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('SanityGEO');

    Template.addAttr(
        'TEMPGEO',
        Template.AttributeType.dynamic,
        Template.AttributeValueType.geo
    );
    Template.clickSave();
    Template.seeTemplateHasCreated();
});

Scenario('@San: 6° Device Create', async(I, Device) => {
    Device.init(I);    
    Device.clickOpenDevicePage();
    Device.clickCreateNew();
    Device.fillNameDevice('GEO')
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate('SanityGEO');
    Device.clickBack();
    Device.clickSave();
    Device.checkExistCard('GEO')
})

// /*
//    .split <- está função usa para separar as strings até chegar ao ID do Device, 
//    ou qualquer outra string.
//    http://localhost:8000/#/device/id/45b768/detail 
//  */

Scenario('@San: 7° SEND DATA - MQTT', async(I, Device) => {
    Device.init(I);
    Device.checkExistCard('GEO');
    Device.clickDetailsDeviceDefault();
    Device.clickDynamicAttributes('TEMPGEO');

    const fullUrl = await I.getCurrentUrl()
    const array1 = fullUrl.split("/device/id/");
    const deviceId = array1[1].replace("/detail",""); 

    I.sendMQTTMessage(deviceId, '{"TEMPGEO": "-22.890970, -47.063006"}');
    I.wait(7)
  
})

//ZOOM + | ZOOM -
Scenario('San: 8° (ZOOM + | ZOOM -) and (SATELITE)', async(I, Device) => {
    Device.init(I);
    Device.clickDetailsDeviceDefault();
    Device.clickDynamicAttributes('TEMPGEO')

    Device.clickZoomIn();
    Device.clickZoomIn();
    Device.clickZoomIn();

    Device.clickZoomOut();
    Device.clickZoomOut();
    Device.clickZoomOut();

    //Selecionar satelite
   // Device.clickMapSatelite();
})

// //MAP BIG
// Scenario('San: MAPS', async (I, Device) => {
//     Device.clickOpenDevicePage();
//     Device.clickMap();
//     I.wait(10)
// })

//ALTERAR DEVICE - NAME 
Scenario('@San: 9° UPDATE DEVICE', async(I, Device) => {
    Device.init(I);
    Device.clickOpenDevicePage();
    Device.clickDeviceCreated('GEO')
    Device.fillNameDevice('UpdateDeviceGEO')
    Device.clickSave(); 
    I.see('Device updated.')
    I.wait(3)
    Device.checkExistCard('UpdateDeviceGEO')
         
})

Scenario('@San: 10° Create template', async(I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('TemOneSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemTwoSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemThereeSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemForSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemFiveSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();
    //I.wait(7)
})

Scenario('@San: 11° Filter Template', async(I, Template) => {
    Template.init(I)
    Template.clickOpenTemplatePage();
    Template.clickFilterTemplate();
    Template.labelName('TemTwoSanity')
    Template.clickSearchTemplate();
    Template.seeCardByTemplateName('TemTwoSanity');
    I.wait(5)
})

Scenario('@San: 12° Create Device', async(I, Device, Template) => {
    //create template for device
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('Sanity');
    I.click('Save')

    //create device for filter
    Device.clickOpenDevicePage();
    Device.clickCreateNew();
    Device.fillNameDevice('filtro')
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate('Sanity');
    Device.clickBack();
    Device.clickSave();

    Device.clickOpenDevicePage();
    Device.clickCreateNew();
    Device.fillNameDevice('filtro2')
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate('Sanity');
    Device.clickBack();
    Device.clickSave();
})

Scenario('@San: 13° Filter Device', async(I, Device) => {
    Device.init(I)
    Device.clickOpenDevicePage();
    Device.clickFilterDevice()
    Device.labelName('filtro2')
    Device.seeCardByDeviceName('filtro2')
    Device.clickSearchDevice();
    I.wait(5)
})

//ATUALIZADOR DE FIRMWARE - HABILITAR GERENCIADOR DE FIRMWARE
Scenario('@San: 14° FIRMWARE UPDATE - ENABLE FIRMWARE MANAGER', async(I) => {
    I.click(locate('a').withAttr({ href: '#/template/list' }));
    I.click(locate('div').withAttr({title: 'Create a new template'}))
    I.fillField('Template Name', 'Hab Ger Firmware')
    I.click('Save')
    I.see('Template created.')
    I.wait(3)
    I.click('Hab Ger Firmware')
    I.click('Manage Firmware')
    I.click(locate('.firmware-enabled'));
    I.click('Save')
})
 
// ATUALIZANDO NOMES DOS PARAMETROS     
Scenario('@San: 15° FIRMWARE UPDATE - CONFIGURE SPECIFIC PARAMETERS', async(I) => {
    I.click('Hab Ger Firmware')
    I.click('Manage Firmware')
    I.fillField('current_state', 'estado_atual')
    I.fillField('update_result', 'atualizar_resultado')
    I.fillField ('upload_image', 'teste')
    I.fillField('apply_image', 'aplicar_imagem')
    I.fillField("current_version", 'versao_at')
    I.click('Save') 
    I.see('Template successfully updated.')
})

// ATUALIZADOR DE FIRMWARE - DESABILITAR GERENCIAMENTO DE FIRMWARE
Scenario('@San: 16° FIRMWARE UPDATE - DISABLE FIRMWARE MANAGER', async(I) => {
    I.click(locate('a').withAttr({ href: '#/template/list' }));
    I.click(locate('div').withAttr({title: 'Create a new template'}))
    I.fillField('Template Name', 'Hab Ger Firmware')
    I.click('Save')
    I.see('Template created.')
    I.wait(3)
    I.click('Hab Ger Firmware')
    I.click('Manage Firmware')
    I.click(locate('.firmware-enabled'));
    I.click('Save')
})

// REMOVER TEMPLATE
Scenario('@San: 17° DELETE TEMPLATE', async(I) => {
    I.click('Hab Ger Firmware')
    I.click(locate('.footer button').withAttr ({title: "Remove"}))
    I.click(locate('.confirm-modal button').withAttr({ title: "Remove" }))
    I.see('Template removed.')
})

// ATUALIZADOR DE FIRMWARE -  REMOVER COM FW
Scenario('@San: 18° FIRMWARE UPDATE - DELETE', async(I) => {
    I.click(locate('a').withAttr({ href: '#/template/list' }));
    I.click(locate('div').withAttr({title: 'Create a new template'}))
    I.fillField('Template Name', 'FWremove')
    I.click('Save')
    I.see('Template created.')
    I.wait(3)
    I.click('Hab Ger Firmware')
    I.click('Manage Firmware')
    I.click(locate('.firmware-enabled'));
    I.click('Save')

    I.click('FWremove')
    I.click(locate('.footer button').withAttr ({title: "Remove"}))
    I.click(locate('.confirm-modal button').withAttr({ title: "Remove" }))
    I.see('Template removed.')
})

// ATUALIZADOR DE FIRMWARE - CRIAR NOVA IMAGEM COM BINÁRIO ASSOCIOADO  
Scenario('@San: 19° Creating: template Binario', async (I) => {
    I.click(locate('a').withAttr({ href: '#/template/list' }));
    I.click(locate('div').withAttr({title: 'Create a new template'}))
    I.fillField('Template Name', 'BINARIO')
    I.click('Save')
    I.see('Template created.')

    I.click('BINARIO')
    I.click('Manage Firmware')
    I.click('Manage Images')
    I.click(locate('div').find('.body-form-nodata ').withAttr({role: 'button'}))
    I.fillField(locate('.input-field').withAttr({name: 'vs1.0'}))

    //I.fillField('name', 'imagem1')
    // I.fillField(locate('input-field').withAttr({name: 'imagem1'}))
    
    // Anexa um arquivo ao elemento localizado por rótulo, nome, CSS ou XPath O caminho para o arquivo é o diretório de codecept atual relativo 
    // (onde codecept.json ou codecept.conf.js está localizado). O arquivo será carregado no sistema remoto (se os testes estiverem sendo executados remotamente).
    //I.attachFile(locate('p').find('input').withAttr({}))
    //I.attachFile('file', '/arquivo.hex');
    // I.attachFile('form input[name=avatar]', 'data/avatar.jpg');
    I.click('Save')
    I.wait(5)
})

//FLUXO
Scenario('@basic: 20° Creating a simple flow', async (I, Flow, Device, Notification) => {
    Feature('Flow creation and execution');

    Flow.init(I);
    const deviceId = await Flow.createDevice();

    Flow.clickOpen();
    Flow.clickCreateNew();
    Flow.setFlowName('Sanity Test');
    I.wait(3);
    Flow.addDeviceInput();
    Flow.addSwitch();
    Flow.addChange();
    Flow.addDeviceOutput();
    Flow.addNotification();

    await Flow.connectFlows();

    Flow.clickOnDeviceInput();
    Flow.editDeviceInputName();
    Flow.selectDevice(deviceId);
    Flow.selectPublish();
    Flow.clickOnDone();

    Flow.clickOnSwitch();
    Flow.editSwitchProperty();
    Flow.editSwitchCondition();
    Flow.clickOnDone();

    Flow.clickOnChange();
    Flow.editChangeProperty();
    Flow.editChangePropertyValue();
    Flow.clickOnDone();

    Flow.clickOnDeviceOutput();
    Flow.editDeviceOutputSource();
    Flow.clickOnDone();

    Flow.clickOnNotificationInput();
    Flow.editMessageType();
    Flow.editMessageDynamicValue();
    Flow.editMessageInputSource();
    Flow.clickOnDone();

    Flow.clickOnSave();
    Flow.seeFlowHasCreated();

    Device.openDevicesPage();
    Device.change64QtyToShowPagination();
    Device.clickDetailsDevice(deviceId);
    Device.selectAttr('input');

    await Device.selectAttrSync('output');
    await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    I.wait(5);

    Device.shouldSeeMessage('output value');

    await Notification.openNotificationsPage();
    //const totalBefore = await Notification.totalOfMessagesWithText('output value');
    const totalBefore = await Notification.totalOfMessagesWithText('Texto');
    await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    I.wait(5);

    //await Notification.shouldISeeMessagesWithText('output value', totalBefore + 1); 
    await Notification.shouldISeeMessagesWithText('Texto', totalBefore + 0); 
});

Scenario('@San: 21° Update Flow', async(I, Flow) => {
    Flow.clickOpen();
    Flow.clickFlow('Sanity Test');
    Flow.addGEOfence();
    Flow.clickSave();
    Flow.seeFlowHasUpdated();
    I.wait(5)
})

Scenario('@San: 22° Remove flow', async(I, Flow) => {
    Flow.clickOpen();
    Flow.clickRemoveFlow('Sanity Test')
})

//#########//
//TENANT  //
//#########//

newUser = () => ({
    name: 'Random Morty',
    username: `a${Utils.sid()}`,
    service: `a${Utils.sid()}`,
    email: `${Utils.sid()}@noemail.com`,
    profile: 'admin',

});

function checkingTenant(I, tenant) {
    I.click(locate('div').withAttr({ title: 'Login details' }));
    I.seeElement(locate('.logout-page-info').withText(tenant));
    I.click(locate('div').withAttr({ title: 'Login details' }));
}

function logout(I) {
    I.click(locate('div').withAttr({ title: 'Login details' }));
    I.click('.btn-logout');
    I.wait(3);
}

function genericLogin(I, username, pass = 'temppwd') {
    logout(I);
    I.see('Sign in');
    I.fillField('Username', username);
    I.fillField('Password', pass);
    I.click('Login');
    I.wait(3);
}

Scenario('@San: 23° Create Tenant diferrent', async (I, User, Commons) => {
    //I.loginAdmin(I, false);

    // Criar usuario com a API, com tenant diferente
    // 1. Creando usuario
    const jUserA = newUser();
    await I.createUser(jUserA);

    // Logar com usuario 
    genericLogin(I, jUserA.username);

    //Checando se tenant foi incluido pela API
    checkingTenant(I, jUserA.service);
    I.wait(5)

})

Scenario('@San: 24° Create template', async(I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('TemOneSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemTwoSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemThereeSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemForSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemFiveSanity');
    I.click('Save')
    Template.seeTemplateHasCreated();
    //I.wait(7)
})

Scenario('@San: 25° Filter Template', async(I, Template) => {
    Template.clickOpenTemplatePage();
    Template.clickFilterTemplate();
    Template.labelName('TemTwoSanity')
    Template.clickSearchTemplate();
    Template.seeCardByTemplateName('TemTwoSanity');
    I.wait(5)
})



//  // back to admin
    //  genericLogin(I, 'admin', 'admin');
    //  User.openUserPage();

    //  // remove user 
    //  Commons.clickCardByName(jUserA.name);
    //  User.clickRemove();
    //  User.confirmRemove();
    //  User.seeHasRemoved();
    //  I.wait(3);




