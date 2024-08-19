import React, { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    } else if (formData.firstName.length < 3) {
      newErrors.firstName = "First Name must be at least 3 characters.";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    } else if (formData.lastName.length < 3) {
      newErrors.lastName = "Last Name must be at least 3 characters.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    // Confirm Password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage("Form submitted successfully!");
      console.log(formData);
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleSubmit}
            required
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleSubmit}
            required
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleSubmit}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleSubmit}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleSubmit}
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="field">
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit" className="button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
