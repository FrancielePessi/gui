let I = actor();

module.exports = {


    init(i) {
        I = i;
    },

    fillEmailAndSave(email) {
        I.fillField('email', email);
        I.fillField('confirmEmail', email);
        this.clickSave();
    },

    fillAndSave(user) {
        I.fillField('username', user.username);
        I.fillField('name', user.name);
        I.fillField('email', user.email);
        I.fillField('confirmEmail', user.email);
        I.fillSelectByName('profile', user.profile);
        this.clickSave();
    },

    fillAndSaveSanity(user) {
        I.fillField('username', user.username);
        I.fillField('name', user.name);
        I.fillField('email', user.email);
        I.fillField('confirmEmail', user.email);
        I.selectOption('profile', user.profile);
        I.click('Save');
    },

    updateUserNameAndEmailSanity(update){
        //I.click(locate('div').withAttr({title: name}))
        I.fillField('name', update.name);
        I.fillField('email', update.email);
        I.fillField('confirmEmail', update.email);
        I.click('Save')
        I.see('User updated.')
        I.wait(3)
    },

    clickCreateNew() {
        I.waitForElement(locate('div').withAttr({ title: 'Create a new user' }));
        I.click(locate('div').withAttr({ title: 'Create a new user' }));
    },

    openUserPage() {
        I.wait(1);
        I.waitForElement(locate('a').withAttr({ href: '#/auth' }));
        I.click(locate('a').withAttr({ href: '#/auth' }));
    },

    clickUserCreated(name){
        I.click(locate('div').withAttr({title: name}))
    },

    logoutUser(){
        I.click(locate('div').withAttr({ title: 'Login details' }))
        I.click('.btn-logout')
    },

    loginNewUser(username, password){
        I.fillField('username', username)
        I.fillField('password', password)
        I.click('Login')
    },

    loginUserDefault(){
        I.fillField('username', 'admin')
        I.fillField('password', 'admin')
        I.click('Login')
    },



    updatePasswordSanity(oldPassword, newPassword, confirmPassword){
        I.click(locate('div').withAttr({ title: 'Login details' }))
        I.click('.logout-page-changePassword')
        I.fillField('oldPassword', oldPassword)
        I.fillField('password', newPassword)
        I.fillField('confirmPassword', confirmPassword)
        I.click('Save')
    },

    clickSave() {
        I.click(locate('button').withAttr({ title: 'Save' }));
    },

    clickRemove() {
        I.click(locate('button').withAttr({ title: 'Remove' }));
    },

    clickDiscard() {
        I.click(locate('button').withAttr({ title: 'Discard' }));
    },

    confirmRemove() {
        I.click(locate('button').inside('.confirm-modal').withAttr({ title: 'Remove' }));
    },

    seeHasCreated() {
        I.waitForText('User created.', 20);
    },

    seeHasUpdated() {
        I.waitForText('User updated.', 20);
    },

    seeHasRemoved() {
        I.waitForText('User removed.', 20);
    },

};
