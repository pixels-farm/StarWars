import { Link, styled } from "@mui/material";

const LinkCustomized = styled(Link)(({ theme: { palette, typography } }) => ({
  ...typography.body1,
  cursor: "pointer",
  color: palette.skyblue.dark,
  "&:hover": {
    color: palette.red.main,
  },
  fontWeight: "bold",
}));

export default LinkCustomized;
