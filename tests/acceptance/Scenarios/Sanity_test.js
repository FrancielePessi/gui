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
  I.wait (5)

// DETALHES DO USUARIO
I.seeElement(locate('.card-size').find('div').withAttr({title: 'franciele'}))
I.seeElement(locate('.card-size').find('div').withAttr({title: 'franpessi'}))
I.seeElement(locate('.card-size').find('div').withAttr({title: 'fsilva@cpqd.com.br'}))

//LOGOUT DO USUARIO ADMIN
I.click(locate('div').withAttr({ title: 'Login details' }))
I.click('.btn-logout')

// LOGAR COM O NOVO USUARIO
I.fillField('username', 'franpessi')
I.fillField('password', 'temppwd')
I.click('Login')

// ATUALIZANDO SENHA -----> CADASTRAR SENHA DO USUARIO
I.click(locate('div').withAttr({ title: 'Login details'}))
I.click('.logout-page-changePassword')
I.fillField('oldPassword', 'temppwd')
I.fillField('password', 'temppwd1')
I.fillField('confirmPassword', 'temppwd1')
I.click('Save')
    I.see('Password updated')
    I.wait(5)

//DESLOGANDO        
I.click(locate('div').withAttr({ title: 'Login details' }))
I.click('.btn-logout')

//LOGANDO COM A NOVA SENHA   
I.fillField('username', 'franpessi')
I.fillField('password', 'temppwd1')
I.click('Login')
I.wait(5)

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
    I.wait(5)

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

// ADICIONAR TEMPLATE 
Scenario('@San: TEMPLATE: EMPTY ATTRIBUTES', async(I) => {
    I.click(locate('a').withAttr({ href: '#/template/list' }));
    I.click(locate('div').withAttr({title: 'Create a new template'}))
    I.fillField('Template Name', 'NewTemplate')
    I.click('Save')
        I.see('Template created.')
        I.wait(3)
})


// ANALISAR ... 
 /*Scenario('@San:Template: Attributes basic', async(I) =>{
    I.click(locate('a').withAttr({href: '#/template/list'}))
    I.click(locate('div').withAttr({title: 'Create a new template'}));
    I.fillField('Template Name', 'TempTest')
    I.click('New Attribute')

    //I.fillField('input[type=text]', 'TEMP]') 
    //locate('div').withAttr({input}).inside(locate('label').withText('Hello'));
    I.fillField(locate('input').withAttr({ name: 'TEMP' }))
    I.selectOption('type', 'dynamic')
    I.selectOption('value_type', 'string')  
    I.fillField(locate('div').withText('input').inside(locate('name').withAttr('TEMPLATE')) )

    I.click(locate('.footer button').withAttr({title: 'Add'}))
    I.click('Save')
      I.see('Template created.')
})*/

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
        I.see("Template successfully updated.")
        //I.wait(3)
    I.click('Save')
    I.see('Template created.')
        //I.wait(3)
})

// OUTRO TENANT






