import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import {
  TextField,
  Button,
  IconButton,
  Autocomplete,
  Typography,
  Stack,
} from "@mui/material";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { endpoints } from "../../utils/backend/endpoints";
import { apiService } from "../../utils/backend/apiService";
import AudioRecorder from "../../components/AudioRecorder";

const AddComplaint = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    customerId: null,
    projectName: "",
    siteLocation: "",
    panelSectionName: "",
    issueDescription: "",
    severity: "",
    images: [],
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  // Severity Options
  const severityOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];

  // Fetch projects using tanstack-query
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await apiService({
        endpoint: endpoints.project,
        method: "GET",
      });
      return response?.response?.data?.projects || [];
    },
  });

  // Fetch customers using tanstack-query
  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await apiService({
        endpoint: endpoints.customer,
        method: "GET",
      });
      return response?.response?.data?.customers || [];
    },
  });

  // Handle input change for form fields
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    console.log(">>", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("formData >>", formData);

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: [...e.target.files],
    }));
  };

  const handleCustomerChange = (_, selectedCustomer) => {
    setFormData((prev) => ({
      ...prev,
      customerId: selectedCustomer?._id || null,
    }));
  };

  const handleProjectChange = (_, selectedProject) => {
    setFormData((prev) => ({
      ...prev,
      projectName: selectedProject?.title || "",
    }));

    setSelectedProject(selectedProject);
  };

  const handleChangePanel = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      panelSectionName: value || "",
    }));
  };

  const handleRecordingComplete = (blob) => {
    setAudioBlob(blob);
  };

  // const handleAddPanel = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     panels: [...prev.panels, ""],
  //   }));
  // };

  // const handleRemovePanel = (index) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     panels: prev.panels.filter((_, i) => i !== index),
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Adding Complaint. Please wait...");

    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append("customerId", formData.customerId);
      dataToSubmit.append("projectName", formData.projectName);
      dataToSubmit.append("issueDescription", formData.issueDescription);
      dataToSubmit.append("siteLocation", formData.siteLocation);
      dataToSubmit.append("panelSectionName", formData.panelSectionName);
      dataToSubmit.append("severity", formData.severity);
      formData.images.forEach((image) => {
        dataToSubmit.append("images", image);
      });

     if(audioBlob){
      dataToSubmit.append('voiceNote', {
          uri: `file://${audioBlob}`,
          type: 'audio/wav',
          name: 'audio.wav',
        });
     }

      const response = await apiService({
        endpoint: `api/customer/new-complaint/${formData.customerId}`,
        method: "POST",
        data: dataToSubmit,
      });

      if (response?.response?.success) {
        toast.success("Complaint added successfully", { id: loadingToastId });
        setTimeout(() => navigate("/admin/complaints"), 500);
      } else {
        throw new Error("Failed to add project");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: loadingToastId });
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: { background: "#363636", color: "#fff" },
        }}
      />
      <div className="flex">
        <div
          className="max-w-md mx-auto bg-white shadow-lg p-8 mt-10"
          style={{ height: "auto", width: "90%" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Add Complaint</h2>

          <form onSubmit={handleSubmit}>
            {/* Customer Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Select Customer
              </label>
              <Autocomplete
                options={customers || []}
                getOptionLabel={(option) => option.name || ""}
                loading={isLoadingCustomers}
                disableClearable
                value={
                  customers?.find(
                    (customer) => customer._id === formData.customerId
                  ) || null
                }
                onChange={handleCustomerChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#fff",
                        borderRadius: "0.5rem",
                      },
                      "& input": {
                        border: "none",
                      },
                    }}
                    required
                  />
                )}
              />
            </div>

            {/* Project Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Select Project
              </label>
              <Autocomplete
                options={projects || []}
                getOptionLabel={(option) => option.title || ""}
                loading={isLoading}
                disableClearable
                value={
                  projects?.find(
                    (project) => project.title === formData.projectName
                  ) || null
                }
                onChange={handleProjectChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#fff",
                        borderRadius: "0.5rem",
                      },
                      "& input": {
                        border: "none",
                      },
                    }}
                    required
                  />
                )}
              />
            </div>

            {/* Panel Dropdown Field */}
            {formData.customerId && selectedProject && (
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Select Panel
                </label>
                <Autocomplete
                  options={selectedProject.panels || []}
                  getOptionLabel={(option) => option || ""}
                  loading={isLoading}
                  disableClearable
                  value={
                    selectedProject.panels?.find(
                      (panel) => panel === formData.panelSectionName
                    ) || null
                  }
                  onChange={handleChangePanel}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fff",
                          borderRadius: "0.5rem",
                        },
                        "& input": {
                          border: "none",
                        },
                      }}
                      required
                    />
                  )}
                />
              </div>
            )}

            {/* Site Location Field */}
            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="siteLocation"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Site Location
                </label>
                <input
                  type="text"
                  id="siteLocation"
                  name="siteLocation"
                  value={formData.siteLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter site location"
                />
              </div>
            )}

            {/* Issue Description Field */}
            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="issueDescription"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Issue Description
                </label>
                <input
                  type="text"
                  id="issueDescription"
                  name="issueDescription"
                  value={formData.issueDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter issue description"
                />
              </div>
            )}

            {/* Severity Field (Low, Medium, High) */}
            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Select Severity Level
                </label>
                <Autocomplete
                  options={severityOptions}
                  getOptionLabel={(option) => option.label}
                  disableClearable
                  onChange={(_, selectedOption) => {
                    setFormData((prev) => ({
                      ...prev,
                      severity: selectedOption?.value || "",
                    }));
                  }}
                  value={
                    severityOptions.find(
                      (opt) => opt.value === formData.severity
                    ) || null
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fff",
                          borderRadius: "0.5rem",
                        },
                        "& input": {
                          border: "none",
                        },
                      }}
                      required
                    />
                  )}
                />
              </div>
            )}

            {/* Image Upload */}
            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 font-bold mb-2"
              >
                Upload Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.images &&
                  Array.from(formData.images).map((img, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${idx}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ))}
              </div>
            </div>

             <AudioRecorder onRecordingComplete={handleRecordingComplete} />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full"
              sx={{ paddingY: "10px", borderRadius: "0.5rem" }}
            >
              Submit Complaint
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddComplaint;
