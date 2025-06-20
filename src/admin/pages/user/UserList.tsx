import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useManagement } from "../../context/ManagementContext";
import { ForumUserDto } from "../../helpers/dto";

const UserList: React.FC = () => {
  const { users, deleteUser, fetchUsers } = useManagement();

  // Column definitions including new fields
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 200, flex: 1 },
    { field: "name", headerName: "Name", width: 150, flex: 1 },
    { field: "phone", headerName: "Phone", width: 150, flex: 1 },
    { field: "country_id", headerName: "Country ID", width: 100 },
    { field: "town", headerName: "Town", width: 150, flex: 1 },
    { field: "address", headerName: "Address", width: 200, flex: 1 },
    { field: "company", headerName: "Company", width: 200, flex: 1 },
    { field: "ip", headerName: "IP", width: 150 },
    { field: "link", headerName: "Link", width: 200, flex: 1 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: "insert_date",
      headerName: "Inserted",
      type: "dateTime",
      width: 180,
      valueGetter: ({ row }) => new Date(row.insert_date),
    },
    {
      field: "timestamp",
      headerName: "Updated",
      type: "dateTime",
      width: 180,
      valueGetter: ({ row }) => new Date(row.timestamp),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row as ForumUserDto)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Удалить"
          onClick={() => handleDelete((params.row as ForumUserDto).id)}
        />,
      ],
    },
  ];

  const handleEdit = (user: ForumUserDto) => {
    // Open your edit dialog or navigate to edit page
    console.log("Edit user", user);
    // e.g. openDialog(user)
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  const handleAdd = () => {
    // Open your create dialog or navigate to create page
    console.log("Add new user");
    // e.g. openDialog()
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6">Forum Users</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleAdd}>
          Add User
        </Button>
      </Box>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
          sorting: { sortModel: [{ field: "id", sort: "asc" }] },
          filter: { filterModel: { items: [] } },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        sx={{ flex: 1 }}
      />
    </Box>
  );
};

export default UserList;
