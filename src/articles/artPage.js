import React, { useEffect, useState } from 'react';
import styles from './art.module.css'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import Spinner from '../spinner/spinner'
import { useNavigate } from 'react-router-dom';
const Artpage = (props) => {
  
  const navigate = useNavigate();
  const { slug } = useParams()
  useEffect(() => {
    props.EditArticle(slug)
  }, [])
  async function get12(slug) {
    let asd = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
    return asd
  }
  const [elem2, Setelem2] = useState()
  const [token, SetToken] = useState(null)
  const [load, Setload] = useState(false)
  async function onDelete() {
    let asdd = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token.token} `,
        'Content-Type': 'application/json',
      },

    })
    navigate("/");
    window.location.reload();
    return asdd
  }
  useEffect(() => {

    if (props.User !== null) {
      SetToken({
        token: props.User.token
      })
    } else {
      let token = localStorage.getItem('token');
      SetToken({
        token: token
      })
    }

    setTimeout(() => {
      get12(slug).then((res) => { return (res.json()) }).then((elem) => { Setelem2(elem.article) })
      setTimeout(() => {
        Setload(true)
      }, 1000);

    }, 1000);
  }, [slug])
  if (load === false) {
    return (
      <Spinner />
    )
  }
  else if ( props.User !==null && elem2.author.username === props.User.username) {
    return (
      <div className={styles.artPage2}>
        <div className={styles.artTitleName}>
          <div className={styles.artRow}>
            <div className={styles.artTitle2}>
              <h2>{elem2.title}</h2>
              <span className={styles.ArtLike}>{elem2.favoritesCount}</span>
              <span className='nonactive mr' ></span>
            </div>
            <div >
              {elem2.tagList.map((res) => { return <button key={Math.floor(Math.random() * (10000 - 1) + 1)} className={styles.tagbtn}>{res}</button> })}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.artNameDate}>
              <div className={styles.DateName}>
                <span className={styles.artUserName2}>{elem2.author.username}</span>
                <span className={styles.artUserDate2}>{new Date(elem2.createdAt).toLocaleDateString("en-US")}</span>
              </div>
              <img className={styles.artUserlogo} src={elem2.author.image} alt='1'></img>

            </div>
            <span className={styles.marSpan}>
              <button onClick={onDelete} className={styles.DeleteBtn}>Delete</button>
              <a onClick={props.EditArticle(slug)} className={styles.EditA} href={`/articles/${slug}/edit`}>Edit</a>
            </span>

          </div>
        </div>

        <div>
          <p className={styles.artDescr2}>{elem2.description}</p>
          <span className={styles.artHead2}><ReactMarkdown children={elem2.body} ></ReactMarkdown></span>

        </div>
      </div>
    )
  }
  else {
    return (
      <div className={styles.artPage2}>
        <div className={styles.artTitleName}>
          <div className={styles.artRow}>
            <div className={styles.artTitle2}>
              <h2>{elem2.title}</h2>
              <span className={styles.ArtLike}>{elem2.favoritesCount}</span>
              <span className='nonactive mr' ></span>
            </div>
            <div >
              {elem2.tagList.map((res) => { return <button key={Math.floor(Math.random() * (10000 - 1) + 1)} className={styles.artTag}>{res}</button> })}
            </div>
          </div>
          <div className={styles.artNameDate}>
            <div className={styles.DateName}>
              <span className={styles.artUserName2}>{elem2.author.username}</span>
              <span className={styles.artUserDate2}>{new Date(elem2.createdAt).toLocaleDateString("en-US")}</span>
            </div>
            <img className={styles.artUserlogo} src={elem2.author.image} alt='1'></img>
          </div>
        </div>
        <div>
          <p className={styles.artDescr2}>{elem2.description}</p>
          <span className={styles.artHead2}><ReactMarkdown children={elem2.body} ></ReactMarkdown></span>

        </div>
      </div>
    )
  }

}

export default Artpage