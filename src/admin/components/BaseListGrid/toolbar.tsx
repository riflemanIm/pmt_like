import React from "react";

import { Box, Button } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Cached as CachedIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface BaseListToolbarProps {
  startActions?: React.ReactElement;
  middleActions?: React.ReactElement;
  endActions?: React.ReactElement;
  hasExport?: boolean;
  onRefresh?: () => void;
}

export const createBaseListToolbar =
  (props: BaseListToolbarProps = {}) =>
  // eslint-disable-next-line react/display-name
  () => {
    const { t } = useTranslation();
    return (
      <GridToolbarContainer>
        {props.startActions}
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        {props.hasExport && <GridToolbarExport />}
        {props.onRefresh && (
          <Button
            size="small"
            color="primary"
            onClick={() => props.onRefresh!()}
            startIcon={<CachedIcon />}
          >
            {t("COMMON.REFRESH")}
          </Button>
        )}
        {props.middleActions}
        <Box sx={{ flexGrow: 1 }} />
        {props.endActions}
      </GridToolbarContainer>
    );
  };
