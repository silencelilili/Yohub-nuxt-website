import { isNull, isPlainObject } from '@/global/is'

// 所有 key 用常量存储起来
export enum StorageKeys {
	TOKEN = 'TOKEN',
	NAME_LIST = 'NAME_LIST',
}

export function setStorage(key: string, val: string): void {
	localStorage.setItem(key, val)
}

export function getStorage(key: string): string | null {
	return localStorage.getItem(key) || ''
}

export function removeStorage(key: string): void {
	localStorage.removeItem(key)
}

// 判断是否存在
export function hasStorage(key: string): boolean {
	return !isNull(getStorage(key))
}
// 取数组类型的，直接返回解析后的数组
export function getStorageArray(key: string): Array<unknown> | null {
	const data = localStorage.getItem(key)
	if (isNull(data)) {
		return data
	}
	try {
		const arr = JSON.parse(data)
		if (Array.isArray(arr)) {
			return arr
		}
		localStorage.removeItem(key)
	} catch (err) {
		console.log('json parse error getStorageArray', err)
	}
	return null
}
// 取对象类型的，直接返回解析后的对象
export function getStorageObject(key: string): Object | null {
	const data = localStorage.getItem(key)
	if (data === null) {
		return data
	}
	try {
		const obj = JSON.parse(data)
		if (isPlainObject(obj)) {
			return obj
		}
		localStorage.removeItem(key)
	} catch (err) {
		console.log('json parse error getStorageObject', err)
	}
	return null
}
