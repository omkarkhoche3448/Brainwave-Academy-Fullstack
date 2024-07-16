import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { FaCheckCircle } from "react-icons/fa";

function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requirementsMet, setRequirementsMet] = useState({
    lowercase: false,
    uppercase: false,
    specialCharacter: false,
    number: false,
    minLength: false,
  });

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    const newPassword = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharacterRegex = /[@$!%*?&]/;
    const numberRegex = /[0-9]/;

    setRequirementsMet({
      lowercase: lowercaseRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      specialCharacter: specialCharacterRegex.test(password),
      number: numberRegex.test(password),
      minLength: password.length >= 8,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      !(
        requirementsMet.lowercase &&
        requirementsMet.uppercase &&
        requirementsMet.specialCharacter &&
        requirementsMet.number &&
        requirementsMet.minLength
      )
    ) {
      alert("Password does not meet the requirements.");
      return;
    }
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password
                {requirementsMet.lowercase &&
                requirementsMet.uppercase &&
                requirementsMet.specialCharacter &&
                requirementsMet.number &&
                requirementsMet.minLength ? (
                  <span className="text-green-500">*</span>
                ) : (
                  <div></div>
                )}
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full !pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm Password"
                className="form-style w-full !pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <div className="mt-2 flex lg:flex-wrap gap-2 text-[12px] text-white bg-red-500 p-2 rounded-md">
              {!requirementsMet.lowercase && (
                <div className="flex flex-row gap-1">
                  <FaCheckCircle />
                  At least one lowercase character.
                </div>
              )}
              {!requirementsMet.uppercase && (
                <div className="flex flex-row gap-1">
                  <FaCheckCircle />
                  At least one uppercase character.
                </div>
              )}
              {!requirementsMet.specialCharacter && (
                <div className="flex flex-row gap-1">
                  <FaCheckCircle />
                  At least one special character.
                </div>
              )}
              {!requirementsMet.number && (
                <div className="flex flex-row gap-1">
                  <FaCheckCircle />
                  At least one number.
                </div>
              )}
              {!requirementsMet.minLength && (
                <div className="flex flex-row gap-1">
                  <FaCheckCircle />
                  Minimum length of 8 characters.
                </div>
              )}
              {requirementsMet.lowercase && (
                <div className="flex flex-row gap-1  text-caribbeangreen-300 ">
                  <FaCheckCircle />
                  At least one lowercase character.
                </div>
              )}
              {requirementsMet.uppercase && (
                <div className="flex flex-row gap-1 text-caribbeangreen-300">
                  <FaCheckCircle />
                  At least one uppercase character.
                </div>
              )}
              {requirementsMet.specialCharacter && (
                <div className="flex flex-row gap-1  text-caribbeangreen-300">
                  <FaCheckCircle />
                  At least one special character.
                </div>
              )}
              {requirementsMet.number && (
                <div className="flex flex-row gap-1  text-caribbeangreen-300">
                  <FaCheckCircle />
                  At least one number.
                </div>
              )}
              {requirementsMet.minLength && (
                <div className="flex flex-row gap-1 text-caribbeangreen-300">
                  <FaCheckCircle />
                  Minimum length of 8 characters.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
