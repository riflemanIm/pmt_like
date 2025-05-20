// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { q } from '../../../src/lib/db';
import isEmpty, { clientIp } from '../../../src/helpers';
import { isValidEmail } from '../../../src/validation/validators';
import SENDMAIL from '../../../src/helpers/mail';
import md5 from 'md5';
import { sign } from 'jsonwebtoken';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

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

interface SignupResponse {
  result: 'ok';
  token: string;
  id: number;
}

export async function POST(request: NextRequest) {
  const {
    email,
    password,
    name,
    phone,
    country_id,
    town,
    address,
    company,
    link = '',
  } = (await request.json()) as SignupRequest;

  // Метод только POST
  if (request.method !== 'POST') {
    return NextResponse.json(
      { message: `Method ${request.method} Not Allowed` },
      { status: 405 }
    );
  }

  // Валидация email
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
  }

  try {
    // Проверяем, не зарегистрирован ли уже
    const exists = await q<(RowDataPacket & { id: number })[]>({
      query: 'SELECT id FROM forum_user WHERE email = ? LIMIT 1',
      values: [email],
    });
    if (!isEmpty(exists)) {
      return NextResponse.json({ message: 'EMAIL_EXISTS' }, { status: 400 });
    }

    // Подготовка данных для вставки
    const cookie_id = md5(Date.now().toString());
    const login = email.replace('@', '_');

    const result = await q<ResultSetHeader>({
      query: `
        INSERT INTO forum_user
          (login, email, pwd, name, phone,
           country_id, town, address, company,
           ipaddress, link, email_extra,
           change_pass_date, insert_date, timestamp, cookie_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
      `,
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
        clientIp(request), // ваш хелпер подсчёта IP
        link,
        email,
        '0000-00-00 00:00:00',
        cookie_id,
      ],
    });

    if (result.affectedRows !== 1) {
      throw new Error('INSERT_FAILED');
    }
    const userId = result.insertId;

    // Генерация JWT
    const token = sign(
      { id: userId, name, login, email, phone, country_id, town, address, company, link },
      process.env.TOKEN_KEY as string,
      { expiresIn: '360d' }
    );

    // Формируем ответ и ставим куки
    const res = NextResponse.json<SignupResponse>({ result: 'ok', token, id: userId });

    const maxAge = 60 * 60 * 24 * 30 * 12; // 360 дней
    res.cookies.set('cookie_auth_id', cookie_id, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge,
    });
    res.cookies.set('cookie_login', login, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge,
    });
    res.cookies.set('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    // Отправляем welcome-письмо асинхронно
    SENDMAIL(
      {
        from: `${name}<${email}>`,
        to: email,
        subject: 'New registration',
        text: `Welcome, ${name}! Your account has been created.`,
      },
      (info, error) => {
        if (error) console.error('[Signup Mail Error]', error);
        else console.log('[Signup Mail Info]', info);
      }
    );

    return res;
  } catch (error: any) {
    console.error('[Signup Error]', error);
    const message = error.message || 'Server error';
    const status = message === 'EMAIL_EXISTS' ? 400 : 500;
    return NextResponse.json({ message }, { status });
  }
}
