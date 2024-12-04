import React, { useState } from "react";
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
import { endpoints } from "../../../../../../utils/backend/endpoints";
import { apiService } from "../../../../../../utils/backend/apiService";

const AddProject = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    customerId: null,
    title: "",
    panels: [""],
    siteLocation: "",
    activity: "Pending",
    warranty: null,
    AMC: null,
    technical_documentation: null,
  });

  // Fetch customers using tanstack-query
  const { data: customers, isLoading } = useQuery({
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

    if (name === "panels") {
      setFormData((prev) => {
        const updatedPanels = [...prev.panels];
        updatedPanels[index] = value;
        return { ...prev, panels: updatedPanels };
      });

      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("formData >>", formData);

  const handleFiles = (e) => {
    const { name } = e.target;

    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleCustomerChange = (_, selectedCustomer) => {
    setFormData((prev) => ({
      ...prev,
      customerId: selectedCustomer?._id || null,
    }));
  };

  const handleAddPanel = () => {
    setFormData((prev) => ({
      ...prev,
      panels: [...prev.panels, ""],
    }));
  };

  const handleRemovePanel = (index) => {
    setFormData((prev) => ({
      ...prev,
      panels: prev.panels.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Adding Project. Please wait...");

    try {
      const filteredPanels = formData.panels.filter(
        (panel) => panel.trim() !== ""
      );

      // const dataToSubmit = { ...formData, panels: filteredPanels };

      const dataToSubmit = new FormData();
      dataToSubmit.append("customerId", formData.customerId);
      dataToSubmit.append("title", formData.title);
      dataToSubmit.append("siteLocation", formData.siteLocation);
      dataToSubmit.append("activity", formData.activity);
      filteredPanels.forEach((panel, index) => {
        dataToSubmit.append(`panels[${index}]`, panel);
      });
      dataToSubmit.append("warranty", formData.warranty);
      dataToSubmit.append("AMC", formData.AMC);
      dataToSubmit.append(
        "technical_documentation",
        formData.technical_documentation
      );

      const response = await apiService({
        endpoint: endpoints.addProject,
        method: "POST",
        data: dataToSubmit,
      });

      if (response?.response?.success) {
        toast.success("Project added successfully", { id: loadingToastId });
        setTimeout(() => navigate("/admin/projects"), 500);
      } else {
        throw new Error("Failed to add project");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: loadingToastId });
    }
  };

  console.log(">>>", formData);

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
          <h2 className="text-2xl font-bold mb-6 text-center">Add Project</h2>

          <form onSubmit={handleSubmit}>
            {/* Customer Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Select customer
              </label>
              <Autocomplete
                options={customers || []}
                getOptionLabel={(option) => option.name || ""}
                loading={isLoading}
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

            {/* Title Field */}
            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter title"
                  required
                />
              </div>
            )}

            {/* Panels Field */}
            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="panel"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Panels
                </label>
                <div>
                  {formData.panels.map((panel, index) => (
                    <div className="flex items-center mb-3 gap-2" key={index}>
                      <TextField
                        name="panels"
                        data-index={index}
                        value={panel}
                        onChange={(e) => handleChange(e, index)}
                        variant="outlined"
                        placeholder={`Enter panel ${index + 1}`}
                        fullWidth
                      />
                      <IconButton
                        onClick={() => handleRemovePanel(index)}
                        color="secondary"
                        sx={{ width: "fit-content" }}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </IconButton>
                    </div>
                  ))}
                </div>

                <Stack
                  onClick={handleAddPanel}
                  direction="row"
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                >
                  <IconButton sx={{ width: "fit-content" }}>
                    <PlusCircleIcon className="w-6 h-6" />
                  </IconButton>
                  <Typography>Add Panel</Typography>
                </Stack>
              </div>
            )}

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
                  required
                />
              </div>
            )}

            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="activity"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Activity Status
                </label>
                <select
                  id="activity"
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}

            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="warranty"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Warranty (PDF)
                </label>
                <input
                  type="file"
                  id="warranty"
                  name="warranty"
                  accept="application/pdf"
                  onChange={handleFiles}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            )}

            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="AMC"
                  className="block text-gray-700 font-bold mb-2"
                >
                  AMC (PDF)
                </label>
                <input
                  type="file"
                  id="AMC"
                  name="AMC"
                  accept="application/pdf"
                  onChange={handleFiles}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            )}

            {formData.customerId && (
              <div className="mb-4">
                <label
                  htmlFor="technical_documentation"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Technical Documentation (PDF)
                </label>
                <input
                  type="file"
                  id="technical_documentation"
                  name="technical_documentation"
                  accept="application/pdf"
                  onChange={handleFiles}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formData.customerId || !formData.title}
              >
                Add Project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProject;
