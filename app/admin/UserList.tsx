"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import { ForumUserDto } from "types/dto";
import { fetchUsers, deleteUser } from "actions/user";
import FullLayout from "layouts/FullLayout";
import img from "../../assets/images/bg/contact_bg.jpg";

const UserList: React.FC = () => {
  // теперь по умолчанию всегда массив
  const [users, setUsers] = useState<ForumUserDto[]>([]);

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleEdit = (user: ForumUserDto) => {
    console.log("Edit user", user);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(setUsers, users, id);
    }
  };

  const handleAdd = () => {
    console.log("Add new user");
  };

  const columns: GridColDef<ForumUserDto>[] = [
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

    // Упрощаем: убираем valueGetter и type, и в renderCell чисто работаем с params.value или params.row
    {
      field: "insert_date",
      headerName: "Inserted",
      width: 180,
      renderCell: (params) => {
        const d = params.row?.insert_date;
        return d ? dayjs(d).format("DD.MM.YYYY") : "";
      },
    },
    {
      field: "timestamp",
      headerName: "Updated",
      width: 180,
      renderCell: (params) => {
        const d = params.row?.timestamp;
        return d ? dayjs(d).format("DD.MM.YYYY") : "";
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <FullLayout img={img.src}>
      <Typography variant="h1" mb={8}>
        Пользователи
      </Typography>
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
        // гарантируем DataGrid всегда получает массив
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
    </FullLayout>
  );
};

export default UserList;
