import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom"; // Correct import

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
});

export const Link = styled(LinkComponent)` // Correct usage of LinkComponent
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;
export default styled(LinkComponent);