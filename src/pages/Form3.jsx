import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  InputAdornment,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PublicIcon from "@mui/icons-material/Public";

// Validation schema for Form3 using yup
const form3Schema = yup.object().shape({
  countryCode: yup
    .string()
    .oneOf(["+91", "+1"], "Invalid country code") // Must be either +91 or +1
    .required("Country code is required"), // Required field
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits") // Must be exactly 10 digits
    .required("Phone number is required"), // Required field
  acceptTermsAndCondition: yup
    .bool()
    .oneOf([true], "You must accept the terms and conditions") // Must be true (accepted)
    .required("Accepting terms is required"), // Required field
});

const Form3 = ({ onBack, onSubmit, initialData }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form3Schema),
    defaultValues: {
      countryCode: initialData.countryCode || "",
      phoneNumber: initialData.phoneNumber || "",
      acceptTermsAndCondition: initialData.acceptTermsAndCondition || false,
    },
  });

  // Function to handle form submission
  const handleFormSubmit = async (data) => {
    const finalData = { ...initialData, ...data };
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
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="m-12 mx-auto w-2/3 items-center justify-center text-center"
    >
      {/* Country Code dropdown */}
      <div className="mt-12">
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Country Code"
              fullWidth
              error={!!errors.countryCode}
              helperText={errors.countryCode?.message}
              InputProps={{
                className: "text-gray-300",
                startAdornment: (
                  <InputAdornment position="start">
                    <PublicIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ className: "text-gray-500" }}
            >
              <MenuItem value="+91">
                <span role="img" aria-label="India Flag" className="mr-2">
                  🇮🇳
                </span>{" "}
                India (+91)
              </MenuItem>
              <MenuItem value="+1">
                <span role="img" aria-label="USA Flag" className="mr-2">
                  🇺🇸
                </span>{" "}
                America (+1)
              </MenuItem>
            </TextField>
          )}
        />
      </div>

      {/* Phone Number input field */}
      <div className="mt-8">
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              InputProps={{
                className: "text-gray-300",
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ className: "text-gray-500" }}
            />
          )}
        />
      </div>

      {/* Terms and Conditions checkbox */}
      <div className="mt-10">
        <Controller
          name="acceptTermsAndCondition"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="I accept the terms and conditions"
              error={!!errors.acceptTermsAndCondition}
            />
          )}
        />
      </div>

      {/* Navigation buttons */}
      <div className="mt-16 flex flex-col md:flex-row md:justify-between">
        {/* Back button */}
        <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={onBack}>
          Back
        </Button>

        <div className="flex flex-col space-x-4 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          {/* Disabled Save and Next button */}
          <Button variant="contained" color="secondary" type="submit" disabled>
            Save and Next <ArrowForward />
          </Button>

          {/* Save button */}
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form3;
