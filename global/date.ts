export function formatDate(fmt: string, dt?: Date | string): string {
	let d = dt
	if (typeof dt === 'string') {
		d = new Date(dt as string)
	} else if (dt === undefined) {
		d = new Date()
	}
	const year = (d as Date).getFullYear()
	const month = (d as Date).getMonth() + 1
	const day = (d as Date).getDate()
	const hours = (d as Date).getHours()
	const minutes = (d as Date).getMinutes()
	const seconds = (d as Date).getSeconds()
	let result = fmt.replace(/Y/g, `${year}`)
	result = result.replace(/m/g, month > 9 ? `${month}` : `0${month}`)
	result = result.replace(/d/g, day > 9 ? `${day}` : `0${day}`)
	result = result.replace(/H/g, hours > 9 ? `${hours}` : `0${hours}`)
	result = result.replace(/i/g, minutes > 9 ? `${minutes}` : `0${minutes}`)
	result = result.replace(/s/g, seconds > 9 ? `${seconds}` : `0${seconds}`)
	return result
}
