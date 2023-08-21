import { Pagination } from 'antd';
import styless from './paginatioon.module.css'
import React, { useState } from 'react';
const Paginatione = (props) => {
  const [current, setCurrent] = useState(props.page);
  const onChange = (page) => {
    console.log(page);
    props.checkpage(page)
    setCurrent(page);
    
  };
  return <Pagination showSizeChanger={false}  className={styless.pag} current={current} onChange={onChange} total={2000} />;
};
export default Paginatione;