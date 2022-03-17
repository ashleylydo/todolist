import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, InputNumber, Modal, Select, } from 'antd'
import moment from 'moment'

export default function EditForm ({
  onChange,
  showEdit,
  handleCancel,
  form,
  editData,
  updateData,
  editingKey,
  setDataSource,
}) {

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [fields, setFields] = useState([editData])

  const handleAfterClose = () => {
    setButtonDisabled(true)
    form.resetFields()
  }
  useEffect(() => {
    form.setFieldsValue({
      name: editData.name,
      age: editData.age,
      status: editData.status,
      dob: showEdit ? moment(editData.dob) : null,
      email: editData.email,
    })
  }, [form, editData, showEdit])

  function handleOk () {


  }

  function handleFinish (fields, editingKey) {
    let array = { ...editingKey, ...fields }
    /*updateData(array);*/
    console.log(array)
    /* handleCancel();*/
  }

  /*dataSource.find((fields, editingKey) => {
    if (dataSource.key === editingKey) {
      setDataSource[editingKey] = {
        name: fields.name,
        age: fields.age,
        status: fields.status,
        dob: moment(fields.dob),
        email: fields.email,
      }
      console.log(dataSource);
      //setEditingKey('')
      return true
    }
    return dataSource;
  })*/

  /*updateData(fields, editingKey);
        console.log(updateData(fields, editingKey));
        form.resetFields()
        handleCancel()*/

  return (
    <Modal
      forceRender
      title="Edit Information"
      visible={showEdit}
      afterClose={handleAfterClose}
      /*handleOk={handleOk}*/
      updateData={updateData}
      destroyOnClose={true}
      getContainer={false}
      closable={false}
      maskClosable={false}
      width={620}
      okText="Update"
      okButtonProps={{
        htmlType: 'submit',
        form: 'editForm',
        disabled: buttonDisabled,
      }}
      onOk={() => {
        form.validateFields().catch((info) => {
          console.log('Validate Failed:', info)
        })
        setButtonDisabled(false);
      }
      }
      onCancel={handleCancel}
    >
      <Form
        id="editForm"
        name="addForm"
        wrapperCol={{ span: 17 }}
        labelCol={{ span: 6 }}
        form={form}
        updateData={updateData}

        onFinish={handleFinish}
        editData={editData}
        preserve={false}
        fields={fields}
        onFieldsChange={() => {
          onChange = (newFields) => {
            setFields(newFields)
          }
          setButtonDisabled(
            form.getFieldsError().some((field) => field.errors.length > 0),
          )
        }}
        initialValues={{ fields }}
      >
        <Form.Item
          label="Name"
          name="name"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Name is required',
            },
            {
              pattern: new RegExp(/^[A-Za-z\s]+$/i),
              message: 'Invalid name',
            },
            {
              whitespace: true,
            },
          ]}
        >
          <Input style={{ width: '100%' }} placeholder="Type your name" />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Age is required',
            },
            {
              type: 'number',
              min: 0,
              max: 150,
              message: 'Invalid age',
            },
          ]}
        >
          <InputNumber size="default" placeholder="Age" />
        </Form.Item>
        <Form.Item
          label="Marital Status"
          name="status"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Marital Status is required',
            },
          ]}
        >
          <Select
            size="default"
            placeholder="Select an option that best describe your marital status"
            allowClear
          >
            <Select.Option value="Single">Single</Select.Option>
            <Select.Option value="Married">Married</Select.Option>
            <Select.Option value="Divorced">Divorced</Select.Option>
            <Select.Option value="Widowed">Widowed</Select.Option>
            <Select.Option value="Separated">Separated</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date Of Birth"
          name="dob"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Date of Birth is required',
            },
          ]}
        >
          <DatePicker
            picker="date"
            placeholder="Choose your date of birth"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Email is required',
            },
            {
              type: 'email',
              message: 'Invalid email',
            },
            {
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="abc@gmail.com" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          {/* <Button block type="primary" htmlType="submit" size={'large'}
                >Submit </Button> */}
        </Form.Item>
      </Form>
    </Modal>
  )
}
