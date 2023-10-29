import { Button, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PageLayout from "../PageLayout";

const AuthorPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      appBar={
        <Tooltip title="Back">
          <IconButton color="secondary" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
        </Tooltip>
      }
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img alt="author" width="40%" src="/pxl.png" />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default AuthorPage;
