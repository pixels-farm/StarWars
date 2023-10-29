import { useEffect, useLayoutEffect, useState } from "react";
import { Box, Icon, IconButton, Tooltip, Typography } from "@mui/material";
import iPlanet from "../../interface/iPlanet";
import { useNavigate, useParams } from "react-router-dom";
import { external } from "../../routing";
import { useAppDispatch } from "../../hooks/store";
import { showMessage } from "../../store/slices/messageSlice";
import NotFound from "../../components/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PageLayout from "../PageLayout";
import Loading from "../../components/Loading";
import iCharacter from "../../interface/iCharacter";
import { faPlanetRinged } from "@fortawesome/pro-duotone-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CharacterItem from "../CharactersPage/CharacterItem";
import FontAwesomeIconCustomized from "../../components/FontAwesomeIconCustomized";

const row = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

const PlanetPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [planet, setPlanet] = useState<iPlanet>();
  const [characters, setCharacters] = useState<iCharacter[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (id) {
      fetch(external.planetBaseUrl + `/${id}`, { cache: "force-cache" })
        .then((response) => {
          return response.ok ? response.json() : null;
        })
        .then((data) => setPlanet(data))
        .catch((e) => {
          console.error(e);
          dispatch(
            showMessage({
              message: "Can't load the planet",
              variant: "error",
            })
          );
        })
        .finally(() => setLoaded(true));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (planet?.residents) {
      Promise.all([
        ...planet.residents.map((peopleUrl) =>
          fetch(peopleUrl, { cache: "force-cache" })
            .then((response) => (response.ok ? response.json() : null))
            .then((data) => setCharacters((v) => [...v, data]))
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
    } else setReady(true);
  }, [planet, dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!loaded) {
    return (
      <PageLayout
        appBar={
          <Tooltip title="Back">
            <IconButton color="secondary" onClick={goBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
          </Tooltip>
        }
      >
        <Loading />
      </PageLayout>
    );
  }

  if (loaded && !planet) {
    return (
      <PageLayout
        appBar={
          <Tooltip title="Back">
            <IconButton color="secondary" onClick={goBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
          </Tooltip>
        }
      >
        <NotFound subject="planet" />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      appBar={
        <Tooltip title="Back">
          <IconButton color="secondary" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
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
                icon={faPlanetRinged as IconProp}
              />
            </Icon>
            <Typography color="skyblue.dark" variant="h1">
              {planet!.name}
            </Typography>
          </Box>
          <Box sx={{ ...row, marginTop: 2 }}>
            <Typography variant="body1" className="bold">
              Population count:
            </Typography>
            <Typography variant="body1">{planet?.population}</Typography>
          </Box>
          <Box
            sx={{ ...row, alignItems: characters.length ? "top" : "center" }}
          >
            <Typography variant="body1" className="bold">
              Related characters:
            </Typography>
            {!!characters.length ? (
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                {characters.map((character) => (
                  <CharacterItem mode="inline" character={character} />
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

export default PlanetPage;
