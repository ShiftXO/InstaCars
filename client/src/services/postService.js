async function create(data) {
    return await fetch('http://localhost:5000/post/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function like(data) {
    const { _id } = data;
    return await fetch(`http://localhost:5000/post/${_id}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function save(data) {
    const { _id } = data;
    return await fetch(`http://localhost:5000/post/${_id}/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getAll(data) {
    return await fetch('http://localhost:5000/post/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function addComment(data) {
    return await fetch('http://localhost:5000/post/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export default {
    create,
    like,
    save,
    addComment,
    getAll
}