import React from "react";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowSelectionModel,
  GridSortModel,
  GridValidRowModel,
} from "@mui/x-data-grid";

import { getGridLocaleText } from "../../helpers/grid";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GenericAction, GenericListState } from "../../helpers/state";
import { OrderDirection } from "../../helpers/dto";
import { createBaseListToolbar } from "./toolbar";
import { DEFAULT_FILTER_DELAY } from "../../config/TableSettings";

export interface BaseListGrid<
  Dto extends GridValidRowModel,
  DispatchType extends React.Dispatch<GenericAction>
> {
  /**
   * Доп. параметры
   */
  params?: number[];
  /**
   * Префикс для хранения в localStorage
   */
  storagePrefix: string;
  /**
   * Имя файл экспорта
   */
  exportName?: string;
  /**
   * Сортировка по-умолчанию
   */
  defaultSort?: GridSortModel;
  /**
   * Состояние
   */
  state: GenericListState<Dto>;
  dispatch: DispatchType;
  /**
   * Набор колонок
   */
  columns: GridColDef<Dto>[];
  /**
   * Ключевое поле
   */
  idField: keyof Dto;
  doFetch: (
    startIndex?: number,
    count?: number,
    filter?: string,
    orderBy?: string,
    order?: OrderDirection,
    ...params: number[]
  ) => (dispatch: DispatchType) => Promise<void>;
  loading?: boolean;
  checkboxSelection?: boolean;
  rowSelectionModel?: GridRowSelectionModel;
  onRowSelectionModelChange?: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails
  ) => void;
  onFilterModelChange?: (model: GridFilterModel) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  startActions?: React.ReactElement;
  middleActions?: React.ReactElement;
  endActions?: React.ReactElement;
}

export const BaseListGrid = <
  Dto extends GridValidRowModel,
  DispatchType extends React.Dispatch<GenericAction> = React.Dispatch<GenericAction>
>({
  params,
  storagePrefix,
  exportName,
  defaultSort,
  state,
  dispatch,
  columns,
  idField,
  doFetch,
  loading,
  checkboxSelection,
  rowSelectionModel,
  onRowSelectionModelChange,
  onFilterModelChange,
  onSortModelChange,
  startActions,
  middleActions,
  endActions,
}: BaseListGrid<Dto, DispatchType>): JSX.Element => {
  const languageState = "ru";
  const [refreshIndex, setRefreshIndex] = React.useState(0);

  const [isDelayFilter, setIsDelayFilter] = React.useState(false);
  const delayForFind =
    import.meta.env.VITE_FILTER_DELAY ?? DEFAULT_FILTER_DELAY;

  const [sortModel, setSortModel] = useLocalStorage<GridSortModel>(
    `${storagePrefix}:sort`,
    defaultSort ?? []
  );

  const [filterModel, setFilterModel] = useLocalStorage<GridFilterModel>(
    `${storagePrefix}:filter2`,
    {
      items: [],
    }
  );
  const [paginationModel, setPaginationModel] =
    useLocalStorage<GridPaginationModel>(`${storagePrefix}:paginationModel`, {
      page: 0,
      pageSize: 10,
    });
  const [rows, setRows] = React.useState<Dto[]>([]);

  const execDoFetch = () => {
    const startIndex = paginationModel.page * paginationModel.pageSize;
    //console.log('test findByChange: ', startIndex, filterModel)
    doFetch(
      startIndex,
      paginationModel.pageSize,
      JSON.stringify(filterModel),
      sortModel[0]?.field,
      sortModel[0]?.sort,
      ...(params ?? [])
    )(dispatch);
  };

  const findWithFilterByChange = () => {
    if (import.meta.env.VITE_ENABLE_FILTER_DELAY) {
      if (!isDelayFilter) {
        setIsDelayFilter(true);
        setTimeout(() => {
          setIsDelayFilter(false);
          execDoFetch();
        }, delayForFind * 1000);
      }
    } else {
      execDoFetch();
    }
  };

  React.useEffect(() => {
    execDoFetch();
  }, [
    refreshIndex,
    paginationModel,
    //filterModel,
    sortModel,
    state.fetchIndex,
    ...(params ?? []),
  ]);

  React.useEffect(() => {
    setRows(state.rows);
  }, [state.rows]);

  React.useEffect(() => {
    if (onSortModelChange) onSortModelChange(sortModel);
  }, [sortModel]);

  React.useEffect(() => {
    if (onFilterModelChange) {
      onFilterModelChange(filterModel);
    }
    findWithFilterByChange();
  }, [filterModel]);

  return (
    <DataGrid
      loading={state.loading || (loading ?? false)}
      autoHeight
      rows={rows}
      columns={columns}
      getRowId={(row: Dto) => row[idField]}
      rowCount={state.totalCount}
      getRowHeight={() => "auto"}
      paginationMode="server"
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={(newPaginationModel) =>
        setPaginationModel(newPaginationModel)
      }
      sortModel={sortModel}
      onSortModelChange={(newSortModel) => {
        setSortModel(newSortModel);
      }}
      filterModel={filterModel}
      filterMode="server"
      onFilterModelChange={(newFilterModel) => {
        setFilterModel(newFilterModel);
      }}
      localeText={getGridLocaleText(languageState.language)}
      checkboxSelection={checkboxSelection}
      keepNonExistentRowsSelected={checkboxSelection}
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={onRowSelectionModelChange}
      slots={{
        toolbar: createBaseListToolbar({
          startActions,
          middleActions,
          endActions,
          hasExport: !!exportName,
          onRefresh: () => setRefreshIndex(refreshIndex + 1),
        }),
      }}
      slotProps={{
        toolbar: {
          csvOptions: {
            fileName: exportName,
            disableToolbarButton: !exportName,
            delimiter: ";",
            utf8WithBom: true,
          },
        },
      }}
    />
  );
};
