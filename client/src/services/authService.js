async function register(data) {
    return await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function login(data) {
    return await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getUser(userId) {
    return await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        // body: JSON.stringify(userId),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export default {
    register,
    login,
    getUser,
}