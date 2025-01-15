import React, { useState } from "react";
import {
  Avatar,
  Stack,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

// Custom VisuallyHiddenInput component for file input
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
  if (!value) return "Username is required";
  if (value.length < 5) return "Username must be at least 5 characters long";
  return "";
};

const passwordValidator = (value) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!value) return "Password is required";
  if (!strongPasswordRegex.test(value))
    return "Password must include uppercase, lowercase, number, and special character";
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

  return { value, error, changeHandler, validate: validateField };
};

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  // Input fields
  const name = useInputValidation("", (value) => (!value ? "Name is required" : ""));
  const bio = useInputValidation("", (value) => (!value ? "Bio is required" : ""));
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("", passwordValidator);

  // Avatar image state
  const [avatarImage, setAvatarImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (!isLogin || (name.validate() && bio.validate())) &&
      username.validate() &&
      password.validate()
    ) {
      console.log("Form Submitted", { name: name.value, bio: bio.value, username: username.value });
      onLogin(); // Simulate login
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to bottom, #f5f5e1, #f99f9f)",
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
          width: "100%",
          maxWidth: "400px",
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
                sx={{ marginTop: 2 }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
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
              <Stack position="relative" width="10rem" margin="auto" alignItems="center">
                <Avatar
                  sx={{ width: "10rem", height: "10rem", objectFit: "cover" }}
                  src={avatarImage || "/default-avatar.png"}
                />
                <IconButton
                  sx={{ position: "absolute", bottom: 0, right: 0 }}
                >
                  <CameraAlt />
                  <VisuallyHiddenInput type="file" onChange={handleFileChange} />
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
                sx={{ marginTop: 2 }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Sign Up
              </Button>
              <Button fullWidth variant="text" onClick={toggleLogin}>
                Login Instead
              </Button>
            </form>
          </>
        )}
      </Paper>
    </div>
  );
};

export default Login;
