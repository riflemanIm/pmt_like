import type { NextApiRequest, NextApiResponse } from 'next';
import { q } from '../../src/lib/db';
import isEmpty, { getParam } from '../../src/helpers';
import { sign } from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import type { RowDataPacket } from 'mysql2';

// Request body for login
interface LoginRequest {
  login: string;
  password: string;
  locale?: string;
}

// User record from DB
interface UserRecord extends RowDataPacket {
  id: number;
  name: string;
  login: string;
  email: string;
  phone: string;
  country_id: number;
  town: string | null;
  address: string | null;
  company: string | null;
  link: string | null;
  role: 'admin' | 'user';
}

// Response user with token
interface AuthUser extends Omit<UserRecord, 'town' | 'address' | 'company' | 'link'> {
  town: string | null;
  address: string | null;
  company: string | null;
  link: string | null;
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthUser | null | { message: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { login, password } = req.body as LoginRequest;

  try {
    const query = `
      SELECT
        id,
        name,
        login,
        email,
        phone,
        country_id,
        town,
        address,
        company,
        link,
        role
      FROM forum_user
      WHERE (login = ? OR email = ?) AND pwd = ?
      LIMIT 1`;

    const result = await q<UserRecord[]>({ query, values: [login, login, password] });
    const userRec = result[0];

    if (isEmpty(userRec)) {
      return res.status(200).json(null);
    }

    // Create JWT
    const token = sign(
      {
        id: userRec.id,
        name: userRec.name,
        login: userRec.login,
        email: userRec.email,
        role: userRec.role,
      },
      process.env.TOKEN_KEY as string,
      { expiresIn: '31d' }
    );

    const authUser: AuthUser = { ...userRec, token };

    // Set cookie for 3 days
    setCookie('user', JSON.stringify(authUser), {
      req,
      res,
      maxAge: 60 * 60 * 24 * 3, // 3 days in seconds
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json(authUser);
  } catch (error: any) {
    console.error('[Auth Error]', error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
}
