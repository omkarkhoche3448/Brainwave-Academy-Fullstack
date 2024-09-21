import React from "react";
import { toast } from "react-hot-toast";
import { FiCopy } from "react-icons/fi";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const testCredentials = {
  student: { email: "omkarkhoche3448@gmail.com", password: "Omkar123*5#" },
  instructor: { email: "omkarkhoche0509@gmail.com", password: "Omkar123*5#" },
  admin: { email: "omkarkhoche123@gmail.com", password: "Omkar123*5#" },
};

const TestCredentials = () => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="bg-richblack-800 p-6 rounded-lg text-richblack-25 mb-4 shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Test Credentials</h3>
      <p className="text-sm mb-6">
        Copy the credentials below and paste them into the appropriate fields.
        Ensure to paste the email into the email field and the password into the
        password field.
      </p>
      <div className="flex flex-col gap-4">
        {Object.entries(testCredentials).map(([role, { email, password }]) => (
          <div
            key={role}
            className="bg-richblack-700 p-4 rounded-lg flex flex-col gap-4 shadow-md"
          >
            <p className="text-xl font-medium text-richblack-5">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-richblack-400">
                  <AiOutlineMail size={20} />
                  <p className="text-sm">Email: {email}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-richblack-400">
                  <AiOutlineLock size={20} />
                  <p className="text-sm">Password: {password}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <FiCopy
                  onClick={() => handleCopy(email)}
                  title="Copy Email"
                  className="text-yellow-50 cursor-pointer mb-2"
                  size={24}
                />
                <FiCopy
                  onClick={() => handleCopy(password)}
                  title="Copy Password"
                  className="text-yellow-50 cursor-pointer"
                  size={24}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCredentials;
