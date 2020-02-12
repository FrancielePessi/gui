
//let steps = actor();

// ACESSAR GUI DOJOT
Feature('Sanity CRUD');

//LOGAR COM O USUARIO ADMIN
// Scenario('@San: LOGIN WITH USER ADMIN', async (I) => {

// })

Before((login) => {
    login('admin');
});

// ADICIONAR UM NOVO USUARIO
Scenario('@San: 1° ADD A NEW USER', async(I) => {
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
    I.wait (5)

    // ("DETAILS THE USER");
    I.seeElement(locate('.card-size').find('div').withAttr({title: 'franciele'}))
    I.seeElement(locate('.card-size').find('div').withAttr({title: 'franpessi'}))
    I.seeElement(locate('.card-size').find('div').withAttr({title: 'fsilva@cpqd.com.br'}))

    // ("LOGOUT - USER ADMIN")
    I.click(locate('div').withAttr({ title: 'Login details' }))
    I.click('.btn-logout')

    // ("LOGIN - NEW USER")     
    I.fillField('username', 'franpessi')
    I.fillField('password', 'temppwd')
    I.click('Login')

})

// ATUALIZANDO SENHA -----> CADASTRAR SENHA DO USUARIO
Scenario('@San: 2° UPDATE PASSWORD', async(I) =>{
    I.click(locate('div').withAttr({ title: 'Login details'}))
    I.click('.logout-page-changePassword')
    I.fillField('oldPassword', 'temppwd')
    I.fillField('password', 'temppwd1')
    I.fillField('confirmPassword', 'temppwd1')
    I.click('Save')
    I.see('Password updated')
    I.wait(3)

    // ('LOGOUT')        
    I.click(locate('div').withAttr({ title: 'Login details' }))
    I.click('.btn-logout')

    // ('LOGIN WITH THE NEW PASSWORD')   
    I.fillField('username', 'franpessi')
    I.fillField('password', 'temppwd1')
    I.click('Login')
    I.wait(3)

    //DESLOGANDO: LOGIN COM O ADMIN
    I.click(locate('div').withAttr({ title: 'Login details'}))
    I.click('.btn-logout')
    I.wait(3)

    I.fillField('username', 'admin')
    I.fillField('password', 'admin')
})

//ALTERAR CADASTRO DO USUARIO
Scenario('@San: 3° CHANGE USER REGISTRATION', async(I) => {       
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
Scenario('@San: 4° Delete User', async(I) =>{
    I.click(locate('a').withAttr({ href: '#/auth' }));
    I.click('FranNavarro')
    I.click(locate('.footer button').withAttr ({title: "Remove"}))
    I.click(locate('.confirm-modal button').withAttr({ title: "Remove" }))
    I.see('User removed.')
    I.wait(3)
})

//TEMPLATE 

// ADICIONAR TEMPLATE COM GEO
Scenario('@San: 5° Creating a template GEO', async (I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('SanityGEO');

    Template.addAttr(
        'TEMPGEO',
        Template.AttributeType.dynamic,
        Template.AttributeValueType.geo
        // ,
        // '-22.816916, -47.044647',
    );
    Template.clickSave();
    Template.seeTemplateHasCreated();
});


// ADICIONAR DEVICE - TEMPLATE GEO
Scenario('@San: 6° DEVICE GEO', async(I) => {
    I.click(locate('a').withAttr({ href: '#/device' }));
    I.click(locate('div').withAttr({ title: 'Create a new device'}));
    I.fillField('name', 'GEO')
    I.click(locate('.add-template-button'));
    I.click(locate('.template-item').withAttr({ title: 'SanityGEO' }));
    I.click(locate('.custom-button-default'))
    I.click('Save')
    I.see('Device created.')
    I.click(locate('i').withAttr({ title: 'See details'}));
    I.wait(3)
    I.click(locate('div').withAttr({ title: 'TEMPGEO'})) 
})

// ENVIAR DADOS MQTT
Scenario('@San: 7° PUBLISH DATA', async(I) => {
    const I = require ('../../steps_file/sendMQTTMessage')

    await I.sendMQTTMessage(I, '{"TEMPGEO": "-22.817209, -47.045996"}');
    I.wait(5);
})

//  ALTERAR DEVICE 
Scenario('@San: 8° UPDATE DEVICE', async(I) => {
    I.click(locate('a').withAttr({ href: '#/device' }));
    I.click('SanityGEO')

    I.fillField('UpdateDevive')
    I.click('Save')
})

//APLICAR FILTRO NA CONSULTA DE DEVICES CADASTRADOS
Scenario('@San: 9° APPLY FILTER IN THE CONSULTATION OF REGISTERED DEVICES', async(I) => {
    I.click(locate('a').withAttr({ href: '#/device' }));
   // I.click(locate('i').withAttr({ href: 'fa fa-search' }));
   I.click('.fa fa-search')
})

// ATUALIZADOR DE FIRMWARE - HABILITAR GERENCIADOR DE FIRMWARE
Scenario('@San: 10° FIRMWARE UPDATE - ENABLE FIRMWARE MANAGER', async(I) => {
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
Scenario('@San: 11° FIRMWARE UPDATE - CONFIGURE SPECIFIC PARAMETERS', async(I) => {
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
Scenario('@San: 12° FIRMWARE UPDATE - DISABLE FIRMWARE MANAGER', async(I) => {
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
Scenario('@San: 13° DELETE TEMPLATE', async(I) => {
    I.click('Hab Ger Firmware')
    I.click(locate('.footer button').withAttr ({title: "Remove"}))
    I.click(locate('.confirm-modal button').withAttr({ title: "Remove" }))
    I.see('Template removed.')
})

// ATUALIZADOR DE FIRMWARE -  REMOVER COM FW
Scenario('@San: 14° FIRMWARE UPDATE - DELETE', async(I) => {
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
Scenario('@San: 15° Creating: template Binario', async (I, Template) => {
    I.click(locate('a').withAttr({ href: '#/template/list' }));
    I.click(locate('div').withAttr({title: 'Create a new template'}))
    I.fillField('Template Name', 'BINARIO')
    I.click('Save')
    I.see('Template created.')
    I.wait(3)
})

//ASSOCIANDO BINARIO AO TEMPLATE
Scenario('@San: 16° ASSOCIATING BINARY0 - TEMPLATE', async(I) => {
    I.click('BINARIO')
    I.click('Manage Firmware')
    I.click('Manage Images')
    I.click(locate('.body-form-nodata clickable'))
    I.click('Save')
})


// FLUXO
Scenario('@basic: 17° Creating a simple flow', async (I, Flow, Device, Notification) => {
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
    await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    await Notification.shouldISeeMessagesWithText('output value', totalBefore + 1);     
});



// OUTRO TENANT 
Scenario('@San: 18° Other Tenant', async(I) => {

})


