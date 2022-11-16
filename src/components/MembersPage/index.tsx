import { Table, Tooltip, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import './index.less'
import {
    Button,
} from 'antd';

const initlist = [
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
]
const initSelectList = [
    {name: '1', value: 1},
    {name: '2', value: 2},
]
const initSelectValues = [1,2]
const MembersPage: React.FC = () => {
    const [list, setList] = useState<any>(initlist);
    const [selectList, setSelectList] = useState<any>(initSelectList);
    const [selectValues, setSelectValues] = useState<any>(initSelectValues);
    const [catchValue, setCatchValue] = useState<any>(initSelectValues);
    const refreshData = () => {
        let data: any = [].concat(list)
        for(let i = 0; i < 4; i++){
            data.push({name: i+'-10', value: i+10})
        }
        setList(data)
        const tmpArr = data?.filter((item:any) => {
            return selectValues.indexOf(item) === -1;
        });
        setCatchValue(tmpArr)
    }
    const backData = () => {
        setList(initlist)
        const tmpArr = initlist?.filter((item:any) => {
            return selectValues.indexOf(item) === -1;
        });
        setCatchValue(tmpArr)
    }
    
    const change = (values:any) => {
        console.log(values)
        // 只返回了value值 考虑去重
        const tmpArr = values?.filter((item:any) => {
            return selectValues.indexOf(item) === -1;
        });
        console.log(tmpArr)
        if(tmpArr && tmpArr.length > 0){
            let newSelectValues = selectValues.concat(tmpArr)
            setSelectValues(newSelectValues)
            const arr = list?.filter((item:any) => {
                return item['value'] === tmpArr[0];
            });
            let newSelectList = selectList.concat(arr)
            setSelectList(newSelectList)
            setCatchValue(newSelectValues)
        }else{
            // 找出被删除项
            const delValue = catchValue?.filter((item:any) => {
                return values.indexOf(item) === -1;
            });
            const index = selectValues.indexOf(delValue[0])
            console.log(delValue,index, selectValues)
            let newSelectValues = [].concat(selectValues)
            newSelectValues.splice(index, 1)
            setSelectValues(newSelectValues)
            let newSelectList = [].concat(selectList)
            newSelectList.splice(index, 1)
            setSelectList(newSelectList)
            setCatchValue(newSelectValues)
        }
        
        
    }
    const getVal = () => {
        console.log(selectList, selectValues)
    }
    return (
        <div style={{ margin: '20px' }}>
            <div>Checkbox</div>
            <Button onClick={refreshData}>更新数据</Button>
            <Button onClick={backData}>更新数据2</Button>
            <Button onClick={getVal}>获取值</Button>

            <Checkbox.Group defaultValue={selectValues} onChange={change}>
                {
                    list.map((item: any)=>{
                        return (
                            <Checkbox disabled={item.value === 1} key={item.value} value={item.value}>{item.name}</Checkbox>
                        )
                    })
                }
            </Checkbox.Group>
        </div>

    );

}
export default MembersPage;