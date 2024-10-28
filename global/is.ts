const { isInteger } = Number
const { toString } = Object.prototype

export function isNumber(v: unknown): v is number {
	return typeof v === 'number' && !Number.isNaN(v) && Number.isFinite(v)
}

export function isInt(v: unknown): boolean {
	return isNumber(v) && isInteger(v)
}

export function isFloat(v: unknown): boolean {
	return isNumber(v) && !isInteger(v)
}

export function isString(v: unknown): v is string {
	return typeof v === 'string'
}

export function isBoolean(v: unknown): v is boolean {
	return v === true || v === false
}

export function isFunction(v: unknown): v is (...args: unknown[]) => unknown {
	return typeof v === 'function'
}

export const { isArray } = Array

export function isPlainObject(v: unknown): v is Record<string, unknown> {
	return toString.call(v) === '[object Object]'
}

export function isRegExp(v: unknown): v is RegExp {
	return v instanceof RegExp
}

export function isDate(v: unknown): v is Date {
	return v instanceof Date
}

export function isNull(v: unknown): v is null {
	return v === null
}

export function isDef<T>(v: unknown): v is Exclude<T, null | undefined> {
	return v !== undefined && v !== null
}

export function isUndef(v: unknown): v is undefined {
	return v === undefined
}

export function isUndefOrNull(v: unknown): v is null | undefined {
	return v === undefined || v === null
}
