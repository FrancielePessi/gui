// 'use strict';

let Helper = codecept_helper;

class MyHelper extends Helper {
  async getCurrentUrl() {
    const helper = this.helpers['Puppeteer'];
    return helper.page.url();
  }
}

module.exports = MyHelper;