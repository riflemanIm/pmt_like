// app/api/signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { q } from '../../../src/lib/db';
import isEmpty from '../../../src/helpers';
import { sign } from 'jsonwebtoken';

interface LoginRequest {
  login: string;
  password: string;
}

interface UserRecord {
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

export async function POST(req: NextRequest) {
  const { login, password } = (await req.json()) as LoginRequest;

  if (!login || !password) {
    return NextResponse.json(
      { message: 'Login and password are required' },
      { status: 400 }
    );
  }

  // Ищем пользователя в БД
  const rows = await q<UserRecord[]>({
    query: `
      SELECT id, name, login, email, phone,
             country_id, town, address, company, link, role
      FROM forum_user
      WHERE (login = ? OR email = ?) AND pwd = ?
      LIMIT 1
    `,
    values: [login, login, password],
  });

  const user = rows[0];
  if (isEmpty(user)) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Генерим JWT
  const token = sign(
    { id: user.id, name: user.name, login: user.login, email: user.email, role: user.role },
    process.env.TOKEN_KEY as string,
    { expiresIn: '31d' }
  );

  // Собираем тело ответа
  const authUser = { ...user, token };

  // Формируем ответ и ставим куку auth_token
  const res = NextResponse.json(authUser);

  // maxAge в секундах: 3 дня
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 3,
  });

  return res;
}
