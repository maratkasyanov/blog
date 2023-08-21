import styles from './newpost.module.css'
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from 'react-router-dom';
const NewPost = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [tags, SetTags] = useState([[1, 1], [0, 2], [0, 3], [0, 4], [0, 5]])
  const navigate = useNavigate();
  const [token, SetToken] = useState(null)
  const [disable,setdisable] = useState(false)
  useEffect(() => {
    if (props.User === null) {
      if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');

        SetToken({

          token: token

        })
      }
    }
    else if (props.User.token !== null) {

      let token = props.User.token;

      SetToken({
        token: token,
      })
    }
    else {
      navigate('/sign-in')
    }
  }, [props.User])
  async function fetchCreatePost(token, title, description, body, tagList) {
    console.log(title)
    let asdd = await fetch('https://blog.kata.academy/api/articles/', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token} `,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
    })

    return asdd


  }
  const onSubmit = (data) => {
    setTimeout(() => {
      if (tags[0][0] !== 0) { 
        if (tags[1][0] !== 0) {
          if (tags[2][0] !== 0) {
            if (tags[3][0] !== 0) {
              if (tags[4][0] !== 0) {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag2, data.Tag3, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
              } else {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag2, data.Tag3, data.Tag4]).then((res) => { console.log(res.json()) })
              }
            }
            else {
              if (tags[4][0] !== 0) {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag2, data.Tag3, data.Tag5]).then((res) => { console.log(res.json()) })
              } else {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag2, data.Tag3]).then((res) => { console.log(res.json()) })
              }
  
            }
          } else if (tags[3][0] !== 0) {
            if ((tags[4][0] !== 0)) {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag2, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
            }
            else {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag2, data.Tag4]).then((res) => { console.log(res.json()) })
            }
          } else if (tags[4][0] !== 0) {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag2, data.Tag5]).then((res) => { console.log(res.json()) })
          } else {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag2]).then((res) => { console.log(res.json()) })
          }
        }
        else {
            if (tags[2][0] !== 0) {
              if(tags[3][0] !== 0){
                if (tags[4][0] !== 0) {
                  fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag3,data.Tag4,data.Tag5]).then((res) => { console.log(res.json()) })
                }
                else{
                  fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag3,data.Tag4]).then((res) => { console.log(res.json()) })
                }
              }
              else{
                if (tags[4][0] !== 0) {
                  fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag3,data.Tag5]).then((res) => { console.log(res.json()) })
                }else{
                  fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag3]).then((res) => { console.log(res.json()) })
                }
              }
            }
            else if(tags[3][0] !== 0){
              if (tags[4][0] !== 0) {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag4,data.Tag5]).then((res) => { console.log(res.json()) })
              }
              else{
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag4]).then((res) => { console.log(res.json()) })
              }
            }
            else if(tags[4][0] !== 0){
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1,data.Tag5]).then((res) => { console.log(res.json()) })
            }
            else{
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1]).then((res) => { console.log(res.json()) })
            }
        }

      }
      else if (tags[1][0] !== 0) {
        if (tags[2][0] !== 0) {
          if (tags[3][0] !== 0) {
            if (tags[4][0] !== 0) {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag2, data.Tag3, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
            } else {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag2, data.Tag3, data.Tag4]).then((res) => { console.log(res.json()) })
            }
          }
          else {
            if (tags[4][0] !== 0) {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag2, data.Tag3, data.Tag5]).then((res) => { console.log(res.json()) })
            } else {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag2, data.Tag3]).then((res) => { console.log(res.json()) })
            }

          }
        } else if (tags[3][0] !== 0) {
          if ((tags[4][0] !== 0)) {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag2, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
          }
          else {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag2, data.Tag4]).then((res) => { console.log(res.json()) })
          }
        } else if (tags[4][0] !== 0) {
          fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag2, data.Tag5]).then((res) => { console.log(res.json()) })
        } else {
          fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag2]).then((res) => { console.log(res.json()) })
        }

      }
      else if (tags[2][0] !== 0) {

        if (tags[3][0] !== 0) {
          if (tags[4][0] !== 0) {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag3, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
          } else {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag3, data.Tag4]).then((res) => { console.log(res.json()) })
          }
        } else if (tags[4][0] !== 0) {
          fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag3, data.Tag5]).then((res) => { console.log(res.json()) })
        }
        else {
          if (tags[4][0] !== 0) {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag3, data.Tag5]).then((res) => { console.log(res.json()) })
          } else {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag3]).then((res) => { console.log(res.json()) })
          }

        }
      }
      else if (tags[3][0] !== 0) {
        if (tags[4][0] !== 0) {
          fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
        } else {
          fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag4]).then((res) => { console.log(res.json()) })
        }

      }
      else if (tags[4][0] !== 0) {
        fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag5]).then((res) => { console.log(res.json()) })
      }
    }, 1000);
    setdisable(true)
    navigate("/");
  };
  const addform = (e) => {
    e.preventDefault()
    let newtags = tags.slice()
    for (let i = 0; i < newtags.length; i++) {
      if (newtags[i][0] === 0) {
        newtags[i][0] = 1
        break
      }
    }
    SetTags(newtags)

  }
  const deleteform = (e) => {
    e.preventDefault()
    let indx = e.target.name
    indx = Number(indx)
    let newtags2 = tags.slice()
    for (let i = 0; i < newtags2.length; i++) {
      if (newtags2[i][1] === indx) {
        newtags2[i][0] = 0
        break
      }
    }
 
    SetTags(newtags2)
  
  }
  return (
    <div className={styles.NewPost}>
      <h2 className={styles.NewPostHead}>Create new article</h2>
      <form className={styles.autorizForm}>
        <div className={styles.inputRow}>
          <span className={styles.inputSpan}>Title</span>
          <input placeholder='Title' {...register("Title", { required: true })} className={styles.autorizInputTitle}></input>
          {errors.Title && <p className={styles.inputErr}>Поле не должно быть пустым </p>}
        </div>
        <div className={styles.inputRow}>
          <span className={styles.inputSpan}>Short description</span>
          <input placeholder='Short description' {...register("Descr", { required: true })} className={styles.autorizInputTitle}></input>
          {errors.Descr && <p className={styles.inputErr}>Поле не должно быть пустым </p>}
        </div>
        <div className={styles.inputRow}>
          <span className={styles.inputSpan}>Text</span>
          <input placeholder='Text' {...register("Text", { required: true })} className={styles.autorizInputText}></input>
          {errors.Text && <p className={styles.inputErr}>Поле не должно быть пустым </p>}
        </div>
        <div className={styles.inputRow}>
        <span className={styles.inputSpan2}>Tags</span>
          <div >

          </div>
          {tags.map((elem) => {
            if (elem[0] !== 0) {
              if (elem[1] === 1) {
                return (<div key={elem[1]}><input placeholder='Username' {...register(`Tag${elem[1]}`)} className={styles.autorizInputTags}></input>
                  <button onClick={deleteform} name={elem[1]} className={styles.autorizInputButton}>Delete</button>

                  <button onClick={addform} className={styles.autorizInputButton23}>Add tag</button>
                </div>)
              }
              else {
                return (<div key={elem[1]}><input placeholder='Username' {...register(`Tag${elem[1]}`)} className={styles.autorizInputTags}></input>
                  <button onClick={deleteform} name={elem[1]} className={styles.autorizInputButton}>Delete</button>
                </div>)
              }
            }

          })}



        </div>

        <input disabled={disable} onClick={handleSubmit(onSubmit)} value="Create" type="submit" className={styles.createBtn} />
        <ErrorMessage
          errors={errors}
          name="multipleErrorInput"
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
              : null;
          }}
        />
      </form>
    </div>
  )
}
export default NewPost