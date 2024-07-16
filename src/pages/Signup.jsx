import React from "react";
import Template from "../components/core/Auth/Template";
import signupImg from "../assets/Images/Signup.jpg";

function Signup() {
  return (
    <Template
      title="Join Us and Start Learning Today"
      description1="Sign up to access Our courses and start your learning journey."
      description2="Build skills for today, tomorrow, and beyond."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
