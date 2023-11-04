import MyLayout from "./components/MyLayout"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import ApiPage from "./pages/apis"
// import UserPage from "./pages/user.tsx"
import UserPage from "./pages/user"
import ApiBodyList from "./pages/about"
import { Button, Form } from "antd"
import { useForm } from "antd/es/form/Form"



function App() {
  // const [form] = Form.useForm();

  return (
    <MyLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="apis" element={<ApiPage />} />
        <Route path="users" element={<UserPage />} />
        {/* <Route path="about" element={<Form form={form}><ApiBodyList fatherForm="api_body" />
          <Button onClick={() => {
            console.log(form.getFieldsValue())
          }}>123123</Button>

        </Form>} /> */}


      </Routes>
    </MyLayout>
  )
}

export default App
