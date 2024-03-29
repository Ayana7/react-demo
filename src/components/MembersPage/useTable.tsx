import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  // {
  //   title: 'Full Name',
  //   width: 100,
  //   dataIndex: 'name',
  //   key: 'name',
  //   fixed: 'left',
  // },
  // {
  //   title: 'Age',
  //   width: 100,
  //   dataIndex: 'age',
  //   key: 'age',
  //   fixed: 'left',
  // },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: 'Column 8 ewewewewewe', dataIndex: 'address', key: '8',width: 150, },
  { title: 'Column 8', dataIndex: 'address', key: '9',width: 150, },
  { title: 'Column 8', dataIndex: 'address', key: '10',width: 150, },
  { title: 'Column 8', dataIndex: 'address', key: '11',width: 150, },

  // {
  //   title: 'Action',
  //   key: 'operation',
  //   fixed: 'right',
  //   width: 100,
  //   render: () => <a>action</a>,
  // },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const useTable: React.FC = () => (
  <Table columns={columns} dataSource={data} scroll={{ x: 400, y: 300 }} />
);

export default useTable;