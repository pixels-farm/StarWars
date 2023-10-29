import { Typography } from "@mui/material";

type Props = {
  text?: string;
};

export default function Loading({ text }: Props) {
  return <Typography variant="body1">{text || "Loading..."}</Typography>;
}
