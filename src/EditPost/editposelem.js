import styles from './EditPost.module.css'
import { useForm } from "react-hook-form";
const EditPostelem = (props)=>{
  const {
    register,
    formState: { errors }
  } = useForm();
  return(
    <div>
           <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Title</span>
            <input defaultValue={props.elems.title} placeholder='Title' {...register("Title", { required: true })} className={styles.autorizInputTitle}></input>
            {errors.Title && <p className={styles.inputErr}>Некоректное имя пользователя</p>}
          </div>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Short description</span>
            <input defaultValue={props.elems.description} placeholder='Short description' {...register("Descr", { required: true })} className={styles.autorizInputTitle}></input>
            {errors.Descr && <p className={styles.inputErr}>Некоректное описание</p>}
          </div>
          <div className={styles.inputRow}>
            <span className={styles.inputSpan}>Text</span>
            <input defaultValue={props.elems.body} placeholder='Text' {...register("Text", { required: true })} className={styles.autorizInputText}></input>
            {errors.Text && <p className={styles.inputErr}>Пароль имеет недопустимые символы </p>}
          </div>
    </div>
  )
}
export default EditPostelem