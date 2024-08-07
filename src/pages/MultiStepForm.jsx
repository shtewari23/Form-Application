import React, { useState } from "react";
import { Box, Paper, Typography, Stepper, Step, StepLabel } from "@mui/material";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3"; // Ensure you have this component correctly
import SideInfo from "./SideInfo";
import { useNavigate } from "react-router-dom";

// Define the steps of the multi-step form
const steps = ["Form 1", "Form 2", "Form 3"];

const MultiStepForm = () => {
  const [step, setStep] = useState(0); // State to track the current step
  const [formData, setFormData] = useState({}); // State to hold form data
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to move to the next step
  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data })); // Combine current and new data
    setStep((prevStep) => prevStep + 1); // Increment step
  };

  // Function to move to the previous step
  const handleBack = () => setStep((prevStep) => prevStep - 1); // Decrement step

  // Function to save data without moving to the next step
  const handleSave = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data })); // Combine current and new data
  };

  // Function to handle form submission
  const handleSubmit = async (data) => {
    const finalData = { ...formData, ...data }; // Combine all form data
    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
      const result = await response.json();
      if (result.message === "Success") {
        navigate("/posts"); // Redirect to posts page on success
      }
    } catch (error) {
      console.error("Error submitting form:", error); // Log any errors
    }
  };

  return (
    <Box className="flex min-h-screen w-full bg-gray-100">
      <Paper className="flex w-full max-w-full rounded-lg">
        {/* SideInfo component is visible on large screens */}
        <Box className="m-8 hidden h-5/6 w-1/3 bg-gradient-to-r from-purple-500 to-purple-700 text-white lg:block lg:w-1/3">
          <SideInfo />
        </Box>

        {/* Main form area */}
        <Box className="justify-center bg-white sm:m-2 sm:w-full sm:p-2 sm:text-center md:m-12 md:p-8 lg:m-12 lg:w-2/3 lg:p-8">
          <Typography variant="h4" className="text-gray-800">
            Let’s get you started
          </Typography>
          <Box className="mr-2 mt-4">
            <Typography className="text-gray-600">Enter the details to get going</Typography>
          </Box>
          <Box className="mt-10">
            {/* Stepper component to display the current step */}
            <Stepper activeStep={step} alternativeLabel className="mb-4">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box mt={4}>
            {/* Render different forms based on the current step */}
            {step === 0 && <Form1 onSave={handleSave} onNext={handleNext} initialData={formData} />}
            {step === 1 && <Form2 onNext={handleNext} onBack={handleBack} initialData={formData} />}
            {step === 2 && (
              <Form3 onSubmit={handleSubmit} onBack={handleBack} initialData={formData} />
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MultiStepForm;
