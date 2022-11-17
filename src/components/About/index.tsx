import { Button, Input,Tooltip, message } from 'antd';
import { observable, computed , makeObservable} from "mobx";
import { inject, observer } from 'mobx-react';
import React from 'react';
import AddModel from './AddModel'
import StopClick from './StopClick'
import copy from 'copy-to-clipboard';
import type { ColumnsType } from 'antd/es/table';
import StationTable from '../StationTable/index'
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
@inject('AppStore')
@observer
class About extends React.Component<any, any> {
  AddModelRef = React.createRef<any>()
   columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address 1',
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: 'Long Column Long Column Long Column',
      dataIndex: 'address',
      key: 'address 2',
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: 'Long Column Long Column',
      dataIndex: 'address',
      key: 'address 3',
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: 'Long Column',
      dataIndex: 'address',
      key: 'address 4',
      ellipsis: {
        showTitle: false,
      },
      render: address => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
  ];
  
   data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    },
  ];
  constructor(props: any) {
    super(props)
    makeObservable(this)
    this.state = {
      modalOpenVisible: false,
      msg: 'msg',
      columns2: this.columns,
      tableData:{
        tablearr: this.data,
        pageNo: 1,
        pageSize: 10,
        totalElements: 100
      },
    }
  }
  @computed get title() {
    return this.props.AppStore.title;
  }
  @observable value = 2
  @observable amount = 3
  
  @computed get total(){
      return this.value * this.amount
  }
  // setter一定要定义在getter后，一些typescript版本会认为声明了两个名称相同的属性而报错
  set total(val){
      this.value = val
  }
  changeStore = () => {
    this.props.AppStore.setGlobalTitle('新标题')
    console.log(this.title)
    this.total = 5
  }
  componentDidMount(): void {
    console.log(this.props)
  }
  reFreshTableData = () => {
    console.log(1)
  }

  handleAdd = () => {
    this.AddModelRef.current?.showModal();
    this.setState({
      modalOpenVisible: true,
      msg: '222'
    })
  }
  handleOk = () => {
    console.log(1)
  };

  handleCancel = () => {
    console.log(2)

  };
  
  copyOrderNumber = () => {
    copy('复制的内容');
	  message.success('复制成功')
  }


  render() {
    const { msg, isModalOpen } = this.state
    return (
      <div className='pages'>
        <h1>{this.title}{this.total}<Button type='primary' onClick={this.changeStore}>修改标题</Button></h1>
        <h5>1、父子组件传参</h5>
        <Button type='primary' onClick={this.handleAdd}>新增</Button>
        <AddModel ref={this.AddModelRef} msg={msg} modalOpenVisible={isModalOpen} handleOk={this.handleOk} handleCancel={this.handleCancel}/>

        <div>
          <h3>2、非父子组件通信</h3>
          <StopClick/>
        </div>
        <div>
          <h3>copy</h3>
          //按钮绑定事件
          <Button onClick={this.copyOrderNumber} className='order-num-operate'>
            Copy
          </Button>
        </div>

        <div>
          <h3>copy</h3>
          <StationTable
						param={{
							tableData: this.state.tableData,
							columns: this.state.columns2, 
							page: {
								current: this.state.pageNo + 1,
								pageSize: this.state.pageSize,
								total: this.state.totalElements,
							},
						}}
						reFreshTableData={this.reFreshTableData}
					></StationTable>
        </div>
      </div>
    );
  }


}
export default About;
