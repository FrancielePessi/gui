

// ACESSAR GUI DOJOT
Feature('Sanity CRUD');

//LOGAR COM O USUARIO ADMIN
Scenario('@San: LOGIN WITH USER ADMIN', async (I) => {
Before((login) => {
   login('admin');
});
})

function openPage (I) {
    I.click(locate('a').withAttr({href: '#/auth'}));
}

// ADICIONAR UM NOVO USUARIO
Scenario('@San: ADD A NEW USER', async(I) => {
    //openPage(I)    
    I.click(locate('a').withAttr({ href: '#/auth' }));
    I.click(locate('div').withAttr({title: 'Create a new user'}))
    I.fillField('username', 'franpessi')
    I.fillField('name','franciele')
    I.fillField('email','fsilva@cpqd.com.br')
    I.fillField('confirmEmail','fsilva@cpqd.com.br')
    I.selectOption('profile', 'admin')
    I.click( locate('.footer button').withAttr({ title:"Save"}))
  I.see('User created.') 
  I.wait (3)

// DETALHES DO USUARIO
I.seeElement(locate('.card-size').find('div').withAttr({title: 'franciele'}))
I.seeElement(locate('.card-size').find('div').withAttr({title: 'franpessi'}))
I.seeElement(locate('.card-size').find('div').withAttr({title: 'fsilva@cpqd.com.br'}))

Scenario ('@San: LOGOUT: USER ADMIN', async(I) => {
I.click(locate('div').withAttr({ title: 'Login details' }))
I.click('.btn-logout')
})

Scenario ('LOIGIN: NEW USER', async(I) => {
I.fillField('username', 'franpessi')
I.fillField('password', 'temppwd')
I.click('Login')
})

// ATUALIZANDO SENHA -----> CADASTRAR SENHA DO USUARIO
I.click(locate('div').withAttr({ title: 'Login details'}))
I.click('.logout-page-changePassword')
I.fillField('oldPassword', 'temppwd')
I.fillField('password', 'temppwd1')
I.fillField('confirmPassword', 'temppwd1')
I.click('Save')
    I.see('Password updated')
    I.wait(3)


//DESLOGANDO        
I.click(locate('div').withAttr({ title: 'Login details' }))
I.click('.btn-logout')

//LOGANDO COM A NOVA SENHA   
I.fillField('username', 'franpessi')
I.fillField('password', 'temppwd1')
I.click('Login')
I.wait(3)

//DESLOGANDO: LOGIN COM O ADMIN
I.click(locate('div').withAttr({ title: 'Login details'}))
I.click('.btn-logout')
I.wait(5)
})

//LOGANDO COM O NOVO USUARIO |  ATUALIZANDO SENHA   |  LOGANDO COM A NOVA SENHA 
//Scenario('@San: logging in with the new user, updating password and logging in witch the new password', async(I) => { })

//Scenario('@San: Logging in the new password', async(I) =>{})

//ALTERAR CADSTRO DO USUARIO
Scenario('@San: CHANGE USER REGISTRATION', async(I) => {   
I.click(locate('a').withAttr({ href: '#/auth' }));
I.click('franciele')
I.fillField('name', 'FranNavarro')
I.fillField('email', 'navarro@noemail.com.br')
I.fillField('confirmEmail', 'navarro@noemail.com.br')
I.click('Save')
    I.see('User updated.')
    I.wait(3)

    //DETALHES DA ATUALIZAÇÃO DE USUARIO
    I.seeElement(locate('.card-size').find('div').withAttr({ title: 'FranNavarro' }));
    I.seeElement(locate('.card-size').find('div').withAttr({ title: 'navarro@noemail.com.br' }));
})      

// REMOVER USUÁRIO
Scenario('@San: Delete User', async(I) =>{
    I.click(locate('a').withAttr({ href: '#/auth' }));
    I.click('FranNavarro')
    I.click(locate('.footer button').withAttr ({title: "Remove"}))
    I.click(locate('.confirm-modal button').withAttr({ title: "Remove" }))
        I.see('User removed.')
        I.wait(3)
})

//TEMPLATE 
// ADICIONAR TEMPLATE COM GEO
Scenario('@basic: Creating a template GEO', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('SanityGEO');

    Template.addAttr(
        'TEMPGEO',
        Template.AttributeType.static,
        Template.AttributeValueType.geo,
        [],
        '-22.816916, -47.044647',
    );
    Template.clickSave();
    Template.seeTemplateHasCreated();
});

// ADICIONAR DEVICE ADD TEMPLATE GEO
Scenario('@San: DEVICE GEO', async(I) => {
    I.click(locate('a').withAttr({ href: '#/device' }));
    I.click(locate('a').withAttr({ title: 'Create a new device'}));
    I.fillField('name', 'SanityGEO')
    I.click(locate('.button').withAttr('add-template-button'))


})

// ATUALIZADOR DE FIRMWARE - HABILITAR GERENCIADOR DE FIRMWARE
Scenario('@San: FIRMWARE UPDATE - ENABLE FIRMWARE MANAGER', async(I) => {
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

    
Scenario('@San: FIRMWARE UPDATE - CONFIGURE SPECIFIC PARAMETERS')
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

// ATUALIZADOR DE FIRMWARE - DESABILITAR GERENCIADOR DE FIRMWARE
Scenario('@San: FIRMWARE UPDATE - DISABLE FIRMWARE MANAGER', async(I) => {
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

// ATUALIZADOR DE FIRMWARE - CRIAR NOVA IMAGEM COM BINÁRIO ASSOCIOADO  



// FLUXO
Scenario('@basic: Creating a simple flow', async (I, Flow, Device, Notification) => {
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
    const totalBefore = await Notification.totalOfMessagesWithText('output value');
    //const totalBefore = await Notification.totalOfMessagesWithText('Texto');
    await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    I.wait(5);

    await Notification.shouldISeeMessagesWithText('output value', totalBefore + 1); 
    //await Notification.shouldISeeMessagesWithText('Texto', totalBefore + 1); 
});



