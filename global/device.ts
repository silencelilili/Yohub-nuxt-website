import CallApp from 'callapp-lib'

// ie 基本上已经不用了
export function isIE(UA: string): number {
	const isIE = UA.indexOf('compatible') > -1 && UA.indexOf('MSIE') > -1 //判断是否IE<11浏览器
	const isIE11 = UA.indexOf('Trident') > -1 && UA.indexOf('rv:11.0') > -1
	if (isIE) {
		const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
		reIE.test(UA)
		const fIEVersion = parseFloat(RegExp['$1'])
		if (fIEVersion == 7) {
			return 7
		} else if (fIEVersion == 8) {
			return 8
		} else if (fIEVersion == 9) {
			return 9
		} else if (fIEVersion == 10) {
			return 10
		} else {
			return 6 //IE版本<=7
		}
	} else if (isIE11) {
		return 11
	} else {
		return -1 //不是ie浏览器
	}
}

function isMac(UA: string): boolean {
	return /macintosh|mac os x/i.test(UA) ? true : false
}

function isWin32(UA: string): boolean {
	return /win32|wow32/i.test(UA) ? true : false
}

function isWechat(UA: string): boolean {
	return /MicroMessenger/i.test(UA) ? true : false
}

function isQQ(UA: string): boolean {
	return /QQ/i.test(UA) ? true : false
}

function isMoible(UA: string): boolean {
	return /(Android|webOS|iPhone|iPod|BlackBerry|Mobile)/i.test(UA) ? true : false
}

export function isIOS(UA: string): boolean {
	return /iPhone|iPad|iPod/i.test(UA) ? true : false
}

function isAndroid(UA: string): boolean {
	return /Android/i.test(UA) ? true : false
}
// 返回类型按需设置
export function deviceType(UA: string): { type: string; env?: string } {
	if (isMoible(UA)) {
		if (isIOS(UA)) {
			if (isWechat(UA)) {
				return {
					type: 'ios',
					env: 'wechat',
				}
			}
			if (isQQ(UA)) {
				return {
					type: 'ios',
					env: 'qq',
				}
			}
			return {
				type: 'ios',
			}
		}
		if (isAndroid(UA)) {
			if (isWechat(UA)) {
				return {
					type: 'android',
					env: 'wechat',
				}
			}
			if (isQQ(UA)) {
				return {
					type: 'android',
					env: 'qq',
				}
			}
			return {
				type: 'android',
			}
		}

		return {
			type: 'mobile',
		}
	} else {
		if (isMac(UA)) {
			return {
				type: 'mac',
			}
		}
		let env = ''
		if (isIE(UA) > 0) {
			env = 'ie'
		}
		// 注意区分 window 的 32位/64位
		if (isWin32(UA)) {
			return {
				type: 'win32',
				env: env,
			}
		}
		return {
			type: 'win64',
			env: env,
		}
	}
}

export function isPC(UA = window.navigator?.userAgent) {
	const agent = deviceType(UA)
	return ['pc', 'mac', 'win32', 'win64'].includes(agent.type)
}

// 移动端唤醒应用
export function callApp(isIOS: boolean) {
	let packageName = ''
	// 一般来说 ios 和 android 的包名不一样
	if (isIOS) {
		packageName = 'com.mobile.android.vite.name' // ios 移动端提供
	} else {
		packageName = 'com.mobile.ios.vite.name' // android 移动端提供
	}
	const appStoreUrl = 'https://itunes.apple.com/cn/app/xxxx' // 填写appstore的下载地址
	const androidUrl = 'https://yingyongbao' // 软件应用宝地址

	const options = {
		scheme: {
			protocol: 'vite', // 移动端设置的
		},
		intent: {
			package: packageName,
			scheme: 'vite', // 移动端设置的
		},
		timeout: 2000,
		appstore: appStoreUrl,
		yingyongbao: androidUrl,
		fallback: 'https://www.xxx.com/',
	}
	const callLib = new CallApp(options)
	callLib.open({
		path: 'xxx.app/openwith', // 移动端提供
		callback: () => {
			if (isIOS) {
				window.location.href = appStoreUrl // ios 直接跳转到appStore 地址即可
			} else {
				// android 跳转
				const link = document.createElement('a')
				link.target = '_blank'
				link.href = androidUrl
				link.click()
			}
		},
	})
}
