import React, { useState } from 'react'
import { DatePicker, Form, Input, InputNumber, Modal, Select, } from 'antd'

export default function ModalComponent ({
  onChange,
  showAdd,
  handleAdd,
  handleCancel,
  form,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [fields, setFields] = useState([
    {
      name: [''],
      value: '',
    },
  ])
  const handleAfterClose = () => {
    setButtonDisabled(true)
    form.resetFields()
  }

  function handleFinish (fields) {
    handleAdd(fields)
    handleCancel()
  }

  return (
    <Modal
      forceRender
      title="Add a new person"
      visible={showAdd}
      getContainer={false}
      closable={false}
      maskClosable={false}
      width={620}
      okText="Submit"
      onCancel={handleCancel}
      afterClose={handleAfterClose}
      onOk={() => {
        form
          .validateFields()
          .then()
        setButtonDisabled(false)
      }}
      okButtonProps={{
        htmlType: 'submit',
        form: 'addForm',
        disabled: buttonDisabled,
      }}
    >
      <Form
        form={form}
        id="addForm"
        name="addForm"
        wrapperCol={{ span: 17 }}
        labelCol={{ span: 6 }}
        onFinish={handleFinish}
        preserve={false}
        fields={fields}
        onFieldsChange={() => {
          onChange = (newFields) => {
            setFields(newFields)
          }
          {
            const anyError = form.getFieldsError().some((field) => field.errors.length > 0)
            if (anyError) {
              setButtonDisabled(true)
              console.log('Validate failed: ', anyError)
            } else {
              setButtonDisabled(false)
            }
          }
        }
        }
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
        >
          <DatePicker
            style={{ width: '100%' }}
            picker="date"
            placeholder="What's your date of birth?"
            defaultValue={null}
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
        <Form.Item wrapperCol={{ span: 24 }} />
      </Form>
    </Modal>
  )
}
