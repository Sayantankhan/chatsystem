import React, { useEffect , useState } from 'react';
import { Redirect } from 'react-router-dom'
import { UserProvider, UserConsumer } from '../context/UserContext';
import queryString from 'query-string'; 
import {OnlineChatMember} from './onlineChatMember';
import '../css/chat.css';
import openSocket from 'socket.io-client';
import { Emojione } from 'react-emoji-render';

let socket;

const Chat = (props) => {
    const queryStrings = queryString.parse(props.location.search);

    const [name,setName] = useState(queryStrings.name);
    const [room, setRoom] = useState(queryStrings.room);

    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [users, setUsers] = useState([]);

    function renderDocument(username , data){
        console.log(username);
        const chatListRootDiv = document.getElementById("chatlist");
        let link = document.createElement("li");
        link.className = "d-flex justify-content-between mb-4";
        link.value = "NEST";
        let outerDiv = document.createElement('div');
        outerDiv.className = "chat-body white p-3 ml-2 z-depth-1";
        link.appendChild(outerDiv);
        let headerDiv = document.createElement('div');
        headerDiv.className = "header";
        outerDiv.appendChild(headerDiv);
        let strong = document.createElement('strong');
        strong.className = "primary-font";
        strong.innerHTML = username;
        headerDiv.appendChild(strong);
        let hr = document.createElement('hr');
        hr.className = "w-100";
        outerDiv.appendChild(hr);
        let paragraph = document.createElement('p');
        paragraph.className = "mb-0";
        paragraph.innerHTML  = data;
        outerDiv.appendChild(paragraph);
        chatListRootDiv.appendChild(link);
    }

    useEffect(() => {
       socket = openSocket('http://10.12.3.166:4000');

       socket.emit('joining',queryStrings, (error) => {
          //  <Redirect to='/'/>
          if(error){    
            console.log(error);
            props.history.push('/', { error: error });
          }
            
       });

       socket.on('nuebe', (user) => {
            if(user)
                renderDocument(user.name, `${user.name} has joined the chat`)
       });

       socket.on('userList', (users) => {
           console.log(users);
           setUsers(users);
       });

       socket.on('deletedUser',(user) => {
            console.log(user);
            if(user)
                renderDocument(user.name, `${user.name} has left the chat`)
       })

       socket.on('brodcastMessage', (messageData) => {
           console.log(messageData);
           renderDocument(messageData.name, messageData.message);
           const chatMessageElement = document.getElementById("chatlist");
           chatMessageElement.scrollTop = chatMessageElement.scrollHeight - chatMessageElement.clientHeight;
       })

    }, []);

    function chatSendMessage(event){
        if(message === ''){
            return null;
        }
        else{
            socket.emit('message',{name, message});
            setMessage('');
        }
    }

    return(
        <div className="card rare-wind-gradient chat-room">
            <div className="card-body">
                <div className="row px-lg-2 px-2">
                    <OnlineChatMember userList={users}/>
                    <div className="col-md-6 col-xl-8 pl-md-3 px-lg-auto px-0">
                        <div className="chat-message" >
                        <ul className="list-unstyled chat-1 scrollbar-light-blue" id="chatlist">
                        </ul>
                        </div>
                        <div className="white">
                            <div className="form-group basic-textarea">
                                <textarea className="form-control pl-2 my-0" id="exampleFormControlTextarea2" rows="3" placeholder="Type your message here..." value={message} onChange = {(event) => setMessage(event.target.value)}></textarea>
                            </div>
                        </div>
                        <p>😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 💩 😹 😻 🤢 🤮 🤧 😇 💩 👨‍❤️‍👨 💏 👩‍❤️‍💋‍👩 👨‍❤️‍💋‍👨 👏 🤲🏼 👐🏼 🙌🏼 👏🏼 🙏🏼 👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼 🤜🏼 🤞🏼 ✌🏼 🤟🏼 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 👌 👈 👉 👆 🤷🏻‍♀️ 🤷🏻‍♂️ 🙎🏻 🙎🏻‍♂️ 🙍🏻 🙍🏻‍♂️ 💇🏻 💇🏻‍♂️ 💆🏻 💆🏻‍♂️ 🕴🏻 💃🏻 🕺🏻 🚶🏻‍♀️ 🚶🏻 🏃🏻‍♀️ 👩🏼‍💻 👨🏼‍💻 👩🏼‍💼 </p>
                        <button type="button" className="btn btn-success btn-outline-pink btn-rounded btn-sm waves-effect waves-dark float-right" onClick={(event) => chatSendMessage(event)}>Send</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Chat;
