import { Modal, Button, Form, Input, Select } from 'antd';
import React, { useState, forwardRef, useImperativeHandle ,useRef } from 'react';
interface PropsType {
    modalOpenVisible?: boolean;
    handleOk?: any;
    handleCancel?: any;
    onChildEvent?: any;
    msg?: string;
}
const AddModel = forwardRef((props:PropsType, ref) => { //{msg}相当于解构赋值，从props中解构
    const { msg, modalOpenVisible } = props
    // 在子组件中调用父组件的方法,并把当前的实例传进去
    const [isModalOpen, setIsModalOpen] = useState(modalOpenVisible);
    const [form] = Form.useForm();
    const { TextArea } = Input;
    useImperativeHandle(ref, () => ({
        sendMessage,
        showModal
    }))
    // 子组件的方法, 在父组件中触发
    const sendMessage = () => {
        console.log('sending message')
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        //  触发表单验证后获取到表单值
        form.validateFields().then((values) => {
            console.log(values)
            setIsModalOpen(false);
            form.resetFields();
            props.handleOk();
        });
        
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        props.handleCancel();
    };
    const { Option } = Select;

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };


    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                return;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                return;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
        }
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    return (
        <div>
            <h1>hello,{msg}{modalOpenVisible}</h1>
            <>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="desc" label="Desc" rules={[{ required: true }]}>
                            <TextArea
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select a option and change input text above"
                                onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('gender') === 'other' ? (
                                    <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="link" htmlType="button" onClick={onFill}>
                                Fill form
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        </div>
    )
})

export default AddModel;