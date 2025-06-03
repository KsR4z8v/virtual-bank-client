const useTransaction = () => {
    const url = import.meta.env.VITE_API_URL
    return {
        getMovements: async (cb, accountId) => {
            try {
                const session = window.localStorage.getItem('session')
                const token = JSON.parse(session).accessToken
                const resp = await fetch(url + `/transaction/movements/${accountId}`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: { 'Authorization': `Bearer ${token}` },
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
        verifyTransaction: async (cb, transactionId) => {
            try {
                const resp = await fetch(url + `/transaction/receipt/${transactionId}`, {
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