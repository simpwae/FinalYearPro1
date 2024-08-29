import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function LoginForm() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <SignedOut>
        <SignInButton>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: '10px 20px',
              fontSize: theme.typography.fontSize,
              borderRadius: '4px',
              boxShadow: theme.shadows[2],
              ':hover': {
                boxShadow: theme.shadows[4],
              },
            }}
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            boxShadow: theme.shadows[2],
          }}
        />
      </SignedIn>
    </Box>
  );
}

export default LoginForm;
