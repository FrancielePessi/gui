const _ = require('lodash')

function getDeepKeys(obj) {
  var keys = [];
  for(var key in obj) {
      keys.push(key);
      if(typeof obj[key] === "object") {
          var subkeys = getDeepKeys(obj[key]);
          keys = keys.concat(subkeys.map(function(subkey) {
              return key + "." + subkey;
          }));
      }
  }
  return keys;
}

describe('lang', () => {


    test ('certificates', () =>{
        const certiicatesPT = require('../../../locales/pt-br/certificates.json');
        const certificatesEN = require('../../../locales/en/certificates.json');

        expect(getDeepKeys(certiicatesPT)).toEqual(getDeepKeys(certificatesEN));    
    })

    test ('common', () => {
      const commonEN = require('../../../locales/en/common.json');
      const commonPT = require('../../../locales/pt-br/common.json');

     expect(getDeepKeys(commonPT)).toEqual(getDeepKeys(commonEN))

    })

    test ('device', () => {
      const devicePT = require('../../../locales/pt-br/devices.json');
      const deviceEN = require('../../../locales/en/devices.json');
      
      expect(getDeepKeys(devicePT)).toEqual(getDeepKeys(deviceEN))
    })

    test ('firmware', () => {
      const firmwarePT = require('../../../locales/pt-br/firmware.json');
      const firmwareEN = require('../../../locales/en/firmware.json');
      
      expect(getDeepKeys(firmwarePT)).toEqual(getDeepKeys(firmwareEN))
    })
    

    test('flow', () => {
        const flowsPT = require('../../../locales/pt-br/flows.json');
        const flowsEN = require('../../../locales/en/flows.json');

        expect(getDeepKeys(flowsPT)).toEqual(getDeepKeys(flowsEN));    
    });


    test ('groups', () => {
        const groupsPT = require('../../../locales/pt-br/groups.json');
        const groupsEN = require('../../../locales/en/groups.json');
        
        expect(getDeepKeys(groupsPT)).toEqual(getDeepKeys(groupsEN))
      })

    test ('importExport', () => {
        const importExportPT = require('../../../locales/pt-br/importExport.json');
        const importExportEN = require('../../../locales/en/importExport.json');
        
        expect(getDeepKeys(importExportPT)).toEqual(getDeepKeys(importExportEN))
      })  

      test ('login', () =>{
        const loginPT = require('../../../locales/pt-br/login.json');
        const loginEN = require('../../../locales/en/login.json');
        
        expect(getDeepKeys(loginPT)).toEqual(getDeepKeys(loginEN))
      })

      test ('menu', () =>{
        const menuPT = require('../../../locales/pt-br/menu.json');
        const menuEN = require('../../../locales/en/menu.json');
        
        expect(getDeepKeys(menuPT)).toEqual(getDeepKeys(menuEN))
      })

      test ('notification', () =>{
        const notificationPT = require('../../../locales/pt-br/notifications.json');
        const notificationEN = require('../../../locales/en/notifications.json');
        
        expect(getDeepKeys(notificationPT)).toEqual(getDeepKeys(notificationEN))
      })
      
      test ('template', () =>{
        const templatePT = require('../../../locales/pt-br/templates.json');
        const templateEN = require('../../../locales/en/templates.json');
        
        expect(getDeepKeys(templatePT)).toEqual(getDeepKeys(templateEN))
      })

      test('users', () => {
        const pt = require('../../../locales/pt-br/users.json');
        const en = require('../../../locales/en/users.json');

        expect(getDeepKeys(pt)).toEqual(getDeepKeys(en));    
      });

});