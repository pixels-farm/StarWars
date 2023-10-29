import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Icon,
  ListItemAvatar,
  ListItemButton,
  ListItemProps,
  ListItemText,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinkCustomized from "./LinkCustomized";

const CustomizedItem = styled(ListItemButton)<ListItemProps>(
  ({ theme: { palette } }) => ({
    backgroundColor: palette.common.white,
    marginBottom: "4px",
    "&:hover": {
      backgroundColor: palette.skyblue.main,
      "--fa-primary-color": palette.red.dark,
      "--fa-secondary-color": palette.red.main,
      ".MuiTypography-root": {
        color: palette.red.main,
      },
    },
  })
);

export interface ListItemCustomizedProps {
  location?: string;
  icon: IconProp;
  children: string;
  mode?: "inline" | "list-item";
}

const ListItemCustomized = ({
  location,
  icon,
  children,
  mode = "list-item",
}: ListItemCustomizedProps) => {
  const navigate = useNavigate();

  if (mode === "inline")
    return (
      <LinkCustomized color="secondary" href={location}>
        {children}
      </LinkCustomized>
    );

  return (
    <CustomizedItem
      component={"a"}
      onClick={() => !!location && navigate(location)}
    >
      <ListItemAvatar>
        <Icon color="primary">
          <FontAwesomeIcon fixedWidth icon={icon} />
        </Icon>
      </ListItemAvatar>
      <ListItemText primary={children} />
    </CustomizedItem>
  );
};

export default ListItemCustomized;
