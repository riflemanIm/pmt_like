import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCountries } from "../../src/actions/user";
import ProfileForm from "./ProfileFormClient";

export default async function ProfilePage() {
  // Server-side: read auth token from cookies
  // const cookieStore = cookies(); // НЕ await!
  // const tokenCookie = cookieStore.get("auth_token");
  // const token = tokenCookie?.value;
  // if (!token) {
  //   // Not authenticated → redirect to signin
  //   redirect("/signin");
  // }

  // Fetch auxiliary data server-side
  const countries = await getCountries();
  console.log("countries", countries);
  return <ProfileForm countries={countries} />;
}
