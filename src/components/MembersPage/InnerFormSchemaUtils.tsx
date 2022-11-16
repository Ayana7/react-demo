import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const FormComponent: React.FC = () => {
  /**
   * 解析表单的schema
   *
   * @param schema 直接从tableName.querySchema.js文件中读出来的schema
   * @returns {function()} 一个函数, 这个函数的参数是getFieldDecorator, 执行后才会返回真正的jsx元素, 为啥不直接返回jsx元素而要返回函数呢, 因为antd的表单的限制, 想生成最终的元素必须要getFieldDecorator
   */
   const parse = (schema: any) =>  {
    // 用这两个变量去代表一个表单的schema
    const rows:any = [];
    let cols:any = [];

    // 参见antd的布局, 每行被分为24个格子
    // 普通的字段每个占用8格, between类型的字段每个占用16格
    let spaceLeft = 24;
    schema.forEach((field: any) => {
      // 当前列需要占用几个格子? 普通的都是8, 只有datetime between是16
      let spaceNeed = 8;
      if (field.showType === 'between' && field.dataType === 'datetime') {
        spaceNeed = 16;
      }

      // 如果当前行空间不足, 就换行
      if (spaceLeft < spaceNeed) {
        rows.push(cols);
        cols = [];  // 重置cols
        spaceLeft = 24;  // 剩余空间重置
      }

      // 注意, 每个字段transform之后, 返回的也都是一个回调函数, 所以cols其实是一个回调函数的集合
      switch (field.showType) {
        case 'select':
          cols.push(transformSelect(field));
          break;
        case 'multiSelect':
          cols.push(transformMultiSelect(field));
          break;
        case 'cascader':
          cols.push(transformCascader(field));
          break;
        default:
          cols.push(transformNormal(field));
      }

      spaceLeft -= spaceNeed;
    });

    // 别忘了最后一行
    if (cols.length > 0) {
      rows.push(cols);
    }

    // 至此, schema解析完毕, 接下来是回调函数
    // 这里有一点闭包的概念
    // return getFieldDecorator => {
    //   const formRows = []; // 最终的表单中的一行
    //   for (let i = 0; i < rows.length; i++) {
    //     const formCols = [];  // 最终的表单中的一列
    //     for (const col of rows[i]) {
    //       formCols.push(col(getFieldDecorator));  // 注意这里的col是一个函数
    //     }
    //     formRows.push(<Row key={i} gutter={16}>{formCols}</Row>);
    //   }

    //   return (<Form horizontal>
    //     {formRows}
    //   </Form>);
    // };
  }

  /**
   * 辅助函数, 将一个input元素包装下
   *
   * @param formItem 一个callback, 以getFieldDecorator为参数, 执行后返回对应的表单项, input/select之类的
   * @param field schema中的一列
   */
   const colWrapper = (formItem:any, field:any) =>  {
    return  (
      <Col key={field.key} sm={8}>
        <Form.Item key={field.key} label={field.title} labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        {/* {formItem(getFieldDecorator)} */}
        </Form.Item>
      </Col>
    );
  }

  /**
   * 将schema中的一列转换为下拉框
   *
   * @param field
   */
  const transformSelect = (field:any) => {
    // const options = [];
    // field.options.forEach((option) => {
    //   options.push(<Option key={option.key} value={option.key}>{option.value}</Option>);
    // });

    // return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, {initialValue: field.defaultValue})(
    //   <Select placeholder={field.placeholder || '请选择'} size="default">
    //     {options}
    //   </Select>
    // ), field);
  }



  /**
   * 转换为下拉多选框
   *
   * @param field
   * @returns {XML}
   */
  const transformMultiSelect = (field:any) => {
    // const options = [];
    // field.options.forEach((option) => {
    //   options.push(<Option key={option.key} value={option.key}>{option.value}</Option>);
    // });

    // return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, {initialValue: field.defaultValue})(
    //   <Select multiple placeholder={field.placeholder || '请选择'} size="default">
    //     {options}
    //   </Select>
    // ), field);
  }

  /**
   * 转换为级联选择
   *
   * @param field
   * @returns {XML}
   */
  const transformCascader = (field:any) =>  {
    // return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, {initialValue: field.defaultValue})(
    //   <Cascader options={field.options} expandTrigger="hover" placeholder={field.placeholder || '请选择'} size="default"/>
    // ), field);
  }
  /**
   * 将schema中的一列转换为普通输入框
   *
   * @param field
   * @returns {XML}
   */
   const transformNormal = (field: any) => {
    // switch (field.dataType) {
    //   case 'int':
    //     logger.debug('transform field %o to integer input component', field);
    //     return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, {initialValue: field.defaultValue})(
    //       <InputNumber size="default" max={field.max} min={field.min} placeholder={field.placeholder}/>
    //     ), field);
    //   case 'float':
    //     logger.debug('transform field %o to float input component', field);
    //     return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, {initialValue: field.defaultValue})(
    //       <InputNumber step={0.01} size="default" max={field.max} min={field.min} placeholder={field.placeholder}/>
    //     ), field);
    //   case 'datetime':
    //     logger.debug('transform field %o to datetime input component', field);
    //     return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, {initialValue: field.defaultValue ? moment(field.defaultValue) : null})(
    //       <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={field.placeholder || '请选择日期'}/>
    //     ), field);
    //   default:  // 默认就是普通的输入框
    //     logger.debug('transform field %o to varchar input component', field);
    //     return this.colWrapper(getFieldDecorator => getFieldDecorator(field.key, {initialValue: field.defaultValue})(
    //       <Input placeholder={field.placeholder} size="default" addonBefore={field.addonBefore}
    //              addonAfter={field.addonAfter}/>
    //     ), field);
    // }
  }

  return (
    <div>111</div>
  );
}

export default FormComponent;
