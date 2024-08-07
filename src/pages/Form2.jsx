import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, InputAdornment } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import AbcIcon from "@mui/icons-material/Abc";
import HomeIcon from "@mui/icons-material/Home";

// Validation schema for Form2 using yup
const form2Schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed") // Only alphabets allowed
    .min(2) // Minimum length of 2 characters
    .max(50) // Maximum length of 50 characters
    .required("First name is required"), // Required field
  lastName: yup.string().matches(/^[A-Za-z]*$/, "Only alphabets are allowed"), // Only alphabets allowed
  address: yup.string().min(10).required("Address is required"), // Minimum length of 10 characters and required
});

const Form2 = ({ onNext, onBack, initialData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(form2Schema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      address: initialData.address || "",
    },
  });

  // Function to handle form submission
  const onSubmit = (data) => {
    // Combine with previous form data and pass to the next step
    onNext({ ...initialData, ...data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-12 mx-auto w-2/3 items-center justify-center text-center"
    >
      {/* First Name input field */}
      <div className="mt-8">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              InputProps={{
                className: "text-gray-300",
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ className: "text-gray-500" }}
            />
          )}
        />
      </div>

      {/* Last Name input field */}
      <div className="mt-6">
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              className="rounded-lg border border-gray-600 bg-transparent"
              InputProps={{
                className: "text-gray-300",
                startAdornment: (
                  <InputAdornment position="start">
                    <AbcIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ className: "text-gray-500" }}
            />
          )}
        />
      </div>

      {/* Address input field */}
      <div className="mt-6">
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              multiline
              rows={4}
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              className="rounded-lg border border-gray-600 bg-transparent"
              InputProps={{
                className: "text-gray-300",
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ className: "text-gray-500" }}
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
          {/* Save button */}
          <Button variant="contained" type="submit">
            Save
          </Button>

          {/* Save and Next button */}
          <Button variant="contained" type="submit">
            Save and Next <ArrowForward />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form2;
