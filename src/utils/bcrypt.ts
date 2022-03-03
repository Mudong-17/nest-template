import * as bcrypt from 'bcrypt';

/**
 * Make salt
 */
export const makeSalt = () => bcrypt.genSaltSync(10);

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export const encryptPassword = (password: string, salt: string) =>
  bcrypt.hashSync(password, salt);

/**
 * Compare password
 * @param password 密码
 * @param hash hash密码
 */
export const isMatch = (password, hash) => bcrypt.compareSync(password, hash);
