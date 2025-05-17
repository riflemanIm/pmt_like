// src/api/user.ts
import axios, { AxiosResponse } from "axios";
import { ForumUserDto } from "../helpers/dto";

const BASE = "/api/profile";

export async function fetchUsers(): Promise<ForumUserDto[]> {
  const res: AxiosResponse<ForumUserDto[]> = await axios.get(BASE);
  return res.data;
}

export async function createUser(user: ForumUserDto): Promise<ForumUserDto> {
  const res: AxiosResponse<ForumUserDto> = await axios.post(BASE, user);
  return res.data;
}

export async function updateUser(user: ForumUserDto): Promise<ForumUserDto> {
  const res: AxiosResponse<ForumUserDto> = await axios.put(BASE, user);
  return res.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${BASE}?id=${id}`);
}
