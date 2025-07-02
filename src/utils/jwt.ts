import jwt from "jsonwebtoken";

export interface JwtPayload {
  sub: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
export async function signJwt(
  payload: object,
  expiresIn = 36000
): Promise<string> {
  return new Promise((res, rej) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn }, (err, tok) =>
      err ? rej(err) : res(tok!)
    )
  );
}

export async function verifyJwt<T = object>(token: string): Promise<T> {
  return new Promise((res, rej) =>
    jwt.verify(token, JWT_SECRET, (err, decoded) =>
      err ? rej(err) : res(decoded as T)
    )
  );
}
