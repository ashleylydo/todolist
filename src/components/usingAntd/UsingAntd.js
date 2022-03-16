import 'antd/dist/antd.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row, Space, Table, } from 'antd'
import ModalComponent from './ModalComponent'
import EditForm from './EditForm'

const dayjs = require('dayjs')
/* let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat) */

export default function UsingAntd () {
  const [showEdit, setShowEdit] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [editData, setEditData] = useState({})
  const [editingKey, setEditingKey] = useState('')

  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      name: 'Mei',
      age: 20,
      status: 'Single',
      dob: 'March 10, 2002',
      email: 'abc@gmail.com',
    },
    {
      key: 1,
      name: 'Kye',
      age: 27,
      status: 'Single',
      dob: 'December 02, 1994',
      email: 'kye@hotmail.com',
    },
  ])

  const [count, setCount] = useState(dataSource.length)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'center',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 60,
      align: 'center',
    },
    {
      title: 'Marital Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      width: 200,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 170,
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 50,
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              // setShowEdit(true);
              handleEdit(record)
            }}
          >
            {' '}
            Edit
          </Button>
          <Button type="primary" onClick={() => handleDelete(record.key)}>
            {' '}
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  function handleEdit (data) {
    setEditData({ ...data })
    setEditingKey(data.key)
    if (editData.key === editingKey) {
      setShowEdit(true)
    }
  }

  const HandleAdd = (data) => {
    const date = dayjs(data.dob)
    setCount(count + 1)
    const newPerson = {
      key: count,
      name: data.name,
      age: data.age,
      status: data.status,
      dob: data.dob,
      email: data.email,
    }
    setDataSource((pre) => [...pre, newPerson])
    console.log(dataSource)
  }

  const HandleCancel = () => {
    if (showAdd) {
      setShowAdd(false)
    } else if (showEdit) {
      setShowEdit(false)
    }
    form.resetFields()
  }

  const handleDelete = (key) => {
    const deleteItem = dataSource.filter((item) => item.key !== key)
    setDataSource(deleteItem)
  }

  return (
    <>
      <br />
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        justify="center"
      >
        <Col className="gutter-row" span={18}>
          <Space>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setShowAdd(true)
              }}
            >
              Add a new person
            </Button>
            <Button type="primary" size="large">
              <Link to="/">Go Back</Link>
            </Button>
          </Space>

          <br />
          <br />
          <ModalComponent
            showAdd={showAdd}
            HandleCancel={HandleCancel}
            HandleAdd={HandleAdd}
            form={form}
          />
          <EditForm
            form={form}
            showEdit={showEdit}
            HandleCancel={HandleCancel}
            editData={editData}
          />
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </>
  )
}
