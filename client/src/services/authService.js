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
        credentials: 'include',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function logOut(data) {
    return await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
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
        credentials: 'include',
        // body: JSON.stringify(userId),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getUsers() {
    return await fetch(`http://localhost:5000/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        credentials: 'include',
        // body: JSON.stringify(userId),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function followUser(users) {
    return await fetch(`http://localhost:5000/user/${users.followedUserId}/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(users),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export default {
    register,
    login,
    logOut,
    getUser,
    getUsers,
    followUser,
}