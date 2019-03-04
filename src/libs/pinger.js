const FETCH_TIMEOUT = 5000
let didTimeOut = false
let startTime = 0
let endTime = 0

const Ping = url => {
    return new Promise((resolve, reject) => {
        // Init timeout to handle no response
        const timeout = setTimeout(function() {
            // Time is out, set variable to true
            didTimeOut = true

            // Website could not be reach
            reject({
                status: 'timeout',
                responseTime: FETCH_TIMEOUT,
            })
        }, FETCH_TIMEOUT)

        // Set start time before to fetch
        startTime = new Date().getTime()

        // Attempt to fetch url
        fetch(url, { mode: 'no-cors' })
            .then(() => {
                // Set end time when url has been fetched
                endTime = new Date().getTime()

                // Clear fetch timeout
                clearTimeout(timeout)

                // If timeout has not been reached, website is ON
                !didTimeOut && resolve({
                    status: 'online',
                    responseTime: endTime - startTime,
                })
            })
            .catch(e => {
                // timeout function already handled rejection
                if (didTimeOut) return

                // Set end time when an error occurred
                endTime = endTime = new Date().getTime()

                // Website is OFF
                reject({
                    status: 'offline',
                    responseTime: 0,
                })
            })
    })
}

export { Ping, }