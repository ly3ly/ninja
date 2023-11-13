import MyLayout from "./components/MyLayout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ApiPage from "./pages/apis";
// import UserPage from "./pages/user.tsx"
import UserPage from "./pages/user";
import ApiBodyList from "./pages/about";
import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GetUser } from "./services/login.js";

function App() {
  // const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function handler() {
      try {
        const user = await GetUser();
        setUser(user);
      } catch (err) {
        navigate("/");
      }
    }
    handler();
  }, []);

  if (!user) {
    return <div></div>;
  }

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
  );
}

export default App;
