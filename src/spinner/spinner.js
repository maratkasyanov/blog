import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './spinner.css'
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 65,
      
    }}
    spin
  />
);
const Spinner = () => <Spin style={{display:'flex',justifyContent:'center',marginTop:'150px'}} indicator={antIcon} />;
export default Spinner;