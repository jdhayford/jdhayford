const BASE_URL = 'http://localhost:3002/api/v1'

export const findUser = async (userId) => {
    const res = await fetch(`${BASE_URL}/users/${userId}`)
    return res.ok ? res.json() : null
}

export const findOrCreateUser = async (userData) => {
    const getResponse = await fetch(`${BASE_URL}/users/${userData.uid}`)
    if (getResponse.ok) {
        return getResponse.json()
    } else if (getResponse.status === 404) {
        const postResponse = await fetch(`${BASE_URL}/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return postResponse.json()
    }
}