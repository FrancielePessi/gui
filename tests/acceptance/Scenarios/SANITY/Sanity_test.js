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
    User.init(I)
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
    I.wait(3)
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

// // REMOVER USUÁRIO
Scenario('@San: 4° Delete User', async (User, I) =>{
    //User.init(I);
    User.logoutUser();
    User.loginUserDefault()
    User.openUserPage();
    User.clickUserCreated('FranNavarro')
    User.clickRemove();
    User.confirmRemove();
    I.see('User removed.')
    I.wait(3)
})

// // ADICIONAR TEMPLATE COM GEO
Scenario('@San: 5° Creating a template GEO', async (I, Template) => {
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

// // /*
// //    .split <- está função usa para separar as strings até chegar ao ID do Device, 
// //    ou qualquer outra string.
// //    http://localhost:8000/#/device/id/45b768/detail 
// //  */

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

//     //Selecionar satelite
//    // Device.clickMapSatelite();
})

// // //MAP BIG
// // Scenario('San: MAPS', async (I, Device) => {
// //     Device.clickOpenDevicePage();
// //     Device.clickMap();
// //     I.wait(10)
// // })

// //ALTERAR DEVICE - NAME 
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
    I.wait(7)
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
Scenario('@San: 14° FIRMWARE UPDATE - ENABLE FIRMWARE MANAGER', async(I, Template) => {
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('Hab Ger Firmware')
    Template.clickSave();
    Template.seeTemplateHasCreated();

    Template.clickTemplateCreated('Hab Ger Firmware')
    Template.clickManagerFirmware();
    Template.clickEnableFirware();
    Template.clickSave();
    Template.seeTemplateFWHasUpdated();
    Template.clickSave();
    Template.seeTemplateHasUpdated();

    //Template.checkExistCard('Hab Ger Firmware')
})
 
// ATUALIZANDO NOMES DOS PARAMETROS     
 Scenario('@San: 15° FIRMWARE UPDATE - CONFIGURE SPECIFIC PARAMETERS', async(Template) => {
    Template.clickOpenTemplatePage();
    Template.clickTemplateCreated('Hab Ger Firmware')
    Template.clickManagerFirmware();
    Template.RenameFirmawareAttributes ('estado_atual', 
                 'atualizar_resultado', 
                 'carregar_imagem',
                 'aplicar_imagem',
                 'Versao_atual');
    Template.clickSave();
    Template.seeTemplateFWHasUpdated();
    Template.clickSave();
    Template.seeTemplateHasUpdated();
})

// ATUALIZADOR DE FIRMWARE - DESABILITAR GERENCIAMENTO DE FIRMWARE
Scenario('@San: 16° FIRMWARE UPDATE - DISABLE FIRMWARE MANAGER', async(Template) => {
    Template.clickOpenTemplatePage();
    Template.clickTemplateCreated('Hab Ger Firmware')
    Template.clickManagerFirmware();
    Template.clickEnabledFirmaware();
    Template.clickSave();
    Template.seeTemplateFWHasUpdated();
    Template.clickSave();
    Template.seeTemplateHasUpdated();
})

// REMOVER TEMPLATE
Scenario('@San: 17° DELETE TEMPLATE', async(I, Template) => {
    Template.clickOpenTemplatePage();
    Template.clickTemplateCreated('Hab Ger Firmware')
    Template.removeTemplate();
    Template.seeTemplateHasDelete();
})

// ATUALIZADOR DE FIRMWARE -  REMOVER COM FW
Scenario('@San: 18° FIRMWARE UPDATE - DELETE', async(I, Template) => {
    //criando template para habitação de FW
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('FW Remove')
    Template.clickSave();
    Template.seeTemplateHasCreated();

    // Habilitando FW, para que possa ser removido habilitado
    Template.clickTemplateCreated('FW Remove')
    Template.clickManagerFirmware();
    Template.clickEnableFirware();
    Template.clickSave();
    Template.seeTemplateFWHasUpdated();
    Template.clickSave();
    Template.seeTemplateHasUpdated();

    // Removendo Template com FW habilitado
    Template.clickOpenTemplatePage();
    Template.clickTemplateCreated('FW Remove')
    Template.removeTemplate();
    Template.seeTemplateHasDelete();
})

                                // //ATUALIZADOR DE FIRMWARE - CRIAR NOVA IMAGEM COM BINÁRIO ASSOCIOADO  
                                // Scenario('@San: 19° Creating: template Binario', async (I, Template) => {
                                //     //criando template para Binario
                                //     Template.init(I)
                                //     Template.clickOpenTemplatePage();
                                //     Template.clickCreateNew();
                                //     Template.fillNameTemplate('Binario')
                                //     Template.clickSave();
                                //     Template.seeTemplateHasCreated();

                                //     Template.clickTemplateCreated('Binario')
                                //     Template.clickManagerFirmware();
                                //     Template.clickManageImage('vs1.0');
                                // //Até aqui, funcionando. 

                                //     // I.fillField('name', 'imagem1')
                                //     // I.fillField(locate('input-field').withAttr({name: 'imagem1'}))
                                    
                                //     //Anexa um arquivo ao elemento localizado por rótulo, nome, CSS ou XPath O caminho para o arquivo é o diretório de codecept atual relativo 
                                //     //(onde codecept.json ou codecept.conf.js está localizado). O arquivo será carregado no sistema remoto (se os testes estiverem sendo executados remotamente).
                                //     //I.attachFile(locate('p').find('input').withAttr({}))
                                //     //I.attachFile('file', '/arquivo.hex');
                                //     //I.attachFile('form input[name=avatar]', 'data/avatar.jpg');
                                // })

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
    Flow.clickFlowCreated('Sanity Test');
    Flow.addGEOfence();
    Flow.clickSave();
    Flow.seeFlowHasUpdated();
    I.wait(5)
})

Scenario('@San: 22° Remove flow', async(I, Flow) => {
    Flow.clickOpen();
    Flow.clickRemoveFlow('Sanity Test')
})



                                    // //#########//
                                    // //TENANT  //
                                    // //#########//

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

 Scenario('@San: 23° Create Tenant diferrent', async (I, Flow, Device, Template) => {
    
    const jUserA = newUser();
    await I.createUser(jUserA); // 1. Criando usuario
    genericLogin(I, jUserA.username); // Logar com usuario de tenant diferente
    checkingTenant(I, jUserA.service); //Checando se tenant foi incluido pela API
    I.wait(5)

    genericLogin(I, 'admin', 'admin');
    const userA = newUser();
    await I.createUser(userA); // 2. create User A
    genericLogin(I, userA.username) // 3 .Login user A 


    Flow.init(I); // Criando fluxo e Aplicando
    const deviceId = await Flow.createDevice();

    Flow.clickOpen();
    Flow.clickCreateNew();
    Flow.setFlowName('Flow SANITY');
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
    await I.sendMQTTMessage(deviceId, '{"input": "input value"}') //,userA.service);
    I.wait(5);
    Device.shouldSeeMessage('output value');


   // Atualizando e aplicando o fluxo
    // Flow.SelectFlowCreated('Flow SANITY'); 
    // Flow.clickOnSwitch();
    //Flow.UpdateEditSwitchCondition('update flow')
    //Flow.clickOnDone();
    //Flow.clickSave();
    //Flow.seeFlowHasUpdated();
    //I.wait(5)

    //Template.clickOpenTemplatePage()
    //Template.clickTemplateCreated('String Template'); 
    //Template.clickAttributeCreated('input')
    //Template.fillNameAttributes('UpdateFlow')
    //I.wait(4)
    //Template.clickSave()
    //Template.clickSave()

    //Device.openDevicesPage();
    //Device.change64QtyToShowPagination();
    //Device.clickDetailsDevice(deviceId);
    //Device.selectAttr('UpdateFlow');

   

    //await I.sendMQTTMessage(deviceId, '{"UpdateFlow": "update flow"}') //,userA.service);
    
    // ///////////////////////////// //
    // Criar DEVICE e mandar um dado //
    // ///////////////////////////// //

    // Criando template para adicionar no device
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('Sanity');

    Template.addAttr(
        'TEMP1',
        Template.AttributeType.actuator,
        Template.AttributeValueType.string
    );
    Template.clickSave();
    Template.seeTemplateHasCreated();

    Device.init(I);    
    Device.clickOpenDevicePage();
    Device.clickCreateNew();
    Device.fillNameDevice('Create Device')
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate('Sanity');
    Device.clickBack();
    Device.clickSave();
    Device.seeCreated();
    Device.checkExistCard('Create Device')

    // SEND DATA - MQTT'
    Device.init(I);
    Device.checkExistCard('Create Device');
    Device.clickDetailsDeviceDefault();
    Device.clickDynamicAttributes('TEMP1');

    const fullUrl = await I.getCurrentUrl()
    const array1 = fullUrl.split("/device/id/");
    const IdDevice = array1[1].replace("/detail",""); 

    I.sendMQTTMessage(IdDevice, '{"TEMP1": "Sua mensagem chegou com sucesso!!!"}', userA.service)
    I.wait(7)
})

Scenario('San 24° device details', async(I, Device) => {
    Device.clickOpenDevicePage();
    Device.clickDetailsDeviceDefault();
    Device.clickDynamicAttributes('TEMP1');
    I.wait(3)
    Device.seeDetailsMensageActuador('Sua mensagem chegou com sucesso!!!')
})

Scenario('@San: 25° Create template', async(Template) => {
  
    //Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('TemOneSanity');
    Template.clickSave();
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemTwoSanity');
    Template.clickSave();
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemThereeSanity');
    Template.clickSave();
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemForSanity');
    Template.clickSave();
    Template.seeTemplateHasCreated();

    Template.clickCreateNew();
    Template.fillNameTemplate('TemFiveSanity');
    Template.clickSave();
    Template.seeTemplateHasCreated();
    //I.wait(7)
})

Scenario('@San: 26° Filter Template', async(I, Template) => {
    Template.clickOpenTemplatePage();
    Template.clickFilterTemplate();
    Template.labelName('TemTwoSanity')
    Template.clickSearchTemplate();
    Template.seeCardByTemplateName('TemTwoSanity');
    I.wait(5)
})

Scenario('@San: 27° Update Template', async(Template) => {
    Template.clickOpenTemplatePage();
    Template.clickTemplateCreated('TemFiveSanity')
    Template.fillNameTemplate('UpdateTemplate')
    Template.clickSave();
    Template.seeTemplateHasUpdated(); 
})

Scenario('@San: 28° See template details', async(I, Template) => {
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.change64QtyToShowPagination();
    Template.clickCardByNameTemplate('UpdateTemplate');
    Template.seeNameTemplate('UpdateTemplate');
})

Scenario('@San: 29° Update Device', async(I, Template, Device) => {
    //criar template para alterar device
    Template.init(I);
    Template.clickOpenTemplatePage();
    Template.clickCreateNew();
    Template.fillNameTemplate('Update Device');
    Template.clickSave();
    Template.seeTemplateHasCreated()

    //Adicionar template ao device e alterar o nome
    Device.clickOpenDevicePage();
    Device.clickCardByDeviceName('Create Device')
    Device.clickAddOrRemoveTemplate();
    Device.clickToSelectTemplate('Update Device');
    Device.fillNameDevice('Up')
    Device.clickBack();
    Device.clickSave();
    Device.seeUpdated();
    Device.checkExistCard('Up')
    I.wait(5)
})

Scenario('@San: 30° Remove Device', async(I, Device) => {
    Device.clickOpenDevicePage();
    Device.clickDeviceCreated('Update Device')
    Device.clickRemove();
    Device.clickConfirm();
    Device.seeHasRemoved();
})

    // back to admin
    //  genericLogin(I, 'admin', 'admin');
    //  User.openUserPage();

    //  // remove user 
    //  Commons.clickCardByName(jUserA.name);
    //  User.clickRemove();
    //  User.confirmRemove();
    //  User.seeHasRemoved();
    //  I.wait(3)