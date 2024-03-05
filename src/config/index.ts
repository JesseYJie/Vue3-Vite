// 常量配置
enum constant {
  CONFIG_TITLE = 'vue3-vite-ts-pinia',
  CONFIG_REQUEST_TIMEOUT_TIME = 10000, // 请求超时时间 10秒
  CONFIG_TOKEN = 'TOKEN', // token
  CONFIG_USERINFO = 'USERINFO', // 用户信息
  CONFIG_STATUS_CODE_SUCCESS = 100, // 自定义代码 100成功、101失败
  CONFIG_STATUS_CODE_ERROR = 101,
  CONFIG_USERNAME_KEY = 'USERNAME', // 用户名
  CONFIG_PASSWORD_KEY = 'PASSWORD', // 密码
  CONFIG_IS_REMEMBER_KEY = 'REMEMBER', // 是否记住密码
  CONFIG_CODE_SUCCESS = 200, // 成功码
}
// 常规配置
const config = {}

export { config, constant }
