import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="w-[508px] h-[448px] top-32 left-466 p-8 gap-9 text-richblack-25 mx-auto my-auto">
      <div>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div>
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {!emailSent ? "Reset your password" : "Check email"}
            </h1>
            <p className="w-[340px] lg:w-fit my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                : `We have sent the reset email to ${email}`}
            </p>

            <form onSubmit={(e) => handleOnSubmit(e)}>
              {!emailSent && (
                <label>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    {" "}
                    Email Address <sup className="text-pink-200">*</sup>{" "}
                  </p>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the email"
                    className=" form-style w-[340px] lg:w-full"
                  />
                </label>
              )}

              <button
                type="submit"
                className="mt-6 w-[340px] lg:w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
              >
                {" "}
                {!emailSent ? "Sumbit" : "Resend Email"}{" "}
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Link to="/login">
          <p className="flex items-center gap-x-2 text-richblack-5">
            {" "}
            <BiArrowBack /> Back To Login{" "}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
