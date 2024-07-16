import React from "react";
import Template from "../components/core/Auth/Template";
import loginImg from "../assets/Images/Login.jpg";

function Login({ setIsLoggedIn }) {
  return (
    <Template
      title="Welcome Back"
      description1="Login to access your courses and start learning."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;
