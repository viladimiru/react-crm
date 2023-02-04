function throttle(fn: any, timer: number): Function {
	let isPending: boolean, throttledArgs: any, throttledCtx: any
	return function () {
		if (!isPending) {
			isPending = true
			fn.apply(this, arguments)
			setTimeout(() => {
				if (throttledArgs) {
					fn.apply(throttledCtx, throttledArgs)
					throttledCtx = throttledArgs = null
					isPending = false
				}
			}, timer)
		}
		throttledArgs = arguments
		throttledCtx = this
	}
}

export default throttle