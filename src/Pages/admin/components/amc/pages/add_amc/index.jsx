import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../../../../../utils/backend/apiService";
import { endpoints } from "../../../../../../utils/backend/endpoints";
import { useQuery } from "@tanstack/react-query";
import WarrantyCertificate from "../../../../../../components/warranty_certificate";
import html2pdf from "html2pdf.js";
import { Tooltip } from "@mui/material";
import { formatDuration } from "../../../warranty/pages/warranty_details";

const amcFormInitialState = {
    customerName: "",
    customerId: null,
    durationInMonths: "",
    projectName: "",
    projectId: "",
    panels: [],
    dateOfCommissioning: "",
    amount: 0,
    amcPdf: null,
    scope: ""
}

const AddAmc = () => {
    const navigate = useNavigate();
    const certificateRef = useRef(null);
    const { id } = useParams();

    const [isSubmittingWarranty, setIsSubmittingWarranty] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [formData, setFormData] = useState(amcFormInitialState);
    console.log(">>>", formData)
    const {
        data: projectsData = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const projectsApiResponse = await apiService({
                endpoint: endpoints.project,
                method: "GET",
            });

            const data = projectsApiResponse?.response?.data?.projects
            const modifiedData = data && data?.length > 0 ? data?.filter((it) => it?.title).map((project) => ({
                id: project?._id,
                title: project.title || "",
                panels: project?.panels,
                customerId: project?.customerId?._id,
                customerName: project?.customerId?.name,
            })) : []
            return modifiedData;
        },
    });

    const getPdfFile = () => {
        const element = certificateRef.current;
        const options = {
            margin: 0,
            filename: `${formData?.projectName || 'AMC_Certificate'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        };

        return html2pdf()
            .set(options)
            .from(element)
            .output('blob');
    };

    const handleChange = (e, key) => {
        if (key === "projectName") {
            const currentProject = projectsData.find((project) => project?.id === e.target.value) || [];
            setFormData({
                ...formData,
                projectId: currentProject?.id,
                projectName: currentProject.title || "",
                panels: currentProject?.panels || [],
                customerId: currentProject?.customerId || null,
                customerName: currentProject?.customerName || "",
            });
            return;
        }

        if (e.target.name === "durationInMonths" || e.target.name === "amount") {
            if (e.target.value < 0) {
                return;
            }
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmittingWarranty) {
            return;
        }

        const loadingToastId = toast.loading("Adding Amc. Please wait...");

        try {

            setIsSubmittingWarranty(true)
            const formDataForRequest = new FormData();

            const pdfBlob = await getPdfFile();
            const pdfFile = new File([pdfBlob], `${formData?.customerName || ''}_amc_certificate.pdf`, { type: 'application/pdf' });

            const formDataWithPdf = new FormData();

            formDataWithPdf.append("projectName", formData.projectName);
            formDataWithPdf.append("projectId", formData.projectId);
            formDataWithPdf.append("customerName", formData.customerName);
            formDataWithPdf.append("customerId", formData.customerId);
            formDataWithPdf.append("durationInMonths", formData.durationInMonths);
            formData.panels.forEach((item, index) => {
                formDataWithPdf.append(`panels[${index}]`, item);
            });
            formDataWithPdf.append("panels", JSON.stringify(formData.panels));
            formDataWithPdf.append("dateOfCommissioning", formData.dateOfCommissioning);
            formDataWithPdf.append("amount", formData.amount);
            formDataWithPdf.append("scope", formData.scope);
            formDataWithPdf.append("amcPdf", pdfFile);

            const response = id ?
                await apiService({
                    endpoint: `${endpoints.editAmc}/${id}`,
                    method: "PATCH",
                    data: formDataWithPdf,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                :
                await apiService({
                    endpoint: "api/admin/generate-amc",
                    method: "POST",
                    data: formDataWithPdf,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

            if (response?.response?.success) {
                toast.success(`Amc ${id ? "edited" : "added"} successfully`, {
                    id: loadingToastId,
                });
                setTimeout(() => {
                    navigate("/admin/amc");
                }, 2000);
            } else {
                const errorMessage = response?.response?.data?.message || `Erorr while ${id ? "editing" : "creating"} amc, try again.`;
                throw new Error(errorMessage);
            }
        } catch (error) {
            toast.error(`Error: ${error?.message}`, {
                id: loadingToastId,
            });
        } finally {
            setIsSubmittingWarranty(false)
        }
    };

    const fetchAndSaveAmcData = async () => {
        try {
            setIsFetchingData(true)

            const amcApiResponse = await apiService({
                endpoint: `${endpoints.getAmc}/${id}`,
                method: "GET",
            })
            if (amcApiResponse?.response?.success) {
                const data = amcApiResponse?.response?.data?.data;

                setFormData((prev) => ({
                    ...prev,
                    projectId: data?.projectId || "",
                    projectName: data?.projectName || "",
                    customerId: data?.customerId || "",
                    customerName: data?.customerName || "",
                    durationInMonths: data?.durationInMonths || "",
                    panels: data?.panels || [],
                    amount: data?.amount || 0,
                    scope: data?.scope || "",
                    dateOfCommissioning: data?.dateOfCommissioning ? new Date(data.dateOfCommissioning)?.toISOString()?.split('T')?.[0] : "",
                }))
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsFetchingData(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchAndSaveAmcData()
        } else {
            setFormData(amcFormInitialState)
        }
    }, [id])

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
                            <Tooltip title={id ? "You cannot edit project name" : ""}>
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-bold mb-2"
                                    disabled={id ? true : false}
                                >
                                    Project Name
                                </label>
                                <select
                                    id="projectName"
                                    name="projectName"
                                    value={formData.projectId}
                                    onChange={(e) => handleChange(e, "projectName")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                    disabled={id ? true : false}
                                >
                                    <option value="" disabled>Select project</option>
                                    {projectsData && projectsData?.length > 0 ? projectsData?.map((project) => (
                                        <option key={project?.id} value={project?.id}>{project.title}</option>
                                    )) :
                                        <option value="" disabled>No projects present</option>
                                    }

                                </select>
                            </Tooltip>
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
                                min="1"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="dateOfCommissioning"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Date of Commissioining
                            </label>
                            <input
                                type="date"
                                id="dateOfCommissioning"
                                name="dateOfCommissioning"
                                value={formData.dateOfCommissioning}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter date Of commissioining"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="customerName"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Customer Name
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter company name"
                                required
                                disabled
                            />
                        </div>

                        {formData?.projectName && <div className="mb-6">
                            <label
                                htmlFor="panels"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Panels
                            </label>
                            <ul>
                                {formData.panels && formData.panels.length > 0 ? (
                                    formData.panels.map((panel, index) => (
                                        <li key={index}>{panel}</li>
                                    ))
                                ) : (
                                    <li>No panels available</li>
                                )}
                            </ul>
                        </div>}

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
                                min="1"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="scope"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Scope
                            </label>
                            <input
                                type="number"
                                id="scope"
                                name="scope"
                                value={formData.scope}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                placeholder="Enter Scope"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-[#fa2929] text-white px-4 py-2 rounded-md hover:bg-[#e62828] focus:outline-none"
                            >
                                {`${id ? "Edit" : "Add"}`}{" "} Amc
                            </button>
                        </div>
                    </form>
                </div>

                <div style={{ display: "none" }}>
                    <WarrantyCertificate
                        ref={certificateRef}
                        companyName={formData.customerName}
                        durationInYears={formatDuration(formData.durationInMonths)}
                        dateOfCommissioning={formData.dateOfCommissioning}
                        projectName={formData.projectName}
                        panels={formData.panels}
                        type="amc"
                    />
                </div>
            </div>
        </>
    );
};

export default AddAmc;
