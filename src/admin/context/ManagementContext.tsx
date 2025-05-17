// src/context/ManagementContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ForumUserDto } from "../helpers/dto";
import * as userApi from "../api/user";

interface ManagementContextType {
  users: ForumUserDto[];
  fetchUsers: () => Promise<void>;
  createUser: (user: ForumUserDto) => Promise<ForumUserDto>;
  updateUser: (user: ForumUserDto) => Promise<ForumUserDto>;
  deleteUser: (id: number) => Promise<void>;
}

const ManagementContext = createContext<ManagementContextType | undefined>(
  undefined
);

export const ManagementProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<ForumUserDto[]>([]);

  const loadUsers = async () => {
    const data = await userApi.fetchUsers();
    setUsers(data);
  };

  const handleCreate = async (user: ForumUserDto) => {
    const created = await userApi.createUser(user);
    setUsers((prev) => [...prev, created]);
    return created;
  };

  const handleUpdate = async (user: ForumUserDto) => {
    const updated = await userApi.updateUser(user);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    return updated;
  };

  const handleDelete = async (id: number) => {
    await userApi.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <ManagementContext.Provider
      value={{
        users,
        fetchUsers: loadUsers,
        createUser: handleCreate,
        updateUser: handleUpdate,
        deleteUser: handleDelete,
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export const useManagement = () => {
  const ctx = useContext(ManagementContext);
  if (!ctx)
    throw new Error("useManagement must be used within ManagementProvider");
  return ctx;
};
