import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DevicesIcon from "@mui/icons-material/Devices";
import SendIcon from "@mui/icons-material/Send";
import SecurityIcon from "@mui/icons-material/Security";

const SideInfo = () => {
  return (
    <Box className="m-4 flex hidden flex-col items-center justify-center border-r-4 bg-gradient-to-r from-purple-500 to-purple-700 p-12 text-white lg:block">
      {/* Box container for the side information section */}

      <Box className="mb-6 flex items-start">
        <CheckCircleIcon className="mr-2 mt-1" /> {/* Icon for the first info section */}
        <Box>
          <Typography variant="h6">Quick and free sign-up</Typography>
          <Typography>Enter your email address to create an account.</Typography>
        </Box>
      </Box>

      <Box className="mb-6 flex items-start">
        <DevicesIcon className="mr-2 mt-1" /> {/* Icon for the second info section */}
        <Box>
          <Typography variant="h6">Cross-platform solution</Typography>
          <Typography>Preview your newsletters on any device before sending them out.</Typography>
        </Box>
      </Box>

      <Box className="mb-6 flex items-start">
        <SendIcon className="mr-2 mt-1" /> {/* Icon for the third info section */}
        <Box>
          <Typography variant="h6">Start sending emails</Typography>
          <Typography>Use our API or pick our pre-built templates.</Typography>
        </Box>
      </Box>

      <Box className="mb-6 flex items-start">
        <SecurityIcon className="mr-2 mt-1" /> {/* Icon for the fourth info section */}
        <Box>
          <Typography variant="h6">Secure and reliable</Typography>
          <Typography>Your data is protected with industry-standard security measures.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SideInfo;
