import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

const BaseCard = (props) => {
  return (
    <Card color="info" style={props.style && { ...props.style }}>
      {props.title && (
        <Box display="flex" alignItems="center" m={1.8}>
          <Typography variant="h3">{props.title}</Typography>
        </Box>
      )}
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
