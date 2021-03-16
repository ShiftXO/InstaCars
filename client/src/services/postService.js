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

export default {
    create,
}