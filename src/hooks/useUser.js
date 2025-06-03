const useUser = () => {
    const url = import.meta.env.VITE_API_URL
    return {
        sign: async (callback, credentials) => {
            try {
                const resp = await fetch(url + '/auth', {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(credentials)
                })
                const data = await resp.json()
                if (resp.ok) {
                    return callback(data)
                }
                callback(undefined, data.msg)
            } catch (error) {
                callback(undefined, error.message)
            }
        },
        resetPassword: async (callback, newPassword, token) => {
            try {
                const resp = await fetch(url + '/reset-password', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ newPassword, confirmNewPassword: newPassword })
                })
                const data = await resp.json()
                console.log(data);
                if (!resp.ok) {
                    return callback(undefined, data.msg)
                }
                callback(undefined)
            } catch (error) {
                console.log(error.message);
                callback(undefined, error.message)
            }
        },
        updatePassword: async (callback, body) => {
            try {
                const session = window.localStorage.getItem('session')
                const token = JSON.parse(session).accessToken
                const userId = JSON.parse(session).userId
                const resp = await fetch(url + `/user/update-password/${userId}`, {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(body)
                })
                const data = await resp.json()
                if (!resp.ok) {
                    return callback(undefined, data.msg)
                }
                callback(undefined)
            } catch (error) {
                callback(undefined, error.message)
            }
        },
        updateUserInfo: async (cb, userInfo) => {
            try {
                const session = window.localStorage.getItem('session')
                const token = JSON.parse(session).accessToken
                const userId = JSON.parse(session).userId
                const resp = await fetch(url + `/user/${userId}`, {
                    method: 'PATCH',
                    mode: 'cors',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(userInfo)
                })
                const data = await resp.json()
                if (!resp.ok) {
                    return cb(undefined, data.msg)
                }
                cb(undefined)
            } catch (error) {
                cb(undefined, error.message)
            }
        },
        recoverPassword: async (callback, email) => {
            try {
                const resp = await fetch(url + '/recovery-password', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', },
                    body: JSON.stringify({ email })
                })
                if (resp.status !== 201) {
                    return callback(undefined, 'Ups no se pudo enviar el correo de recuperacion')
                }
                callback(undefined)
            } catch (error) {
                callback(undefined, error.message)
            }
        },

        createUser: async (cb, userData, user) => {
            try {
                const resp = await fetch(url + `/user/${user}`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userData)
                })
                const data = await resp.json()
                if (resp.status === 200) {
                    return cb(data)
                }
                cb(undefined, data.msg)
            } catch (error) {
                cb(undefined, error.message)
            }
        },
        verifyAccount: async (cb, confirmData) => {
            try {
                const resp = await fetch(url + `/confirm-account`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(confirmData)
                })
                const data = await resp.json()
                if (resp.status === 200) {
                    return cb(data)
                }
                cb(undefined, data.msg)
            } catch (error) {
                cb(undefined, error.message)
            }
        },
        getUserData: async (cb, userId) => {
            try {
                const session = window.localStorage.getItem('session')
                const token = JSON.parse(session).accessToken
                const resp = await fetch(url + `/user/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                })
                const data = await resp.json()
                if (resp.status === 200) {
                    return cb(data)
                }
                cb(undefined, data.msg)
            } catch (error) {
                cb(undefined, error.message)
            }
        },
        valdiateField: async (cb, body) => {
            try {
                const resp = await fetch(url + `/verify-field`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(body)
                })
                const data = await resp.json()
                cb(data.data.exists)
            } catch (error) {
                cb(undefined, error.message)
            }
        },
        deleteAccount: async (cb, userId) => {
            try {
                const session = window.localStorage.getItem('session')
                const token = JSON.parse(session).accessToken
                const resp = await fetch(url + `/user/${userId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: { 'Authorization': `Bearer ${token}` },
                })
                const data = await resp.json()
                if (resp.status === 200) {
                    return cb(data)
                }
                cb(undefined, data.msg)
            } catch (error) {
                cb(undefined, error.message)
            }
        }
        , logout: async (cb, userId) => {
            try {
                const session = window.localStorage.getItem('session')
                const token = JSON.parse(session).accessToken
                const resp = await fetch(url + `/logout/${userId}`, {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'cors',
                    headers: { 'Authorization': `Bearer ${token}` },
                })

                if (resp.status === 200) {
                    return cb(undefined)
                }
                const data = await resp.json()
                cb(undefined, data.msg)
            } catch (error) {
                cb(undefined, error.message)
            }
        }
    }
}

export default useUser