import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { CodeBlock } from "@atlaskit/code";

export interface SQLDialogProps {
  title: string;
  sql: string;
}

export default function SQLDialog(props: SQLDialogProps) {
  const { title, sql } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        View SQL
      </Button>
      <Dialog onClose={handleClose} open={open} disableScrollLock>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: "100%",
              minWidth: {
                xs: "300px",
                md: "475px",
              },
              height: "100%",
            }}
          >
            <CodeBlock language="sql" text={sql} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
