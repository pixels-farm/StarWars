import {
  FontAwesomeIcon as Base,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Palette, PaletteColor, styled } from "@mui/material";

interface FontAwesomeIconCustomizedProps
  extends Omit<FontAwesomeIconProps, "color"> {
  color?: keyof Palette;
}

const FontAwesomeIcon = styled(Base)(({ theme: { palette }, color }) => ({
  ...(!!color &&
    !!palette[color as keyof typeof palette] && {
      "--fa-primary-color": (
        palette[color as keyof typeof palette] as PaletteColor
      ).dark,
      "--fa-secondary-color": (
        palette[color as keyof typeof palette] as PaletteColor
      ).main,
    }),
}));

const FontAwesomeIconCustomized = (props: FontAwesomeIconCustomizedProps) => {
  return <FontAwesomeIcon {...props} />;
};

export default FontAwesomeIconCustomized;
