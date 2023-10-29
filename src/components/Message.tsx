import { amber, blue, green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import {
  hideMessage,
  selectMessageOptions,
  selectMessageState,
} from "./../store/slices/messageSlice";
import { Box, SvgIcon } from "@mui/material";
import MappedType from "../type/MappedType";
import MessageType from "../enum/MessageType";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/pro-duotone-svg-icons";
import {
  faExclamationCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const StyledSnackbar = styled(Snackbar)<{ variant: MessageType }>(
  ({ theme, variant }) => ({
    "& .message-content": {
      ...(variant === MessageType.success && {
        backgroundColor: green[600],
        color: "#FFFFFF",
      }),

      ...(variant === MessageType.error && {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.getContrastText(theme.palette.error.dark),
      }),

      ...(variant === MessageType.info && {
        backgroundColor: blue[600],
        color: "#FFFFFF",
      }),

      ...(variant === MessageType.warning && {
        backgroundColor: amber[600],
        color: "#FFFFFF",
      }),
    },
  })
);

const variantIcon: MappedType<MessageType, IconProp> = {
  [MessageType.success]: faCheckCircle as IconProp,
  [MessageType.warning]: faExclamationCircle as IconProp,
  [MessageType.error]: faExclamationCircle as IconProp,
  [MessageType.info]: faInfoCircle as IconProp,
};

function Message() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectMessageState);
  const options = useAppSelector(selectMessageOptions);

  return (
    <StyledSnackbar
      {...options}
      open={state}
      onClose={() => dispatch(hideMessage())}
    >
      <SnackbarContent
        className="message-content"
        message={
          <Box style={{ display: "flex", alignItems: "center" }}>
            {variantIcon[options.variant] && (
              <FontAwesomeIcon icon={variantIcon[options.variant]} />
            )}
            <Typography style={{ marginLeft: "8px", marginRight: "8px" }}>
              {options.message}
            </Typography>
          </Box>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(hideMessage())}
            size="large"
          >
            <SvgIcon>heroicons-outline:x</SvgIcon>
          </IconButton>,
        ]}
      />
    </StyledSnackbar>
  );
}

export default memo(Message);
