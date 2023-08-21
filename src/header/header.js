import styles from './header.module.css'
import React from 'react';
const Header=(props)=>{
  if (props.user===null || props.user.username===null) {
    return(
      <section className={styles.headAll}>
        <a href='/' className={styles.logoName}>Realworld Blog</a>
        <div>
        <a href='/sign-in' className={styles.SignIn}>Sign In</a>
        <a href='/sign-up' className={styles.SignUp}>Sign Up</a>
        </div>
        
      </section>
    )
  }else{
    return(
      <section className={styles.headAll}>
        <a href='/' className={styles.logoName}>Realworld Blog</a>
        <div className={styles.UserAutoblock}>
        <a href='/new-article' className={styles.SignUp}>Create article</a>
        <a className={styles.AutoUser} href='/profile'>{props.user.username}</a><img className={styles.UserImg} src={props.user.image} alt='avatar'></img>
        <button onClick={props.LogOut} className={styles.LogOut}>Log Out</button>
        </div>
        
      </section>
    )
  }

}
export default Header