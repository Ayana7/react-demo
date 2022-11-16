import React, { useState, useEffect} from 'react'
const TransParamsProps: React.FC = () => {
    const data = [
        {name: '111', cont: 'wewewe111'},
        {name: '222', cont: 'wewewe222'},
        {name: '333', cont: 'wewewe333'},
        {name: '444', cont: 'wewewe444'},

    ]
    const [itemListData, setItemListData] = useState(data);
    const [infoDataB, setInfoDataB] = useState();

    return (
        <div style={{display: 'flex'}}>
            <div>
                <p>数据列表</p>
                {
                    
                    itemListData.map((item, index) => {
                        return <ItemList key={index} {...item} setInfoDataB={setInfoDataB}
                        />
                    })
                    
                }
                
            </div>
            <div>
                <p>详情内容</p>
                {
                    <ItemDetailInfo infoDataB={infoDataB} setInfoDataB={setInfoDataB}/>
                }
            </div>
            
            
        </div>
    )
}

export default TransParamsProps;

const ItemList = (props: any) => {
    const handleItem = (e: any) => {
        props.setInfoDataB(props.cont)
    }
    return (<>
       <div onClick={()=>{handleItem(props)}}>{props.name}</div>
      </>);
}

const ItemDetailInfo = (props: any) => {
    return (<>
       <div>{props.infoDataB}</div>
      </>);
}