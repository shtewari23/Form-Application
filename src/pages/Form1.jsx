import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, InputAdornment } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

// Validation schema using yup
const schema = yup.object().shape({
  emailId: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .matches(/[A-Z].*[A-Z]/, "Must contain at least 2 uppercase letters")
    .matches(/[a-z].*[a-z]/, "Must contain at least 2 lowercase letters")
    .matches(/[0-9].*[0-9]/, "Must contain at least 2 numbers")
    .matches(/[^A-Za-z0-9].*[^A-Za-z0-9]/, "Must contain at least 2 special characters")
    .required("Password is required"),
});

const Form1 = ({ onSave, onNext, initialData }) => {
  // Setup react-hook-form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  // Effect to set form values when initialData changes
  React.useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  // Function to handle saving form data
  const handleSave = (data) => {
    if (onSave) onSave(data);
  };

  // Function to handle saving form data and moving to next step
  const handleSaveAndNext = (data) => {
    if (onSave) onSave(data);
    if (onNext) onNext();
  };

  return (
    <form className="m-12 mx-auto w-2/3 items-center justify-center text-center">
      {/* Email ID input field */}
      <div className="mt-12">
        <TextField
          label="Email ID"
          {...register("emailId")}
          error={!!errors.emailId}
          helperText={errors.emailId?.message}
          fullWidth
          className="rounded-lg border border-gray-600 bg-transparent"
          InputProps={{
            className: "text-gray-300",
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ className: "text-gray-500" }}
        />
      </div>

      {/* Password input field */}
      <div className="mt-8">
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          className="rounded-lg border border-gray-600 bg-transparent"
          InputProps={{
            className: "text-gray-300",
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ className: "text-gray-500" }}
        />
      </div>

      {/* Navigation buttons */}
      <div className="mt-16 flex flex-col md:flex-row md:justify-between">
        {/* Disabled back button */}
        <Button
          variant="contained"
          disabled
          startIcon={<ArrowBack />}
          className="mb-4 bg-purple-600 text-white md:mb-0"
        >
          Back
        </Button>

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          {/* Save button */}
          <Button
            variant="contained"
            className="bg-purple-600 text-white"
            onClick={handleSubmit(handleSave)}
          >
            Save
          </Button>

          {/* Save and Next button */}
          <Button
            variant="contained"
            className="bg-purple-600 text-white"
            endIcon={<ArrowForward />}
            onClick={handleSubmit(handleSaveAndNext)}
          >
            Save and Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form1;
