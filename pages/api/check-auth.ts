import type { NextApiRequest, NextApiResponse } from 'next';
import isEmpty from '../../src/helpers';
import { verify } from 'jsonwebtoken';

interface ErrorResponse {
  message: string;
}

interface SuccessResponse {
  message: 'Authentication successful';
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  // Extract token from Authorization header or 'user' cookie
  let token: string | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies.user) {
    try {
      const user = JSON.parse(req.cookies.user);
      token = user.token;
    } catch {
      // ignore JSON parse error
    }
  }
 // Ensure token is present
  if (!token) {
    return res.status(401).json({ message: 'A token is required for authentication' });
  }
  

  try {
    const decoded = verify(token, process.env.TOKEN_KEY as string);
    if (isEmpty(decoded)) {
      return res.status(401).json({ message: 'Check token has failed' });
    }
    return res.status(200).json({ message: 'Authentication successful' });
  } catch (err: any) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return res.status(401).json({ message: msg });
  }
}
