import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import ReactDOM from "react-dom";
let renderCount = 0;
let asdas = {
  tagList: [{ name: 'asdasd677881' }, { name: 'asdasd677882' }, { name: 'asdasd677883' }],
  title: "asdasdasd", description: 'tyuiioopp', text: 'hhgashggasdghasghhgsadhgjsahhdasghdhgashgdghahgsd'
}
function Appsad(props) {
  const [page, setpage] = useState(null)
  const [load, setload] = useState(false)
  useEffect(() => {
    async function get12(slug) {
      let asd = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
      return asd
    }
    get12('sda-e5iziz').then((res) => { return (res.json()) }).then((elem) => { setpage(elem.article) })
    setTimeout(() => {
      setload(true)
      // asdas = {
      //   tagList: [{ name: 'asdasd677881' }, { name: 'asdasd677882' }, { name: 'asdasd677883' }],
      //   title: page.title, description: page.description, text: page.body
      // }
    }, 2000);
  }, [])
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: asdas,
    mode: "onChange"
  });
  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace
  } = useFieldArray({
    name: 'tagList',
    control,
  });

  const onSubmit = (data) => console.log("data", data);
  ///sda-e5iziz
  // if you want to control your fields with watch
  const watchResult = watch("tagList");
  console.log(watchResult);

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));

  renderCount++;
  console.log(fields)

  return (
    <form >
      <h1>Field Array </h1>
      <input placeholder='title' {...register("title", { required: true })} ></input>
      {errors.Title && <p >Некоректное имя пользователя</p>}

      <input placeholder='description' {...register("description", { required: true })} ></input>
      {errors.Title && <p >Некоректное имя пользователя</p>}

      <input placeholder='text' {...register("text", { required: true })} ></input>
      {errors.Title && <p >Некоректное имя пользователя</p>}

      
      <p>The following demo allow you to delete, append, prepend items</p>
      <span className="counter">Render Count: {renderCount}</span>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                {...register(`tagList.${index}.name`, { required: true })}
              />


              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: '' });
          }}
        >
          append
        </button>

      </section>

      <input onClick={handleSubmit(onSubmit)} type="submit" />
    </form>
  );
}

export default Appsad
