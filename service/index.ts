/**
 * @description 同步请求封装
 * @param {String} method 请求类型：get,post,delete,put...
 * @param {String} url  请求地址，不包含请求域名，如：/api/test
 * @param {Object} options  请求参数
 * @returns data or error
 */
export const apiUse = async (url: string, method: string, options: any) => {
	// 当前locale将被存储在locale变量中
	const nuxtApp = useNuxtApp() // 获取引入nuxt的第三方模块对象
	const runConfig = useRuntimeConfig() // 获取环境变量
	const baseUrl = runConfig.public.baseUrl
	const reqUrl = baseUrl + url
	const contentType = options.headers.contentType || 'application/json'
	options = {
		method,
		headers: {
			'Content-Type': contentType,
			...options.headers,
		},
		body: options.body || {},
		query: options.query || {},
		param: options.param || {},
	}
	const { data, error } = await useFetch(reqUrl, options)

	if (error.value) {
		return error.value
	} else {
		return data.value
	}
}

/**
 * @description 异步请求封装
 * @param {String} method 请求类型：get,post,delete,put...
 * @param {String} url  请求地址，不包含请求域名，如：/api/test
 * @param {Object} options  请求参数
 * @description key 一定要有，否则刷新会造成接口错误
 */
export const asyncFetchData = async (url: string, method: string, options: any, config?: any) => {
	const nuxtApp = useNuxtApp()
	const runConfig = useRuntimeConfig()
	const baseUrl = runConfig.public.baseUrl
	const reqUrl = baseUrl + url
	const key = url.split('/')[url.split('/').length - 1] //这里取接口最后的名称做key
	const { data, pending, error, refresh } = await useAsyncData(key, () =>
		$fetch(reqUrl, {
			// useAsyncData也可以用useLazyAsyncData,区别就是useLazyAsyncData会等待SSR渲染完成在执行接口，而useLazyAsyncData是接口执行完成执行SSR渲染
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				...options,
				// token: "",
				// platform: "h5",
				// language: nuxtApp.$i18n.locale.value,
			},
		}),
	)
	return {
		data,
		pending,
		error,
		refresh,
	}
}

/**
 * @description 此为apiUse的封装调用实例
 */
export const fGET = (url: string, params: any) => {
	return apiUse(url, 'GET', { params })
}

export const fPOST = (url: string, body: any) => {
	return apiUse(url, 'POST', { body })
}

export const fPUT = (url: string, params: any) => {
	return apiUse(url, 'put', { params })
}

export const fDELETE = (url: string, params: any) => {
	return apiUse(url, 'delete', { params })
}

/**
 * @description 此为asyncFetchData的调用实例
 */
export const GET = (url: string, params) => {
	return asyncFetchData(url, 'GET', params)
}

export const POST = (url: string, params) => {
	return asyncFetchData(url, 'POST', params)
}

export const PUT = (url: string, params) => {
	return asyncFetchData(url, 'put', params)
}

export const DELETE = (url: string, params) => {
	return asyncFetchData(url, 'delete', params)
}
