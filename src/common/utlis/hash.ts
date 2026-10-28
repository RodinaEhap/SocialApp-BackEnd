import bcrypt from "bcrypt";
export const hashPassword = async (plainText: string): Promise<string> => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
  return await bcrypt.hash(plainText, saltRounds);
};
export const comparePassword = async (
  plainText: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hash);
};
