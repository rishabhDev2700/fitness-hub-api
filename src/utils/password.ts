import bcrypt from "bcrypt";
const saltRounds = 10;

export async function generatePasswordHash(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function checkPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
