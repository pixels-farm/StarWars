import { useEffect, useLayoutEffect, useState } from "react";
import { Box, Icon, IconButton, Tooltip, Typography } from "@mui/material";
import iCharacter from "../../interface/iCharacter";
import { useNavigate, useParams } from "react-router-dom";
import { external } from "../../routing";
import { useAppDispatch } from "../../hooks/store";
import { showMessage } from "../../store/slices/messageSlice";
import NotFound from "../../components/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLayout from "../PageLayout";
import { getCharacterIcon } from "../../utils";
import iPlanet from "../../interface/iPlanet";
import Loading from "../../components/Loading";
import iVehicle from "../../interface/iVehicle";
import PlanetItem from "../PlanetsPage/PlanetItem";
import FontAwesomeIconCustomized from "../../components/FontAwesomeIconCustomized";
import VehicleItem from "../VehiclesPage/VehicleItem";
import { faArrowLeft } from "@fortawesome/pro-duotone-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const row = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

const CharacterPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [character, setCharacter] = useState<iCharacter>();
  const [homePlanet, setHomePlanet] = useState<iPlanet>();
  const [vehicles, setVehicles] = useState<iVehicle[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (id) {
      fetch(external.peopleBaseUrl + `/${id}`, { cache: "force-cache" })
        .then((response) => {
          return response.ok ? response.json() : null;
        })
        .then((data) => setCharacter(data))
        .catch((e) => {
          console.error(e);
          dispatch(
            showMessage({
              message: "Can't load the character",
              variant: "error",
            })
          );
        })
        .finally(() => setLoaded(true));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (character && character.homeworld) {
      Promise.all([
        fetch(character.homeworld, { cache: "force-cache" })
          .then((response) => (response.ok ? response.json() : null))
          .then((data) => setHomePlanet(data))
          .catch((e) => {
            console.error(e);
            dispatch(
              showMessage({
                message: "Can't load a home planet data",
                variant: "error",
              })
            );
          }),
        ...character.vehicles.map((vehicleUrl) =>
          fetch(vehicleUrl, { cache: "force-cache" })
            .then((response) => (response.ok ? response.json() : null))
            .then((data) => setVehicles((v) => [...v, data]))
            .catch((e) => {
              console.error(e);
              dispatch(
                showMessage({
                  message: "Can't load a home planet data",
                  variant: "error",
                })
              );
            })
        ),
      ]).finally(() => setReady(true));
    }
  }, [character, dispatch]);

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

  if (loaded && !character) {
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
        <NotFound subject="character" />
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
      {ready ? (
        <>
          <Box sx={row}>
            <Icon>
              <FontAwesomeIconCustomized
                color="skyblue"
                fixedWidth
                icon={getCharacterIcon(character!.gender)}
              />
            </Icon>
            <Typography color="skyblue.dark" variant="h1">
              {character!.name}
            </Typography>
          </Box>
          <Box sx={{ ...row, marginTop: 2 }}>
            <Typography variant="body1" className="bold">
              Race:
            </Typography>
            <Typography variant="body1">Unknown</Typography>
          </Box>
          <Box sx={row}>
            <Typography variant="body1" className="bold">
              Origin:
            </Typography>
            {!!character!.homeworld && homePlanet ? (
              <PlanetItem planet={homePlanet} mode="inline" />
            ) : (
              <Typography variant="body1">Unknown</Typography>
            )}
          </Box>
          <Box sx={row}>
            <Typography variant="body1" className="bold">
              Vehicles:
            </Typography>
            {!!character!.vehicles.length && !!vehicles.length ? (
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                {vehicles.map((vehicle) => (
                  <VehicleItem mode="inline" vehicle={vehicle} />
                ))}
              </Box>
            ) : (
              <Typography variant="body1">Unknown</Typography>
            )}
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </PageLayout>
  );
};

export default CharacterPage;
