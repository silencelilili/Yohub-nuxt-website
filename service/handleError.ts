import { AxiosError } from 'axios'
import AxiosRequestError, { ErrorResponse } from './error'

// 把 axios 的 错误 转成 我们已经封装的 AxiosRequestError 类，统一处理
export function handleError(error: AxiosError | AxiosRequestError): AxiosRequestError {
	const err = error instanceof AxiosRequestError ? error : new AxiosRequestError(error.response?.status || 1, error.message, error, error.response?.data as ErrorResponse)
	return err
}
