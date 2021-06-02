async function getConversations(userId) {
    return await fetch(`http://localhost:5000/inbox/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getConversationsTwo() {
    return await fetch(`http://localhost:5000/inbox/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        body: JSON.stringify({
            senderId: "6054e8945870d230f03ae98c",
            receiverId: "60b52b039bbfb61d089b814e"
        }),
        credentials: 'include',
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function sendMessage(message) {
    return await fetch(`http://localhost:5000/message/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session': sessionStorage.getItem('session')
        },
        body: JSON.stringify(message),
        credentials: 'include',
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

async function getMessages(chatId) {
    return await fetch(`http://localhost:5000/message/${chatId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export default {
    sendMessage,
    getMessages,
    getConversations,
    getConversationsTwo,
}