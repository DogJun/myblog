// import fs from 'fs'
let config = {
  admin: { // 后台初始化的用户名密码
    user: 'admin',
    pwd: 'password'
  },
  jwt: {
    secret: 'DogJun', // 默认
  }
}
// 可在private.js定义自己私有的配置
// module.exports = {
//   mongodbSecret: {
//      user: '',
//      pass: ''
//   },
//   jwt: {
//      secret: 'xxx'
//   },
//   admin: {
//      user: '',
//      pwd: ''
//   }
// }
// if (fs.existsSync(__dirname + '/private.js')) {
//     config = Object.assign(config, require('./private.js'));
// }
// console.log(config);
export default config
