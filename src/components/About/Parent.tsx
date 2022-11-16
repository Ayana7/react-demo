import { Button, Input } from 'antd';
import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';

// 子组件
const Parent = forwardRef((props, ref) => {
  // 通过 Hooks 创建 Ref
  const [isModalOpen, setIsModalOpen] = useState();
  const childRef = useRef(null);
  useImperativeHandle(ref, () => ({
    sendMessage,
    isModalOpen
  }))
  // 子组件的方法, 在父组件中触发
  const sendMessage = () => {
    console.log('sending message')
  }
  const handleChange = (e: any) => {
    setIsModalOpen(e.target.value)
  }
  return (<>
    <Input ref={childRef} value={isModalOpen} onChange={e => handleChange(e)} />
  </>);
})

export default Parent;
