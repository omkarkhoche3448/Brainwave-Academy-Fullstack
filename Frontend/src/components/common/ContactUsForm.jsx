import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import CountryCode from "../../data/countrycode.json";
import { contactForm } from "../../services/operations/contactAPI";
import { useDispatch } from "react-redux";

const ContactUsForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      dispatch(contactForm(data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
    toast.dismiss(toastId);
    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7 w-[260px] md:w-[500px] lg:w-fit mx-auto mt-10"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 w-full lg:w-1/2">
          <label htmlFor="firstName" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="-mt-1 text-xs text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-1/2">
          <label htmlFor="lastName" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="-mt-1 text-xs text-yellow-100">
              Please enter your lastName.
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-xs text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>
        <div className="flex gap-5">
          <div className="flex w-[80px] lg:w-[25%] flex-col gap-2">
            <select
              type="text"
              name="countrycode"
              id="countrycode"
              placeholder="Select country code"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-full">
            <input
              type="tel"
              name="phoneNo"
              id="phoneNo"
              placeholder="12345 67890"
              className="form-style w-[160px] md:w-full lg:w-full"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-xs text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-xs text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center font-bold shadow-md text-richblack-900
                  ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                  }
                  disabled:bg-gray-300 sm:text-sm`}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
