import ReactDOM from 'react-dom/client';
import Routapp from './routeapp'
import React, { useState } from 'react';
import './index.css';
import Articles from './articles/articles'
import Header from './header/header'
import Paginatione from './pagination/pagination'
import Artpage from './articles/artPage'
import SignIn from './signin/signIn'
import SignUp from './signup/signup'
import NewPost from './newpost/newpost'
const root = ReactDOM.createRoot(document.getElementById('root'));
let newUser = null
const GetNewuser = (user) => {
  console.log(user)
  newUser =user 
}
root.render(
  <div className='body-art'>
    <Routapp GetNewuser={GetNewuser} />

  </div>
);


