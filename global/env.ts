import { isUndef } from './is'

// 正式环境
export const PROD_ENV = {
	SERVER_URL: 'https://xxx.com/api', // 服务地址
	IS_DEV: 'false', // 是否是测试环境
}

// 测试环境
export const DEV_ENV = {
	SERVER_URL: 'https://xxx-test.com/api',
	IS_DEV: 'true',
}

// 假设测试环境的域名是 https://xxx-test.com
let isDev = process.env.NODE_ENV === 'development'
try {
	if (!process.server) {
		isDev = isDev || ['xxx-test.com'].includes(location.host) || false
	} else {
		isDev = isDev || process.env.IS_DEV === 'TRUE' || false
	}
} catch (err) {
	console.log('err in env')
}

export type EnvKey = keyof typeof PROD_ENV

// 调用这个函数获取当前的环境变量
export function getProcessEnv(key: EnvKey): string | void {
	if (isDev) {
		if (!isUndef(DEV_ENV[key])) {
			return DEV_ENV[key]
		}
		return ''
	}
	if (!isUndef(PROD_ENV[key])) {
		return PROD_ENV[key]
	}
}
