import React, { useState } from "react";
import {
  Avatar,
  Stack,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

// Create a custom VisuallyHiddenInput component for accessibility
const VisuallyHiddenInput = (props) => (
  <input
    {...props}
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0,
      cursor: "pointer",
    }}
  />
);

// Validators
const usernameValidator = (value) => {
  if (!value) {
    return "Username is required";
  }
  if (value.length < 5) {
    return "Username must be at least 5 characters long";
  }
  return "";
};

const passwordValidator = (value) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!value) {
    return "Password is required";
  }
  if (!strongPasswordRegex.test(value)) {
    return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
  }
  return "";
};

// Custom hook for input validation
const useInputValidation = (initialValue, validate) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const validateField = () => {
    const errorMsg = validate(value);
    setError(errorMsg);
    return !errorMsg;
  };

  return {
    value,
    error,
    changeHandler,
    validate: validateField,
  };
};

// Custom hook for file handling
const useFileHandler = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const changeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return { file, preview, changeHandler };
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  // Input fields with validation
  const name = useInputValidation("", (value) => (!value ? "Name is required" : ""));
  const bio = useInputValidation("", (value) => (!value ? "Bio is required" : ""));
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("", passwordValidator);

  // Avatar file handling
  const avatar = useFileHandler();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form validation and submission logic
    if (
      (!isLogin || (name.validate() && bio.validate())) &&
      username.validate() &&
      password.validate()
    ) {
      console.log("Form Submitted", {
        name: name.value,
        bio: bio.value,
        username: username.value,
        password: password.value,
        avatar: avatar.file,
      });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
                error={!!username.error}
                helperText={username.error}
              />
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
                error={!!password.error}
                helperText={password.error}
              />
              <Button
                sx={{
                  marginTop: 2,
                }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
              <Typography textAlign="center" m="1rem">
                OR
              </Typography>
              <Button fullWidth variant="text" onClick={toggleLogin}>
                Sign Up Instead
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
              <Stack
                position="relative"
                width="10rem"
                margin="auto"
                alignItems="center"
              >
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "cover",
                  }}
                  src={avatar.preview}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <CameraAlt />
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={avatar.changeHandler}
                  />
                </IconButton>
              </Stack>
              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
                error={!!name.error}
                helperText={name.error}
              />
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
                error={!!bio.error}
                helperText={bio.error}
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
                error={!!username.error}
                helperText={username.error}
              />
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
                error={!!password.error}
                helperText={password.error}
              />
              <Button
                sx={{
                  marginTop: 2,
                }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Sign Up
              </Button>
              <Typography textAlign="center" m="1rem">
                OR
              </Typography>
              <Button fullWidth variant="text" onClick={toggleLogin}>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
