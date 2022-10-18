import React from "react";
import styles from "./SideBlock.module.scss";
import {Typography, Box} from "@mui/material";

export const SideBlock = ({ title, children }) => {
  return (
    <Box classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
