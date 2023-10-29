import { AppBar, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import LinkCustomized from "../components/LinkCustomized";
import { author } from "../routing";

type Props = {
  title?: string;
  children: JSX.Element | JSX.Element[];
  appBar?: JSX.Element | JSX.Element[];
};

export default function PageLayout({ title, children, appBar }: Props) {
  return (
    <>
      <Sidebar />
      <div style={{ width: "80%", position: "relative", marginLeft: "auto" }}>
        {appBar && (
          <AppBar
            position="sticky"
            style={{
              height: 56,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 16,
            }}
          >
            <div>
              {!!title && (
                <Typography color="skyblue.main" variant="h5">
                  {title}
                </Typography>
              )}
            </div>
            {appBar}
          </AppBar>
        )}

        <div
          style={{ padding: 24, backgroundColor: "#d7bf78", minHeight: "100%" }}
        >
          {children}
        </div>
        <AppBar position="sticky" sx={{ bottom: 0, padding: 1 }}>
          <LinkCustomized
            href={author}
            style={{ marginLeft: "auto", marginRight: 16 }}
          >
            Author
          </LinkCustomized>
        </AppBar>
      </div>
    </>
  );
}
