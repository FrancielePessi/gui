/* 
   TESTE CRIADO PARA ASSOCIAR UM PERFIL AO USUARIO, 
   E CHECAR SE AS PERMISSÕES DADOS AO NOVO USUARIO 
   ESTÃO DE ACORDO COM AS PERMISSÕES SELECIONADAS
*/
Feature('User CRUD');

Before((login) => 
    {login('admin')
});

function openPage (I){
    I.click(locate('a').withAttr({ href: '#/groups' }));
 }

 // Criando um novo perfil 
 Scenario('@basic: Creating a profile', async (I) => {
    openPage(I)

    I.click(locate('div').withAttr({ title: 'Create a new profile' }))
    I.fillField('name', 'franciele')
    I.fillField('description', 'Teste Profile: associando perfil e usuario')
    I.checkOption('template.viewer')
    I.checkOption('device.viewer')
    I.checkOption('flows.viewer')
    I.checkOption('history.viewer')
    I.checkOption('user.viewer')
    I.checkOption('ca.viewer')
    I.checkOption('user.viewer')
    I.checkOption('permission.viewer')
    I.click ('Save')

  I.wait(3)
  I.see('Profile created.')
 });

 Scenario('@basic: Checking create profile', async (I)=> {
   openPage(I)

   I.click('franciele')
   I.seeCheckboxIsChecked('template.viewer')
   I.seeCheckboxIsChecked('device.viewer')
   I.seeCheckboxIsChecked('flows.viewer')
   I.seeCheckboxIsChecked('history.viewer')
   I.seeCheckboxIsChecked('user.viewer')
   I.seeCheckboxIsChecked('ca.viewer')
   I.seeCheckboxIsChecked('permission.viewer')
   I.seeCheckboxIsChecked('user.viewer')
 })

// Criando um novo Usuario e associando perfil 
Scenario('@basic: Creating a news Users', async(I) => {
   openPage(I)    
   I.click(locate('a').withAttr({ href: '#/auth' }));
   I.click(locate('div').withAttr({title: 'Create a new user'}))
   I.fillField('username', 'franciele')
   I.fillField('name','franciele')
   I.fillField('email','fsilva@cpqd.com.br')
   I.fillField('confirmEmail','fsilva@cpqd.com.br')
   I.selectOption('profile', 'franciele')
   I.click( locate('.footer button').withAttr({ title: "Save" }))

 I.wait (3)
 I.see('User created.')

   // Checar usuario criado
   I.see ('franciele')
});

// Logando com o novo usuario, checar se as permissõs selecionadas estão disponiveis  
 Scenario('@basic: Logout and Login', async (I) => {
   I.click(locate('div').withAttr({ title: 'Login details' }))
   I.click('.btn-logout')
   I.wait(3)
   I.fillField('username', 'franciele')
   I.fillField('password', 'temppwd')
   I.click('Login')

   I.click(locate('a').withAttr({ href: '#/device'}));
   I.click(locate('a').withAttr({ href: '#/template/list' }));
   I.click(locate('a').withAttr({ href: '#/flows' }));
   //I.click(locate('a').withAttr({ href: '#/notifications' }));
   I.click(locate('a').withAttr({ href: '#/auth' }));
   I.click(locate('a').withAttr({ href: '#/groups' }));

   I.click(locate('div').withAttr({ title: 'Login details' }))
   I.click('.btn-logout')
})
   
// ************* Excluindo Dados Criados **************
Scenario('@basic: Removing user', async (I) => {
   I.click(locate('a').withAttr({ href: '#/auth' }));
   I.click('franciele')
   I.click(locate('.footer button').withAttr ({title: "Remove"}))
   I.click(locate('.confirm-modal button').withAttr({ title: "Remove" }))

   // Checking message the reply
   I.wait(3)
   I.see('User removed')
})

Scenario ('@basic: Removing perfil - franciele', async (I) => { 
   I.click(locate('a').withAttr({ href: '#/groups' }));
   I.click('franciele')
   I.click(locate('.footer button').withAttr({ title: "Remove" }))
   I.click(locate('.confirm-modal button').withAttr({ title: "Remove" }))

   // Checking message the reply
   I.wait(3)
   I.see('Profile removed')
});




  