import React, { useEffect, useState } from 'react';
import styles from './art.module.css'

import { Link, useNavigate } from 'react-router-dom'

import './in.css'
const ArticlesEl = (props) => {
  const [like, setlike] = useState(props.favorited)
  const [liked, setliked] = useState(props.favoritesCount)
  const likeClick = () => {
    if (like === false) {
      return 'nonactive'
    } else {
      return 'active'
    }
  }
  async function get21(slug) {
    let asd = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')} `,
        'Content-Type': 'application/json',
      },

    })
    return asd

  }
  async function get212(slug) {
    let asd = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')} `,
        'Content-Type': 'application/json',
      },

    })

    return asd

  }
  useEffect(() => {
    if (props.favorited===true) {
      setlike(true)
    } else {
      setlike(false)
    }
  }, [])
  const likedone = () => {
    if (like === true) {
      setlike(false)
      setliked(liked-1)
      get212(props.slug).then((res) => { return (res.json()) })
   
    }
    else {
      setlike(true)
      setliked(liked+1)
      get21(props.slug).then((res) => { return (res.json()) })
   
    }

  }

  return (
    <div key={props.key1} className={styles.cardArt}>
      <div className={styles.cardArtText}>
        <div className={styles.cardRow}>
          <Link className={styles.titletext} to={`/articles/${props.slug}`} >
           {props.title}
          </Link>
          <button className={styles.favoritcount} onClick={likedone}>{liked}</button>
          <span className={likeClick()} onClick={likedone}></span></div>
        <div><span>{props.tags.map((elem) => { return <button className={styles.tagbtn} key={Math.floor(Math.random() * (10000 - 1) + 1)}>{elem}</button> })}</span></div>

        <span className={styles.descriptiontext}>{props.description}</span>
      </div>
      <div className={styles.nameUser}>
        <div className={styles.frstNameLstName}>
          <span className={styles.NameFrst}>{props.author.username}</span>
        </div>
        <img alt='1' className={styles.authorUserLogo} src={props.author.image}></img>
      </div>
    </div>
  )
}
export default ArticlesEl