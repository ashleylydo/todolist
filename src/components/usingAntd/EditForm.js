import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, InputNumber, Modal, Select, } from 'antd'
import dayjs from 'dayjs'

const toObject = require('dayjs/plugin/toObject')

dayjs.extend(toObject)

export default function EditForm ({
  onChange,
  showEdit,
  HandleCancel,
  form,
  editData,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [fields, setFields] = useState([editData])

  useEffect(() => {
    form.setFieldsValue({
      name: editData.name,
      age: editData.age,
      status: editData.status,
      /* dob: dayjs(editData.dob).toObject(), */
      dob: editData.dob,
      email: editData.email,
    })
  }, [form, editData])

  function handleFinish (fields) {
    form.resetFields()
    console.log(fields)
    HandleCancel()
  }

  return (
    <Modal
      forceRender
      title="Edit Information"
      visible={showEdit}
      destroyOnClose
      getContainer={false}
      closable={false}
      maskClosable={false}
      width={620}
      okText="Update"
      okButtonProps={{
        htmlType: 'submit',
        form: 'addForm',
        disabled: buttonDisabled,
      }}
      onOk={() => {
        form.validateFields().catch((info) => {
          console.log('Validate Failed:', info)
        })
      }}
      onCancel={HandleCancel}
    >
      <Form
        id="addForm"
        name="addForm"
        wrapperCol={{ span: 17 }}
        labelCol={{ span: 6 }}
        form={form}
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
            style={{ width: '100%' }}
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
