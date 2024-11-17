import crypto from 'crypto-js'


const useUser = () => {
    const url = import.meta.env.VITE_API_URL
    return {
        sign: async (callback, credentials) => {
            try {
                const resp = await fetch(url + '/auth', {
                    method: 'POST',
                    mode: 'cors',
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
        updatePassword: async (callback, password, hash) => {
            try {
                const token = crypto.AES.decrypt(hash, import.meta.env.VITE_SECRET_HASH).toString(crypto.enc.Utf8)
                const resp = await fetch(url + 'auth/resetPass', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', 'auth': token },
                    body: JSON.stringify({ password })
                })
                if (resp.status !== 204) {
                    return callback(undefined, 'Error al actualziar la contraseña')
                }
                callback(undefined)
            } catch (error) {
                console.log(error.message);
                callback(undefined, error.message)
            }
        },
        recoverPassword: async (callback, email) => {
            try {
                const resp = await fetch(url + 'auth/recoverPass', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json', },
                    body: JSON.stringify({ email })
                })
                if (resp.status !== 204) {
                    return callback(undefined, 'Ups no se pudo enviar el correo de recuperacion')
                }
                callback(undefined)
            } catch (error) {
                callback(undefined, error.message)
            }
        },
        createClient: async (cb, userData) => {
            try {
                console.log(url);
                const resp = await fetch(url + '/user/client', {
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
                console.log(url);
                const resp = await fetch(url + `/user/${userId}`, {
                    method: 'GET',
                    headers: { 'content-type': 'application/json' },
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
        deleteAccount: async (cb, userId) => {
            try {
                console.log(url);
                const resp = await fetch(url + `/user/${userId}`, {
                    method: 'DELETE',
                    headers: { 'content-type': 'application/json' },
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
    }
}

export default useUser