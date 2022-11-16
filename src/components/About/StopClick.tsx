import { EventType } from "@testing-library/react";
import { Checkbox } from "antd";
import React, { useState, createContext, useContext, useEffect } from "react";

const StopClick: React.FC = () => {
  const [list, setList] = useState<any>([]);
  useEffect(()=>{
    const data = [
      {name: '111'},
      {name: '222'},
      {name: '333'},
      {name: '444'},
      {name: '555'},

    ]
    setList(data)
  },[])

  const clickButton =  (event:any)=> {
    
    event.stopPropagation();
  }

  // event.stopPropagation();  style={{pointerEvents: 'none'}} 
  return (
    <div>
      <div>阻止事件冒泡</div>
      {
        list.map((item:any, index:number)=>{
          return (
            <div key={index} onClick={()=>{console.log(2)}} >
              {item.name} 
              <span onClick={(event)=>{clickButton(event)}}>
                <Checkbox  onChange={()=>{console.log(1)}} >Checkbox</Checkbox>
              </span>
            </div>
          )
        })
      }
    </div>
  );
}

export default StopClick;
