import { Box, Drawer, styled } from "@mui/material";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import {
  faHelmetBattle,
  faPlanetRinged,
  faSpaceShuttle,
} from "@fortawesome/pro-duotone-svg-icons";
import routes from "../../routing";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import useCurrentRoute from "../../hooks/useCurrentRoute";
import SidebarIcon from "./SidebarIcon";

const CustomSidebar = styled(Drawer)<{ padding?: number }>(
  ({ theme: { palette }, padding }) => ({
    " .MuiDrawer-paper": {
      width: "20%",
      minWidth: 200,
      backgroundColor: palette.primary.main,
      boxSizing: "border-box",
      padding: 20,
      paddingTop: 40,
    },
  })
);

const Sidebar = () => {
  const navigate = useNavigate();
  const path = useCurrentRoute();

  return (
    <CustomSidebar variant="permanent">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <Logo width={160} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            flexGrow: 1,
            marginTop: 8,
            gap: 4,
          }}
        >
          <SidebarIcon
            title="Characters"
            icon={faHelmetBattle as IconProp}
            onClick={() => navigate(routes.characters.page)}
            className={`${
              [routes.characters.page, routes.characters.view].indexOf(
                path?.route?.path || ""
              ) !== -1 && "active"
            }`}
          />
          <SidebarIcon
            title="Planets"
            icon={faPlanetRinged as IconProp}
            onClick={() => navigate(routes.planets.page)}
            className={`${
              [routes.planets.page, routes.planets.view].indexOf(
                path?.route?.path || ""
              ) !== -1 && "active"
            }`}
          />
          <SidebarIcon
            title="Vehicles"
            icon={faSpaceShuttle as IconProp}
            onClick={() => navigate(routes.vehicles.page)}
            className={`${
              [routes.vehicles.page, routes.vehicles.view].indexOf(
                path?.route?.path || ""
              ) !== -1 && "active"
            }`}
          />
        </Box>
      </Box>
    </CustomSidebar>
  );
};

export default Sidebar;
