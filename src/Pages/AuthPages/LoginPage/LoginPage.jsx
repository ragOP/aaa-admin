import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./LoginPage.css";
import { apiService } from "../../../utils/backend/apiService";
import { endpoints } from "../../../utils/backend/endpoints";
import { getItem, setItem } from "../../../utils/local_storage";
import { useMediaQuery } from "@mui/material";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Logging in. Please wait...");

    try {
      const apiResponse = await apiService({
        method: "POST",
        endpoint: endpoints?.login,
        data: {
          userName: username,
          password,
        },
        removeToken: true,
      });

      if (apiResponse?.response?.success) {
        const data = await apiResponse?.response?.data;

        localStorage.setItem("token", data?.token);
        localStorage.setItem("username", username);

        toast.success("Login successful! Redirecting...", {
          id: loadingToastId,
        });

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        const errorMessage = apiResponse?.response?.data?.data?.message || "Erorr while login, try again.";
        toast.error(errorMessage, { id: loadingToastId });
      }
    } catch (error) {
      console.error("Server Error:", error?.message);
      toast.error("An error occurred during login. Please try again.", {
        id: loadingToastId,
      });
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 6000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="loginWrapper">
        {!isSmallScreen && (
          <div className="loginRight" data-aos="fade-left"></div>
        )}
        <div className="loginLeft" data-aos="fade-right">
          <div className="loginLeftContainer">
            <div className="loginLeftInfo">
              <div className="loginLeftTitle">
                <h6>
                  Welcome Back to the{" "}
                  <b style={{ color: "#7d5ffe" }}>AAA - SWITCHGEAR</b> Panel
                </h6>
                <p>Login and Get Started!</p>
              </div>
            </div>
            <form onSubmit={handleLogin}>
              <div className="coolinput">
                <label htmlFor="input" className="text">
                  Username:
                </label>
                <input
                  type="text"
                  placeholder="Enter your username*"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  name="input"
                  className="input"
                />
              </div>

              <div className="coolinput">
                <label htmlFor="input" className="text">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password*"
                  name="input"
                  className="input"
                />
              </div>

              <button
                className="loginBtn"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
