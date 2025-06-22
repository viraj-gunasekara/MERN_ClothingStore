import { Box, Card, Modal } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const UpdateProductForm = ({ handleClose, open }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      size="large"
    >
        <Box sx={{ padding: 2, paddingLeft: 25, style }} className="rounded-md">
          <Card className="mt-2 p-6">
              Hi
          </Card>
        </Box>
    </Modal>
  );
};

export default UpdateProductForm;
