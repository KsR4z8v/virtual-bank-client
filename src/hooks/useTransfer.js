const useTransfer = () => {

    const url = import.meta.env.VITE_API_URL


    return {
        transfer: async (cb, dataTransfer) => {
            try {
                const session = window.localStorage.getItem('session')
                const token = JSON.parse(session).accessToken
                const resp = await fetch(url + '/transaction/init', {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(dataTransfer)
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
    }
}
export default useTransfer