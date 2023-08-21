import styles from './singin.module.css'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from 'react-router-dom';
const SignIn = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  async function get21(email, password) {
    let asd = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })

    return asd

  }
  const [disable, setdisable] = useState(false)
  let result
  const onSubmit = (data) => {
    setdisable(true)
    get21(data.email, data.pass).then((res) => { result = res })
    setTimeout(() => {
      if (result.status !== 200) {
        alert('пользователь не найден')
       
          window.location.reload();
        
      } else {
        result = result.json()
        result.then((ewr) => { return (ewr.user) }).then((sad) => {
          props.getuser(sad)
        })
        setTimeout(() => {

          navigate("/");
        }, 500);
      }
    }, 1000);
  };
  return (
    <div className={styles.autorizBlock}>
      <h2 className={styles.autorizHead}>Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.autorizForm}>
        <span className={styles.inputSpan}>Email address</span>
        <input placeholder='Email address' {...register("email")} className={styles.autorizInput} />
        {errors.email && <p className={styles.inputErr}>Пароль или почта введены неверно</p>}
        <span className={styles.inputSpan}>Password</span>
        <input {...register("pass", { required: true })} placeholder='Password' className={styles.autorizInput} />
        {errors.pass && <p className={styles.inputErr}>Пароль или почта введены неверно</p>}
        <input disabled={disable} value="Login" type="submit" className={styles.createBtn} />

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


      <span className={styles.autorizSignInSpan}>Already have an account?<a className={styles.autorizSignIn} href='./sign-in'>Sign In.</a></span>
    </div>
  )
}
export default SignIn