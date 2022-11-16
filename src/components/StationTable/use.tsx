import { Button, Input,Tooltip, message } from 'antd';
import React from 'react';
import copy from 'copy-to-clipboard';
import type { ColumnsType } from 'antd/es/table';
import StationTable from '../StationTable/index'
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
class About extends React.Component<any, any> {
  
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
  reFreshTableData = () => {
    console.log(1)
  }

  
  copyOrderNumber = () => {
    copy('复制的内容');
	  message.success('复制成功')
  }


  render() {
    return (
      <div className='pages'>
        <div>
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
