import { useEffect, useLayoutEffect, useState } from "react";
import { Box, Icon, IconButton, Tooltip, Typography } from "@mui/material";
import iVehicle from "../../interface/iVehicle";
import { useNavigate, useParams } from "react-router-dom";
import { external } from "../../routing";
import { useAppDispatch } from "../../hooks/store";
import { showMessage } from "../../store/slices/messageSlice";
import NotFound from "../../components/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLayout from "../PageLayout";
import Loading from "../../components/Loading";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import FontAwesomeIconCustomized from "../../components/FontAwesomeIconCustomized";
import {
  faSpaceShuttle,
  faArrowLeft,
} from "@fortawesome/pro-duotone-svg-icons";

const row = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

const VehiclePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState<iVehicle>();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (id) {
      fetch(external.vehicleBaseUrl + `/${id}`, { cache: "force-cache" })
        .then((response) => {
          return response.ok ? response.json() : null;
        })
        .then((data) => setVehicle(data))
        .catch((e) => {
          console.error(e);
          dispatch(
            showMessage({
              message: "Can't load the vehicle",
              variant: "error",
            })
          );
        })
        .finally(() => setLoaded(true));
    }
  }, [dispatch, id]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!loaded) {
    return (
      <PageLayout
        appBar={
          <Tooltip title="Back">
            <IconButton color="secondary" onClick={goBack}>
              <FontAwesomeIcon icon={faArrowLeft as IconProp} />
            </IconButton>
          </Tooltip>
        }
      >
        <Loading />
      </PageLayout>
    );
  }

  if (loaded && !vehicle) {
    return (
      <PageLayout
        appBar={
          <Tooltip title="Back">
            <IconButton color="secondary" onClick={goBack}>
              <FontAwesomeIcon icon={faArrowLeft as IconProp} />
            </IconButton>
          </Tooltip>
        }
      >
        <NotFound subject="vehicle" />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      appBar={
        <Tooltip title="Back">
          <IconButton color="skyblue" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft as IconProp} />
          </IconButton>
        </Tooltip>
      }
    >
      <Box sx={row}>
        <Icon>
          <FontAwesomeIconCustomized
            color="skyblue"
            fixedWidth
            icon={faSpaceShuttle as IconProp}
          />
        </Icon>
        <Typography color="skyblue.dark" variant="h1">
          {vehicle!.name}
        </Typography>
      </Box>
      <Box sx={{ ...row, marginTop: 2 }}>
        <Typography variant="body1" className="bold">
          Type:
        </Typography>
        <Typography variant="body1">{vehicle?.vehicle_class}</Typography>
      </Box>
      <Box sx={{ ...row, alignItems: "center" }}>
        <Typography variant="body1" className="bold">
          Related characters:
        </Typography>
        <Typography variant="body1">Unknown</Typography>
      </Box>
    </PageLayout>
  );
};

export default VehiclePage;
