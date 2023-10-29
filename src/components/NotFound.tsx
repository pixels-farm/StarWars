import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  subject?: string;
};

export default function NotFound({ subject }: Props) {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography style={{ fontWeight: "bold" }}>{`${(
          subject || ""
        ).toUpperCase()} NOT FOUND`}</Typography>
        <Button variant="contained" color="primary" onClick={goBack}>
          Go back
        </Button>
      </div>
    </div>
  );
}
