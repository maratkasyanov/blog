import styles from './UpdateUser.module.css'
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/spinner'
const UpdateUser = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [load, setload] = useState(false)
  const [disable,setdisable] = useState(false)
  useEffect(()=>{

  },[props.User])
  const [user,setuser] = useState()
  useEffect(()=>{
    setload(false)
    let username = localStorage.getItem('username');
    let email =localStorage.getItem('email');
    let token =localStorage.getItem('token');
    let img =localStorage.getItem('img');
    setuser({username:username,email:email,token:token,img:img})
    setload(true)
  },[props.User])
  const navigate = useNavigate();
  async function get21(email,newpassword,username,image) {
    
    if (newpassword.length>5 && image.length>10) {
      let asd = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
         Authorization: `Bearer ${localStorage.getItem('token')} `,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            username:username,
            image:image,
            password: newpassword,
          },
        }),
      })
     
   
      return asd
    } else if(image.length>10){
      let asd = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
         Authorization: `Bearer ${localStorage.getItem('token')} `,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            username:username,
            image:image,
           
          },
        }),
      })
      
   
      return asd
    }
    else{
      let asd = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
         Authorization: `Bearer ${localStorage.getItem('token')} `,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            username:username,
          },
        }),
      })
      
   
      return asd
    }
 
   
  }
  let result
  const imgurl=()=>{
    if (props.User.image==='undefined') {
      return ''
    } else {
      return props.User.image
    }
  }
  const onSubmit = (data) => {
    setdisable(true)
   
    props.getuser({username:data.username,email:data.email,image:data.Descr3,token:localStorage.getItem('token')})
  ////проверка на корректность данных
  
  get21(data.email,data.newpass,data.username,data.Descr3).then((res)=>{result=res})
  setTimeout(() => {
    if (result.status!==200) {
      alert('имя пользователя или email заняты')
    } else {
      setTimeout(() => {
        result=result.json()
 
        navigate("/");
       
      }, 500);
    }
  }, 1000);
  };
  if (load===true) {
    return (
      <div className={styles.NewPost}>
        <h2 className={styles.NewPostHead}>Create new article</h2>
        <form className={styles.autorizForm}>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Username</span>
            <input defaultValue={props.User.username}  placeholder='Title' {...register("username", { required: true,maxLength:20,minLength:3 })} className={styles.autorizInputTitle}></input>
            {errors.Title && <p className={styles.inputErr}>Некоректное имя пользователя</p>}
          </div>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Email address</span>
            <input defaultValue={props.User.email}  placeholder='Email address' {...register("email", { required: true,pattern: {
                    value:  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Invalid email address',
                  } })} className={styles.autorizInputTitle}></input>
            {errors.Descr && <p className={styles.inputErr}>Некоректный email</p>}
          </div>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>New password</span>
            <input   placeholder='New password' {...register("newpass", { required: false,maxLength:40,minLength:6 })} className={styles.autorizInputTitle}></input>
            {errors.Descr && <p className={styles.inputErr}>Некоректный пароль</p>}
          </div>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Avatar image (url)</span>
            <input defaultValue={imgurl()}  placeholder='Avatar image' {...register("Descr3", { required: false, pattern: {
                    value:  /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
                    message: 'Invalid url address',
                  } })} className={styles.autorizInputTitle}></input>
            {errors.Descr && <p className={styles.inputErr}>Некоректный url</p>}
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
  else{
    return(
      <Spinner/>
    )
  }
}
export default UpdateUser