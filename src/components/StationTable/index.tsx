import { Table, Tooltip, Pagination } from 'antd';
import React from 'react';
export const paginationCus = {
	pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
	showQuickJumper: true,
	showSizeChanger: true,
	defaultPageSize: 20,
}
 
 
const StationTable = ({
  param,
  reFreshTableData,
}: {
  param: any;
  reFreshTableData: any;
}) => {
  const { tableData, columns } = param;
  const TbalePageNoChange = (page: any, pageSize: any) => {
    // console.log("page:" + page, pageSize);
    tableData.pageNo = page - 1;
    tableData.pageSize = pageSize;
    // 传出函数刷新列表
    reFreshTableData(tableData);
  };
  // pageSize变化
  const TbaleSizeChange = (current: number, size: number) => {
    tableData.pageNo = current;
    tableData.pageSize = size;
  };
  return (
    <>
      {tableData.tablearr && tableData.tablearr?.length > 0 && (
        <div className="ttable">
          <Table
            size="small"
            className="tableCus"
            pagination={false}
            columns={columns}
            scroll={{ x: 150, y: 300 }}
            rowKey={(record: any) => record.id}
            dataSource={tableData.tablearr}
          />
        </div>
      )}
      {tableData.tablearr?.length !== 0 && (
        <Pagination
          className="paginationCus"
          {...paginationCus}
          current={tableData.pageNo + 1}
          pageSize={tableData.pageSize}
          total={tableData.totalElements}
          onChange={TbalePageNoChange}
          onShowSizeChange={TbaleSizeChange}
        />
      )}
      {tableData.tablearr && tableData.tablearr?.length == 0 && (
        // <NoneData showTxt="暂时没有数据~" className="no_select" />
        <div>暂时没有数据</div>
      )}
    </>
  );
};
export default StationTable;