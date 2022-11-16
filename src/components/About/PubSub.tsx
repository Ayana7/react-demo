import React, { useState, useEffect, useContext } from 'react'
// import PubSub from 'pubsub-js'
const Context = React.createContext({info:{},call:'dd',});
const PubSub: React.FC = () => {
    const data = [
        { name: '111', cont: 'wewewe111' },
        { name: '222', cont: 'wewewe222' },
        { name: '333', cont: 'wewewe333' },
        { name: '444', cont: 'wewewe444' },

    ]

    const [itemListData, setItemListData] = useState(data);
    // useContext()钩子函数用来引入Context对象，从中获取cart数据
    const { info, call } = useContext(Context)
    // useState的参数为状态初始值，setItems为变更状态值的方法
    const [items, setItems] = useState(info)
    return (
        <div style={{ display: 'flex' }}>
            <Context.Provider value={{info, call}} >
                <div>
                    <p>数据列表</p>
                    {call}
                    {

                        data.map((item, index) => {
                            return <ItemList key={index} {...item}
                            />
                        })

                    }



                </div>
                <div>
                    <p>详情内容</p>
                    {
                        <ItemDetailInfo />
                    }
                </div>
            </Context.Provider>

        </div>
    )
}

export default PubSub;

const ItemList = (props: any) => {
    
    // useContext()钩子函数用来引入Context对象，从中获取cart数据
    const { info, call} = useContext(Context)
    // useState的参数为状态初始值，setItems为变更状态值的方法
    const [items, setItems] = useState({})
    const [text, setText] = useState(call)

    const handleItem = (e: any) => {
        console.log(e, call)
        setText(e.cont)
    }
    return (<>
        <div onClick={()=>{handleItem(props)}}>{props.name}</div>
    </>);
}

const ItemDetailInfo = (props: any) => {

    // useContext()钩子函数用来引入Context对象，从中获取cart数据
    const { info } = useContext(Context)
    // useState的参数为状态初始值，setItems为变更状态值的方法
    const [items, setItems] = useState(info)
    return (<>
        <div>{'2'}</div>
    </>);
}