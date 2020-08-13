// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// add a new caht
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset the form
    newNameForm.reset();
    // show then hide the update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChat(chat => chatUI.render(chat))
    }
});

// check a local storge for username
const username = localStorage.username ? localStorage.username : 'anon' ;

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render 
chatroom.getChat((data) => {
    // console.log(data);
    chatUI.render(data);
});