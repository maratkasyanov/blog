import styles from './EditPost.module.css'
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Spinner from '../spinner/spinner'
const EditPost = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [load, Setload] = useState(false)
  const [tags, SetTags] = useState([[1, 1, ''], [0, 2, ''], [0, 3, ''], [0, 4, ''], [0, 5, '']])
  const [tagarr, settagarr] = useState()
  const navigate = useNavigate();
  const [token, SetToken] = useState(null)
  const [elems, Setelems] = useState(null)
  const [len, setlen] = useState(1)
  const [disable, setdisable] = useState(false)
  const { slug } = useParams()
  async function get12(slug) {
    let asd = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
    return asd
  }
  useEffect(() => {
    get12(slug).then((res) => { return (res.json()) }).then((elems) => {
      Setelems(elems.article)
      settagarr(elems.article.tagList)
      setlen(elems.article.tagList.length)
    })

  }, [])

  setTimeout(() => {
    setTimeout(() => {

      setTimeout(() => {
        if (load === false) {
          if (len === 1 && tagarr !== undefined) {
            SetTags([[1, 1, tagarr[0]], [0, 2, ''], [0, 3, ''], [0, 4, ''], [0, 5, '']])
          } else if (len === 2 && tagarr !== undefined) {
            SetTags([[1, 1, tagarr[0]], [1, 2, tagarr[1]], [0, 3, ''], [0, 4, ''], [0, 5, '']])
          } else if (len === 3 && tagarr !== undefined) {
            SetTags([[1, 1, tagarr[0]], [1, 2, tagarr[1]], [1, 3, tagarr[2]], [0, 4, ''], [0, 5, '']])
          } else if (len === 4 && tagarr !== undefined) {
            SetTags([[1, 1, tagarr[0]], [1, 2, tagarr[1]], [1, 3, tagarr[2]], [1, 4, tagarr[3]], [0, 5, '']])
          } else if (len === 5 && tagarr !== undefined) {
            SetTags([[1, 1, tagarr[0]], [1, 2, tagarr[1]], [1, 3, tagarr[2]], [1, 4, tagarr[3]], [0, 5, tagarr[4]]])
          }

          Setload(true)

        }
      }, 2000);
    }, 2000);
  }, 3000);

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
      SetToken(null)
    }
  }, [props.User])
  async function fetchCreatePost(token, title, description, body, tagList) {

    let asdd = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'put',
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
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag2, data.Tag3, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
              } else {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag2, data.Tag3, data.Tag4]).then((res) => { console.log(res.json()) })
              }
            }
            else {
              if (tags[4][0] !== 0) {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag2, data.Tag3, data.Tag5]).then((res) => { console.log(res.json()) })
              } else {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag2, data.Tag3]).then((res) => { console.log(res.json()) })
              }

            }
          } else if (tags[3][0] !== 0) {
            if ((tags[4][0] !== 0)) {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag2, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
            }
            else {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag2, data.Tag4]).then((res) => { console.log(res.json()) })
            }
          } else if (tags[4][0] !== 0) {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag2, data.Tag5]).then((res) => { console.log(res.json()) })
          } else {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag2]).then((res) => { console.log(res.json()) })
          }
        }
        else {
          if (tags[2][0] !== 0) {
            if (tags[3][0] !== 0) {
              if (tags[4][0] !== 0) {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag3, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
              }
              else {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag3, data.Tag4]).then((res) => { console.log(res.json()) })
              }
            }
            else {
              if (tags[4][0] !== 0) {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag3, data.Tag5]).then((res) => { console.log(res.json()) })
              } else {
                fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag3]).then((res) => { console.log(res.json()) })
              }
            }
          }
          else if (tags[3][0] !== 0) {
            if (tags[4][0] !== 0) {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag4, data.Tag5]).then((res) => { console.log(res.json()) })
            }
            else {
              fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag4]).then((res) => { console.log(res.json()) })
            }
          }
          else if (tags[4][0] !== 0) {
            fetchCreatePost(token.token, data.Title, data.Descr, data.Text, [data.Tag1, data.Tag5]).then((res) => { console.log(res.json()) })
          }
          else {
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
        newtags2[i][2] = ''
        break
      }
    }
    SetTags(newtags2)

  }
  if (load === true) {
    return (
      <div className={styles.NewPost}>
        <h2 className={styles.NewPostHead}>Create new article</h2>
        <form className={styles.autorizForm}>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Title</span>
            <input defaultValue={elems.title} placeholder='Title' {...register("Title", { required: true })} className={styles.autorizInputTitle}></input>
            {errors.Title && <p className={styles.inputErr}>Некоректное имя пользователя</p>}
          </div>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Short description</span>
            <input defaultValue={elems.description} placeholder='Short description' {...register("Descr", { required: true })} className={styles.autorizInputTitle}></input>
            {errors.Descr && <p className={styles.inputErr}>Некоректное описание</p>}
          </div>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Text</span>
            <input defaultValue={elems.body} placeholder='Text' {...register("Text", { required: true })} className={styles.autorizInputText}></input>
            {errors.Text && <p className={styles.inputErr}>Пароль имеет недопустимые символы </p>}
          </div>
          <div className={styles.inputRow2}>
            <div >
              <span className={styles.inputSpan2}>Tags</span>
              
            </div>

            {tags.map((elem) => {

              if (elem[0] !== 0) {
                if (elem[1] === 1) {
                  return (<div key={elem[1]}><input defaultValue={elem[2]} placeholder='Username' {...register(`Tag${elem[1]}`, { required: true })} className={styles.autorizInputTags}></input>
                    <button onClick={deleteform} name={elem[1]} className={styles.autorizInputButton}>Delete</button>
                    <button onClick={addform} className={styles.autorizInputButton23}>Add tag</button>
                  </div>)
                }
                else {
                  return (<div key={elem[1]}><input defaultValue={elem[2]} placeholder='Username' {...register(`Tag${elem[1]}`, { required: true })} className={styles.autorizInputTags}></input>
                    <button onClick={deleteform} name={elem[1]} className={styles.autorizInputButton}>Delete</button>
                    {errors.Tag2 && <p className={styles.inputErr}>поле не должно быть пустым</p>}
                  </div>
                  )
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
  else {
    return (<Spinner />)
  }

}
export default EditPost