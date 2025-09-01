// import { Form, Button, Checkbox, Typography, Spin } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { LoadingOutlined } from "@ant-design/icons";
// import "./index.css";
// import TextInput from "../../component/customInputs/TextInput";
// import PasswordInput from "../../component/customInputs/PasswordInput";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogin } from "../../store/Auth/authSlice";
// import { showToast } from "../../utils";
// import { useEffect } from "react";
// const { Text } = Typography;

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { loginLoader } = useSelector((state) => state.auth);

//   const onFinish = (values) => {
//     const { email, password } = values;
//     const payload = { email, password };

//     dispatch(userLogin(payload))
//       .then((result) => {
//         if (result?.success) {
//           showToast("success", result?.message || "Login successful!");
//           if (result?.data?.active_status == 1) {
//             navigate("/leads");
//           } else if (result?.data?.active_status == 2) {
//             navigate("/buyers/create");
//           }
//         } else {
//           showToast(
//             "error",
//             result?.message || "Login failed. Please try again."
//           );
//         }
//       })
//       .catch((error) => {
//         showToast(
//           "error",
//           error?.response?.data?.message ||
//             "An error occurred. Please try again."
//         );
//       });
//   };
//   //   const { userToken } = useSelector((state) => state.auth);
//   // const { registerToken } = useSelector((state) => state.findJobs);

//   // useEffect(() => {
//   //   if (userToken || registerToken) {
//   //     showToast("info", "User already logged in");
//   //     navigate("/");
//   //   }
//   //   else {
//   //     navigate("/login")
//   //   }
//   // }, [userToken, registerToken, navigate]);

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="login-title">Login</h2>
//         <Form
//           name="login"
//           initialValues={{ remember: true }}
//           requiredMark="optional"
//           onFinish={onFinish}
//           layout="vertical"
//         >
//           <TextInput label="Email" name="email" type="email" required />

//           <PasswordInput
//             label="Password"
//             name="password"
//             placeholder="Enter your password"
//           />

//           <div className="login-options">
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>
//           </div>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="loginBtn">
//               {loginLoader ? (
//                 <Spin
//                   indicator={
//                     <LoadingOutlined spin style={{ color: "white" }} />
//                   }
//                 />
//               ) : (
//                 "Login"
//               )}
//             </Button>
//           </Form.Item>

//           <div className="or-divider">OR</div>

//           <Form.Item>
//             <Button block className="btnLink">
//               Send me a link to log in
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//       <div className="bottom-links">
//         <Text className="text">
//           Offering a service?{" "}
//           <Link to="/sellers/create/" className="linkText">
//             Join as a professional
//           </Link>
//         </Text>
//         <br />
//         <Text className="text">
//           Looking for a service?{" "}
//           <Link to="/sellers/create/" className="linkText">
//             Get started
//           </Link>
//         </Text>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { Form, Button, Checkbox, Typography, Spin } from "antd";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
import TextInput from "../../component/customInputs/TextInput";
import PasswordInput from "../../component/customInputs/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogin,
  setUserProfile,
  sendPasswordlessLink,
  fetchProfileFromMagicLink,
} from "../../store/Auth/authSlice";
import { showToast } from "../../utils";
import { useEffect, useState } from "react";

const { Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { lang, country } = useParams(); 
  const currentLang = lang || "en";
  const currentCountry = country || "gb";
  const [passwordless, setPasswordless] = useState(
    location.pathname === "/passwordless_login"
  );

  const { loginLoader, passwordlessLoader } = useSelector(
    (state) => state.auth
  );
  // 🔹 Check if magic link was clicked (client_id in URL)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientIdBase64 = urlParams.get("client_id");
     console.log("set new API kol");

    if (clientIdBase64) {
      dispatch(fetchProfileFromMagicLink())
        .then((res) => {
          
          if (res?.success) {
            
            if (res?.profileData?.active_status === 1) {
              navigate("/sellers/leads");
            } else if (res?.profileData?.active_status === 2) {
              navigate("/buyers/create");
            }
            else{
              //navigate("/dashboard");
            }

          }
        })
        .catch((err) => {
          showToast("error", err.message);
        });
    }
  }, [dispatch, navigate]);

  // 🔹 Normal Login with password
  const handleLogin = (values) => {
    const { email, password } = values;
    dispatch(userLogin({ email, password }))
      .then((result) => {
        if (result?.success) {
          showToast("success", result?.message || "Login successful!");
          if (result?.data?.active_status === 1) {
            navigate("/sellers/leads");
          } else if (result?.data?.active_status === 2) {
            navigate("/buyers/create");
          }
        } else {
          showToast(
            "error",
            result?.message || "Login failed. Please try again."
          );
        }
      })
      .catch((error) => {
        showToast(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };

  // 🔹 Send magic link
  const handlePasswordlessSend = (values) => {
    dispatch(sendPasswordlessLink({ email: values.email }))
      .then((result) => {
        if (result?.success) {
          showToast(
            "success",
            result?.message || "Magic link sent to your email."
          );
        } else {
          showToast("error", result?.message || "Failed to send magic link.");
        }
      })
      .catch((error) => {
        console.error("Passwordless send error:", error);
        showToast(
          "error",
          error?.message || "An error occurred. Please try again."
        );
      });
  };

  const onFinish = (values) => {
    if (passwordless) {
      handlePasswordlessSend(values);
    } else {
      handleLogin(values);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">
          {passwordless ? (
            <>
              Passwordless <br /> login
            </>
          ) : (
            "Login"
          )}
        </h1>

        <Form
          name="login"
          initialValues={{ remember: true }}
          requiredMark="optional"
          onFinish={onFinish}
          layout="vertical"
        >
          <TextInput label="Email" name="email" type="email" required />

          {!passwordless && (
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
          )}

          <div className="login-options">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="loginBtn"
              cursor="pointer"
            >
              {passwordless ? (
                passwordlessLoader ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                  />
                ) : (
                  "Send"
                )
              ) : loginLoader ? (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                />
              ) : (
                "Login"
              )}
            </Button>
          </Form.Item>

          {!passwordless && (
            <>
              <div className="or-divider">OR</div>
              <Form.Item>
                <Button
                  block
                  className="btnLink"
                  onClick={() => {
                    setPasswordless(true);
                    navigate("/passwordless_login");
                  }}
                >
                  Send me a link to log in
                </Button>
              </Form.Item>
            </>
          )}

          {passwordless && (
            <div style={{ textAlign: "left" }}>
              <Text
                style={{ cursor: "pointer", color: "#ABABAB" }}
                onClick={() => {
                  setPasswordless(false);
                  navigate(`/${currentLang}/${currentCountry}/login`);
                }}
              >
                Back to Login
              </Text>
            </div>
          )}
        </Form>
      </div>

      {!passwordless && (
        <div className="bottom-links">
          <Text className="text">
            Offering a service?{" "}
            <Link to={`/${currentLang}/${currentCountry}/sellers/create`} className="linkText">
              Join as a professional
            </Link>
          </Text>
          <br />
          <Text className="text">
            Looking for a service?{" "}
            <Link to={`/${currentLang}/${currentCountry}`} className="linkText">
              Get started
            </Link>
          </Text>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
