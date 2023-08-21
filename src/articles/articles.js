import React, { useEffect, useState } from 'react';
import ArticlesEl from './articleEl'
import styles from './art.module.css'
import Paginatione from '../pagination/pagination'
import * as actions from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Spinner from '../spinner/spinner'
const Articles = (props) => {
  const [load, Setload] = useState(false)
  let elems
  
  const [page1, SetPage1] = useState(1)
 
  const checkpage = (page2) => {
    Setload(false)
    SetPage1(page2)
    
  }
  async function get12() {
    let asd = await fetch(`https://blog.kata.academy/api/articles?limit=${page1*5}`,{
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')} `,
        'Content-Type': 'application/json',
      },
    })
    return asd
  }
  useEffect(()=>{
  Setload(true)
  Setload(false)
  setTimeout(() => {

    get12().then((res) => { return (res.json()) }).then((elem) => { elems = elem.articles })
    setTimeout(() => {
      
      if (elems.length >5) {
        
        let res = elems.splice(elems.length-5,elems.length)
        
        props.addcardtickets(res)   
      }
      else{
       
        props.addcardtickets(elems)   
      } 

    }, 2000);
    Setload(true)
  }, 2000);},[])
  useEffect(() => {
    Setload(false)
    setTimeout(() => {
      
      get12().then((res) => { return (res.json()) }).then((elem) => { elems = elem.articles })
      setTimeout(() => {
  
        if (elems.length >5) {
          let res = elems.splice(elems.length-5,elems.length)
          props.addcardtickets(res)   
        }
        else{
          props.addcardtickets(elems)   
        }
       
        Setload(true)

      }, 1000);

    }, 1000);
  }, [page1])
  if (load === false) {
    return (
      <Spinner />
    )
  }
  else {
    return (
      <div className={styles.artall}>
        {props.counter.card.map((elem) => {
          return <ArticlesEl key={Math.floor(Math.random() * (10000 - 1) + 1)} favorited={elem.favorited} favoritesCount={elem.favoritesCount} returnslug={props.returnslug} slug={elem.slug} author={elem.author} tags={elem.tagList} description={elem.description} title={elem.title} />
        })}
        <Paginatione checkpage={checkpage} page={page1} />
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    counter: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Articles)
