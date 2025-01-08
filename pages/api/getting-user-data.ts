import { NextApiRequest, NextApiResponse } from "next";
import { q } from "../../src/lib/db";
import isEmpty from "../../src/helpers";

interface User {
  id: number;
  name: string;
  pwd: string;
  login: string;
  email: string;
  phone: string;
  country_id: number;
  town: string;
  address: string;
  company: string;
  link: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const querySql = `
       SELECT 
        id,
        name,
        pwd,
        login,
        email,
        phone,
        country_id,        
        town,
        address,
        company,
        link
       FROM forum_user u 
       WHERE email=?
       LIMIT 1`;
    const result = await q({
      query: querySql,
      values: [req.body.email],
    }) as User[];

    if (isEmpty(result[0])) {
      return res.status(404).json({ message: "User not found" });
    }

    const user: User = result[0] as User;

    // Additional logic for handling user data can be added here

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Database query error: ${(error as Error).message}` });
  }
}
