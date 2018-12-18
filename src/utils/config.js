
// let api='https://testzlgj.zgftlm.com';
//    let api='http://192.168.10.102';
// let front='http://xcxadmin.zgftlm.com';
//  let api='http://192.168.10.105';
 let front='http://192.168.10.105:3000';
    let api='http://192.168.10.105';

module.exports = {
    api: api+'/public/meeting/',
    apiAdmin:api+ `/Public/admin/`,
    redirectUrl: api+`/front/#/login`,
    imgPath: api+`/Public/upload`,//图片访问
    frontPath:front,//前台访问地址
    apiIframe:api,
    pageSize:10,        
}