import React, {useState, useEffect} from 'react';
import './App.css';
import './components/Login.css'

import Api from './Api';
import Swal from 'sweetalert2';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';

export default () => {

  const [chatlist, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [darkMode, setDarkMode] = useState(false)

  function SweetAvatar(){
    Swal.fire({
      title: user.name,
      text: 'Sua foto de perfil!',
      imageUrl: user.avatar,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }

  useEffect(()=> {
    if (user !== null){
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  }, [user]);

  const handleNewChat = () => {
    setShowNewChat(true);
  }

  function handleDarkMode() {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    document.getElementById('colors').innerHTML = `
    :root{
      --main-color: ${darkMode ? '#000' : '#d2dbdc'};
      --secondary-color:${darkMode ? '#2c2c2c' : '#EDEDED'};
      --tertiary-color:${darkMode ? '#191e1e' : '#DDD'};
      --other-color:${darkMode ? '#222222' : '#F6F6F6'};
      --other-color2:${darkMode ? '#282828' : '#EEE'};
      --other-color3:${darkMode ? '#121212' : '#fff'};
      --other-color4: ${darkMode ? '#1f2021' : '#F8F9FA'};
      --other-color5: ${darkMode ? '#FFF' : '#000'};
      --other-color6: ${darkMode ? '#222222' : '#F5F5F5'};
      --other-color7: ${darkMode ? '#282828' : '#EEE'};
      --other-color8: ${darkMode ? '#2a2a2a' : '#EBEBEB'};
      --other-color9: ${darkMode ? '#b9b9b9' : '#525252'};
      --background: ${darkMode ? 'url(https://cdn.discordapp.com/attachments/870357586673815602/908329671815475210/darktheme.png)' : 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)'};
    } 
    `
  }, [darkMode])

    const handleLoginData = async (u) => {
      let newUser = { 
        id: u.uid,
        name: u.displayName,
        avatar: u.photoURL
      };
      await Api.addUser(newUser);
      setUser(newUser);
    }

  if(user === null){
    return (<Login onReceive={handleLoginData} />);
  }

  return (
    <div className='app-window'>
        <div className="sidebar">
        <NewChat
          chatlist = {chatlist}
          user = {user}
          show = {showNewChat}
          setShow = {setShowNewChat}
         />
          <header>
            <img className="header--avatar" onClick={function(){SweetAvatar();}} src={user.avatar} alt="" />
            <div className="header--buttons">
            <div onClick={handleDarkMode} className="header--btn">
                  <Brightness4Icon style={{color: '#919191'}}/>
              </div>
              <div className="header--btn">
                  <DonutLargeIcon style={{color: '#919191'}}/>
              </div>
              <div onClick={handleNewChat} className="header--btn">
                  <ChatIcon style={{color: '#919191'}}/>
              </div>
              <div className="header--btn">
                  <MoreVertIcon style={{color: '#919191'}}/>
              </div>
            </div>
          </header>

          <div className="search">
            <div className="search--input">
              <SearchIcon fontSize='small' style={{color: '#919191'}} />
              <input type="search" placeholder='Procurar ou começar uma nova conversa' />
            </div>
          </div>

          <div className="chatlist">
            {chatlist.map((item,key) => (
              <ChatListItem 
                key = {key}
                data = {item}
                active={activeChat.chatId === chatlist[key].chatId}
                onClick = {() => setActiveChat(chatlist[key])}
              />
            ))}
          </div>

        </div>
        <div className="contentarea">
          {activeChat.chatId !== undefined &&
            <ChatWindow 
              user = {user}
              data = {activeChat}
            />
          }
          {activeChat.chatId === undefined &&
            <ChatIntro />
          }
        </div>
    </div>
  )
}