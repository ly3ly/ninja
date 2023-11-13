import { Row, Col, Card, Form, Input, Button } from "antd";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { Login as LoginApi } from "../services/login";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <Row>
      <Col md={{ span: 8, push: 8 }} xs={{ span: 24, push: 1 }}>
        <img
          src={logo}
          alt="ninja"
          style={{
            display: "block",
            margin: "20px auto",
            borderRadius: "50%",
            width: "200px",
          }}
        ></img>
        <Card title="Ninja">
          <Form
            form={form}
            labelCol={{ md: { span: 8 } }}
            onFinish={async (values) => {
              console.log(values);
              try {
                await LoginApi(values);
                navigate("/admin/dashboard");
              } catch (err) {
                form.setFields([
                  {
                    name: "Password",
                    errors: [
                      "Username and password doesn't match, please check them",
                    ],
                  },
                ]);
              }
            }}
          >
            <Form.Item
              label="Username"
              name="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Please input username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Please input password" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  display: "block",
                  margin: "8px auto",
                  width: "20vw",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
