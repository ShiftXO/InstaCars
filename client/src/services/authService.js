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
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getPersonalData(userId) {
    return await fetch(`http://localhost:5000/auth/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getUsers() {
    return await fetch(`http://localhost:5000/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function usersSearch(query) {
    return await fetch(`http://localhost:5000/user/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ query }),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getUserSavedPosts(id) {
    return await fetch(`http://localhost:5000/user/${id}/saved`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
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

async function deleteUser(userId) {
    return await fetch(`http://localhost:5000/auth/${userId}/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ _id: userId }),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function edit(data) {
    return await fetch(`http://localhost:5000/auth/${data.userId}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ data }),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export default {
    edit,
    login,
    logOut,
    getUser,
    register,
    getUsers,
    deleteUser,
    followUser,
    usersSearch,
    getPersonalData,
    getUserSavedPosts,
}