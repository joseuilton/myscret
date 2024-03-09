import bcrypt from "bcrypt";

export default class HashGenerator {
  static async hash(input: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashString = await bcrypt.hash(input, salt);
    return hashString;
  }
}