import { Form, Button, Checkbox, Typography, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import "./index.css";
import TextInput from "../../component/customInputs/TextInput";
import PasswordInput from "../../component/customInputs/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/Auth/authSlice";
import { showToast } from "../../utils";
const { Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginLoader } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    const { email, password } = values;
    const payload = { email, password };
  
    dispatch(userLogin(payload))
      .then((result) => {
        if (result?.success) {
          showToast("info", result?.message || "Login successful!");
          navigate("/");
        } else {
          showToast("error", result?.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        showToast("error", error?.response?.data?.message || "An error occurred. Please try again.");
      });
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          requiredMark="optional"
          onFinish={onFinish}
          layout="vertical"
        >
          <TextInput label="Email" name="email" type="email" required />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter your password"
          />

          <div className="login-options">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="loginBtn">
              {loginLoader ? <Spin indicator={<LoadingOutlined spin  style={{color:"white"}}/>} /> : "Login"}
            </Button>
          </Form.Item>

          <div className="or-divider">OR</div>

          <Form.Item>
            <Button block className="btnLink">
              Sent me a link to log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="bottom-links">
        <Text>
          Offering a service?{" "}
          <Link to="/sellers/create/">Join as a professional</Link>
        </Text>
        <br />
        <Text>
          Looking for a service? <Link to="/register-client">Get started</Link>
        </Text>
      </div>
    </div>
  );
};

export default LoginPage;
