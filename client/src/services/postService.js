async function create(data) {
    return await fetch('http://localhost:5000/post/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        credentials: 'include',
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
        credentials: 'include',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function likeComment(data) {
    const { _id, postId } = data;
    return await fetch(`http://localhost:5000/post/${postId}/comments/${_id}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function deletePost(id) {
    return await fetch(`http://localhost:5000/post/${id}/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getPost(id) {
    return await fetch(`http://localhost:5000/post/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export default {
    like,
    save,
    likeComment,
    getAll,
    create,
    getPost,
    deletePost,
    addComment,
}