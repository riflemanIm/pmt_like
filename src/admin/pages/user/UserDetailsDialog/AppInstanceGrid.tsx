import React from "react";
import { AppInstanceDto, ListDto } from "../../../helpers/dto";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  AppInstanceType,
  getEnumName,
  listEnums,
  NotificationRecordType,
  notificationRecordTypeNames,
  NotificationType,
} from "../../../helpers/enums";
import { getGridLocaleText } from "../../../helpers/grid";
import { useLanguageValue } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import DateFnsAdapter from "@date-io/date-fns";

interface AppInstanceGridProps {
  userId: number;
  onRequestData: (userId: number) => Promise<ListDto<AppInstanceDto>>;
}

const AppInstanceGrid = ({ userId, onRequestData }: AppInstanceGridProps) => {
  const { languageState } = useLanguageValue();
  const { t } = useTranslation();
  const dateFns = new DateFnsAdapter();

  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<AppInstanceDto[]>([]);

  React.useEffect(() => {
    if (!userId) return;
    setLoading(true);
    onRequestData(userId as number)
      .then((result) => {
        setRows(result.rows);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const columns: GridColDef<AppInstanceDto>[] = React.useMemo(
    () => [
      {
        field: "appInstanceId",
        align: "left",
        headerName: t("APP_INSTANCE.FIELDS.appInstanceId") ?? "",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "appInstanceType",
        align: "left",
        headerName: t("APP_INSTANCE.FIELDS.appInstanceType") ?? "",
        width: 120,
        type: "singleSelect",
        valueOptions: listEnums(AppInstanceType, t, "ENUMS.AppInstanceType"),
        valueFormatter: (value: string) =>
          getEnumName(AppInstanceType, value, t, "ENUMS.AppInstanceType"),
      },
      {
        field: "workspaceId",
        align: "left",
        headerName: t("APP_INSTANCE.FIELDS.workspaceId") ?? "",
        width: 80,
      },
      {
        field: "langCode",
        align: "left",
        headerName: t("APP_INSTANCE.FIELDS.langCode") ?? "",
        width: 100,
      },
      {
        field: "modifyDate",
        align: "right",
        headerName: t("APP_INSTANCE.FIELDS.modifyDate") ?? "",
        width: 150,
        type: "dateTime",
        valueFormatter: (value: string) =>
          value
            ? dateFns.formatByString(new Date(value), "dd.MM.yyyy HH:mm")
            : "",
      },
    ],
    [languageState.language]
  );
  return (
    <DataGrid
      loading={loading}
      rows={rows}
      columns={columns}
      getRowId={(row: AppInstanceDto) => row.appInstanceId}
      getRowHeight={() => "auto"}
      localeText={getGridLocaleText(languageState.language)}
      hideFooter
    />
  );
};

export default AppInstanceGrid;
