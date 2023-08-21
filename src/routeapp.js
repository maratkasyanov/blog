import React, { useState, useEffect } from 'react';
import './index.css';
import Articles from './articles/articles'
import Header from './header/header'
import Artpage from './articles/artPage'
import SignIn from './signin/signIn'
import SignUp from './signup/signup'
import NewPost from './newpost/newpost'
import EditPost from './EditPost/EditPost'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import redducer from './reducer'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import UpdateUser from './UpdateUser/UpdateUser'
import Appsad from './gjhvdasjhd'
const store = createStore(redducer, composeWithDevTools(applyMiddleware(thunk)))


const Routapp = (props) => {
  const [slug1, setslug1] = useState()
  const [user, Setuser] = useState(null)
  const [userAuto, SetuserAuto] = useState(null)
  const [editart, Seteditart] = useState(null)
  const returnslug = (slug) => {

    setslug1(slug)
  }
  const LogOut = () => {
    localStorage.clear()
    Setuser(null)
  }
  const getuser = (obj) => {
    setTimeout(() => {
      Setuser(obj)
      localStorage.setItem('username', obj.username);
      localStorage.setItem('email', obj.email);
      localStorage.setItem('token', obj.token);
      localStorage.setItem('img', obj.image);
    }, 1000);
  }
  const getautoriz = (obj) => {
    setTimeout(() => {
      SetuserAuto(obj)
    }, 1000);
  }

  
  const EditArticle=(slug)=>{
    setslug1(slug)
  }
  const getfulldata=(elel)=>{
    async function get12() {
      let asd = await fetch(`https://blog.kata.academy/api/articles/${elel}`)
      return asd
    }
    get12().then((elem)=>{return(elem.json())}).then((eeee)=>{Seteditart(eeee)})
  }
  useEffect(() => {
    if (localStorage.getItem('username') !== undefined) {
      let username = localStorage.getItem('username');
      let email = localStorage.getItem('email');
      let token = localStorage.getItem('token');
      let img = localStorage.getItem('img');
      Setuser({
        username: username,
        email: email,
        token: token,
        image: img
      })
    }
  }, [])

  return (
    <div>
      <Router>
        <Header LogOut={LogOut} user={user} />
        <Provider returnslug={returnslug} store={store}>
          <Routes><Route path='/' Component={() => <Articles User={user} returnslug={returnslug} />} /></Routes>
          <Routes><Route path='/11' Component={() => <Appsad />} /></Routes>
          <Routes><Route path='/articles/:slug' Component={() => <Artpage getfulldata={getfulldata} EditArticle={EditArticle} User={user} />} /></Routes>
          <Routes><Route path='/sign-in' Component={() => <SignIn getuser={getuser} />} /></Routes>
          <Routes><Route path='/profile' Component={() => <UpdateUser getuser={getuser} User={user} />} /></Routes>
          <Routes><Route path='/sign-up' Component={() => <SignUp User={user} getautoriz={getautoriz} getuser={getuser} />} /></Routes>
          <Routes><Route path='/new-article' Component={() => <NewPost User={user} />} /></Routes>
          <Routes><Route path='/articles/:slug/edit' Component={() => <EditPost User={user} editart={editart} />} /></Routes>
        </Provider>
      </Router>
    </div>
  )

}

export default Routapp