import styles from './singup.module.css'
import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as actions from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom';
const SignUp = (props) => {
  let result
  const [disable,setdisable] = useState(false)
  async function get12(username,email,password) {
    let asd = await fetch('https://blog.kata.academy/api/users', {
     method: 'post',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       user: {
         username: username,
         email: email,
         password: password,
       },
     }),
   })
  
    return asd
   
 }
 async function get21(email,password) {
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
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
  setdisable(true)
    get12(data.Username,data.Email,data.Password).then((res) => {result= res})
    setTimeout(() => {  
      if (result.status!==200) {
        alert('имя пользователя или email заняты')
    
          window.location.reload();
       
      } else {
        result = result.json()
        result.then((ewr)=>{return(ewr.user)}).then((sad)=>{props.getuser(sad)})
        setTimeout(() => {        
         
          setTimeout(() => {
           get21(data.Email,data.Password)
          }, 500);
          
          navigate("/");
        }, 1000);
      }
    }, 1000);
  };
  return (
    <div className={styles.autorizBlock}>
    <h2 className={styles.autorizHead}>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.autorizForm}>
      <span className={styles.inputSpan}>Username</span>
        <input placeholder='Username' {...register("Username",{ required: true,maxLength:20,minLength:3 })} className={styles.autorizInput}></input>
        {errors.Username && <p className={styles.inputErr}>Некоректное имя пользователя</p>}
        <span className={styles.inputSpan}>Email address</span>
        <input placeholder='Email address' {...register("Email", { required: true ,  pattern: {
                    value:  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Invalid email address',
                  }})}  className={styles.autorizInput}></input>
        {errors.Email && <p className={styles.inputErr}>Некоректный Email</p>}
        <span className={styles.inputSpan}>Password</span>
        <input placeholder='Password' {...register("Password", { required: true,minLength:6,maxLength:40})} className={styles.autorizInput}></input>
        {errors.Password && <p className={styles.inputErr}>Пароль имеет недопустимые символы </p>}
        <span className={styles.inputSpan}>Repeat Password</span>
        <input placeholder='Password' {...register("Password2", { required: true, validate: (val) => {
                    if (watch('Password') !== val) {
                      return 'Your passwords do not match'
                    }
                  } })} className={styles.autorizInput}></input>
        {errors.Password2 && <p className={styles.inputErr}>Пароли не совпадают</p>}
        <input disabled={disable} value="Create" type="submit" className={styles.createBtn} />
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
 
      <form className={styles.autorizFormcheckbox}>
      <input checked='true' type='checkbox'></input><span className={styles.autorizCheckboxspan}> 
      I agree to the processing of my personal
        information
      </span>
      </form>
      <span className={styles.autorizSignInSpan}>Already have an account?<a className={styles.autorizSignIn} href='./sign-in'>Sign In.</a></span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    counter: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)