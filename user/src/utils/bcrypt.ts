import * as bcrypt from "bcrypt"

export function encodePassword(rawPassword: string) {
  const SALT = +process.env.HASH_SALT

  return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}