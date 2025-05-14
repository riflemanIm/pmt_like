import type { NextApiRequest, NextApiResponse } from 'next';
import { q } from '../../src/lib/db';
import isEmpty, { clientIp } from '../../src/helpers';
import { isValidEmail } from '../../src/validation/validators';
import SENDMAIL from '../../src/helpers/mail';
import md5 from 'md5';
import { sign } from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

// Request body for sign-up
interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  country_id: number;
  town: string;
  address: string;
  company: string;
  link?: string;
}

// Response body
interface SignupResponse {
  result: 'ok';
  token: string;
  id: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse | { message: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const body = req.body as SignupRequest;
  const {
    email,
    password,
    name,
    phone,
    country_id,
    town,
    address,
    company,
    link = ''
  } = body;

  try {
    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Check for existing email
    const exists = await q<(RowDataPacket & { id: number })[]>({
      query: 'SELECT id FROM forum_user WHERE email = ? LIMIT 1',
      values: [email]
    });

    if (!isEmpty(exists)) {
      return res.status(400).json({ message: 'EMAIL_EXISTS' });
    }

    // Generate cookie_id
    const cookie_id = md5(new Date().getTime().toString());
    const login = email.replace('@', '_');

    // Insert new user
    const result = await q<ResultSetHeader>({
      query: `INSERT INTO forum_user
        (login, email, pwd, name, phone,
         country_id, town, address, company,
         ipaddress, link, email_extra,
         change_pass_date, insert_date, timestamp, cookie_id)
       VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)`,
      values: [
        login,
        email,
        password,
        name,
        phone,
        country_id,
        town,
        address,
        company,
        clientIp(req),
        link,
        email,
        '0000-00-00 00:00:00',
        cookie_id
      ]
    });

    if (result.affectedRows !== 1) {
      throw new Error('INSERT_FAILED');
    }

    const userId = result.insertId;

    // Generate JWT
    const token = sign(
      { id: userId, name, login, email, phone, country_id, town, address, company, link },
      process.env.TOKEN_KEY as string,
      { expiresIn: '360d' }
    );

    // Set cookies
    const maxAge = 60 * 60 * 24 * 30 * 12; // 360 days
    setCookie('cookie_auth_id', cookie_id, { req, res, maxAge, httpOnly: true, sameSite: 'lax', path: '/' });
    setCookie('cookie_login', login, { req, res, maxAge, httpOnly: true, sameSite: 'lax', path: '/' });
    setCookie('user', JSON.stringify({ id: userId, token }), { req, res, maxAge, httpOnly: true, sameSite: 'lax', path: '/' });

    // Send notification email
    SENDMAIL(
      {
        from: `${name}<${email}>`,
        to: email,
        subject: 'New registration',
        text: `Welcome, ${name}! Your account has been created.`
      },
      (info: any, error: any) => {
        if (error) console.error('[Signup Mail Error]', error);
        else console.log('[Signup Mail Info]', info);
      }
    );

    return res.status(200).json({ result: 'ok', token, id: userId });
  } catch (error: any) {
    console.error('[Signup Error]', error);
    const message = error.message || 'Server error';
    const status = message === 'EMAIL_EXISTS' ? 400 : 500;
    return res.status(status).json({ message });
  }
}
