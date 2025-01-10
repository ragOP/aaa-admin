import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../../../../../utils/backend/apiService";

const AddAmc = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: "",
        durationInMonths: "",
        projectName: "",
        panels: "",
        dateOfCommissioining: "",
        amount: 0
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataForRequest = new FormData();
        for (const key in formData) {
            formDataForRequest.append(key, formData[key]);
        }

        const loadingToastId = toast.loading("Adding Amc. Please wait...");

        try {
            const response = await apiService({
                endpoint: "api/admin/addAmc",
                method: "POST",
                data: formData,
            });

            if (response?.response?.success) {
                toast.success("Amc added successfully", {
                    id: loadingToastId,
                });
                setTimeout(() => {
                    navigate("/admin/amc");
                }, 2000);
            } else {
                const errorMessage = await response.text();
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
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Add Amc
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="companyName"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter company name"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="durationInMonths"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Duration in Months
                            </label>
                            <input
                                type="number"
                                id="durationInMonths"
                                name="durationInMonths"
                                value={formData.durationInMonths}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter Duration in Months"
                                required
                            />
                        </div>

                        {/* Name Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Project Name
                            </label>
                            <input
                                type="text"
                                id="projectName"
                                projectName="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter project name"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-6">
                            <label
                                htmlFor="dateOfCommissioining"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Date of Commissioining
                            </label>
                            <input
                                type="date"
                                id="dateOfCommissioining"
                                name="dateOfCommissioining"
                                value={formData.dateOfCommissioining}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter date Of commissioining"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="panels"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Panels
                            </label>
                            <ul>
                                <li>Panel 1</li>
                                <li>Panel 2</li>
                                <li>Panel 3</li>
                                <li>Panel 4</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="amount"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter amount"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-[#fa2929] text-white px-4 py-2 rounded-md hover:bg-[#e62828] focus:outline-none"
                            >
                                Add Amc
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddAmc;
