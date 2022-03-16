import React from 'react'
import { BrowserRouter as Router, Link, Route, Routes, } from 'react-router-dom'
import { Button } from 'antd'
import Todolist from './components/todolist/Todolist'
import UsingAntDesign from './components/usingAntd/UsingAntd'

function Outlet () {
  return null
}

export default function App () {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="todolist" element={<Todolist />} />
          ]
          <Route path="ant-design" element={<UsingAntDesign />} />
          ]
        </Routes>
      </Router>
    </div>
  )

  function Layout () {
    return (
      <div>
        <nav>
          <ul className="app-ul">
            <li>
              <Button type="primary" size="large">
                <Link to="todolist">TodoList</Link>
              </Button>
            </li>
            <li>
              <Button type="primary" size="large">
                <Link to="ant-design">Using Ant Design</Link>
              </Button>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    )
  }
}
