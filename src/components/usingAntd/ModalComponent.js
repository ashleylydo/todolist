import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, InputNumber, Modal, Select, } from 'antd'

export default function ModalComponent ({
  onChange,
  showAdd,
  HandleAdd,
  HandleCancel,
  form,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [fields, setFields] = useState([
    {
      name: [''],
      value: '',
    },
  ])

  useEffect(() => {
    form.resetFields()
  })

  function handleFinish (fields) {
    form.resetFields()
    console.log(fields)
    HandleAdd(fields)
    HandleCancel()
  }

  return (
    <Modal
      forceRender
      title="Add a new person"
      visible={showAdd}
      destroyOnClose
      getContainer={false}
      closable={false}
      maskClosable={false}
      width={620}
      okText="Submit"
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
          <Input style={{ width: '100%' }} placeholder="What's your name?" />
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
          <InputNumber
            size="default"
            style={{ width: '28%' }}
            placeholder="Your Age"
          />
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
        />
        <DatePicker
          style={{ width: '100%' }}
          picker="date"
          placeholder="What's your date of birth?"
        />
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
        <Form.Item wrapperCol={{ span: 24 }} />
      </Form>
    </Modal>
  )
}
