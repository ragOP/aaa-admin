import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../utils/backend/apiService";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
    email: "",
    address: "",
    gst: "",
    contactPerson: "",
    phoneNumber: "",
  });

  const handleFieldChange = (name, value) => {
    const fieldHandlers = {
      phoneNumber: (val) => val.replace(/\D/g, ""),
    };

    return fieldHandlers[name] ? fieldHandlers[name](value) : value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: handleFieldChange(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Adding Customer. Please wait...");

    try {
      console.log(formData);

      const response = await apiService({
        endpoint: "api/admin/addCustomer",
        method: "POST",
        data: formData,
      });

      if (response?.response?.success) {
        toast.success("Customer added successfully", {
          id: loadingToastId,
        });
        setTimeout(() => {
          navigate("/admin/customers");
        }, 2000);
      } else {
        const errorMessage = response?.response?.data?.data?.message || "Erorr while creating customer, try again.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        id: loadingToastId,
      });
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="flex">
        <div
          className="max-w-md mx-auto bg-white shadow-lg p-8 mt-10"
          style={{ height: "auto", width: "90%" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Add Customer</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2"
              >
                Address
              </label>
              <input
                type="address"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter address"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="gst"
                className="block text-gray-700 font-bold mb-2"
              >
                GST
              </label>
              <input
                type="text"
                id="gst"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter gst"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactPerson"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter contact person"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter phoneNumber"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#fa2929] text-white px-4 py-2 rounded-md hover:bg-[#e62828] focus:outline-none"
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
