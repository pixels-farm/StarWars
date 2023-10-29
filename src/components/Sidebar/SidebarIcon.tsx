import { Box, IconButton, Typography, styled } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type SidebarIconProps = {
  onClick?: () => void;
  icon: IconProp;
  title: string;
  className?: string;
};

const Wrapper = styled(Box)(({ theme: { palette } }) => ({
  ".title": {
    color: palette.sand.main,
  },
  "&.active": {
    "--fa-primary-color": palette.skyblue.dark,
    "--fa-secondary-color": palette.bloody.dark,
    ".title": {
      color: palette.skyblue.dark,
    },
  },
  "&:hover": {
    "--fa-primary-color": palette.bloody.dark,
    "--fa-secondary-color": palette.skyblue.dark,
  },
}));

export default function SidebarIcon({
  onClick,
  icon,
  title,
  className,
}: SidebarIconProps) {
  return (
    <Wrapper
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className={className}
    >
      <IconButton color="sand" onClick={onClick} size="large" className="icon">
        <FontAwesomeIcon size="3x" icon={icon} />
      </IconButton>
      <Typography className="title" variant="caption">
        {title}
      </Typography>
    </Wrapper>
  );
}
