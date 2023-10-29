import { forwardRef } from "react";
import { Box, Fab, InputBaseProps, Paper } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const INITIAL_WIDTH = 40;
const FINAL_WIDTH = 200;

export enum InputDisplayState {
  OPENED = "OPENED",
  CLOSED = "CLOSED",
}

export type AnimatedInputProps = Omit<
  Omit<InputBaseProps, "onChange">,
  "error"
> & {
  opened?: boolean;
  keepOpened?: boolean;
  children?: any;
  icon: any;
  onAnimationEnd?: (state: InputDisplayState) => void;
  onTriggerClick?: () => void;
};

const AnimatedInput = forwardRef(
  (
    {
      icon,
      opened,
      children,
      keepOpened,
      onAnimationEnd,
      onTriggerClick,
    }: AnimatedInputProps,
    ref: any
  ) => {
    const controls = useAnimation();
    const button = useAnimation();

    const handleMouseEnter = () => {
      controls.start({ minWidth: FINAL_WIDTH, width: "auto" });
      button.start({ rotate: -360 });
      setTimeout(() => {
        if (onAnimationEnd) onAnimationEnd(InputDisplayState.OPENED);
      }, 300);
    };

    const handleMouseLeave = () => {
      if (!keepOpened) {
        controls.start({ width: INITIAL_WIDTH });
        button.start({ rotate: 360 });
        setTimeout(() => {
          if (onAnimationEnd) onAnimationEnd(InputDisplayState.CLOSED);
        }, 300);
      }
    };

    return (
      <Paper
        animate={controls}
        component={motion.div}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={
          opened
            ? {
                minWidth: FINAL_WIDTH,
                width: "auto",
              }
            : {
                width: INITIAL_WIDTH,
              }
        }
        sx={{
          borderRadius: 20,
          position: "relative",
          display: "flex",
        }}
        ref={ref}
      >
        <Fab
          onClick={onTriggerClick}
          sx={{
            position: "absolute",
            left: 0,
          }}
          size="small"
        >
          <Box
            component={motion.span}
            animate={button}
            transition={{ duration: 1 }}
          >
            <FontAwesomeIcon icon={icon} />
          </Box>
        </Fab>

        {children}
      </Paper>
    );
  }
);

export default AnimatedInput;
