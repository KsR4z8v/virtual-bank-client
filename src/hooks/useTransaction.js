const useTransaction = () => {
    const url = import.meta.env.VITE_API_URL
    return {
        getHistory: async (cb, accountId) => {
            try {
                const resp = await fetch(url + `/transaction/history/${accountId}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json' },
                })
                const data = await resp.json()
                if (resp.ok) {
                    return cb(data)
                }
                cb(undefined, data.msg)
            } catch (error) {
                cb(undefined, error.message)
            }
        },
        verifyTransaction: async (cb, accountId) => {
            try {
                const resp = await fetch(url + `/transaction/history/${accountId}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json' },
                })
                const data = await resp.json()
                if (resp.ok) {
                    return cb(data)
                }
                cb(undefined, data.msg)
            } catch (error) {
                cb(undefined, error.message)
            }
        }
    }

}


export default useTransaction