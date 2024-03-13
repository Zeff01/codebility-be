import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";

export class GeneratorProvider {
  static Uuid4(): string {
    return uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  }

  static generateHash(str: string): string {
    const salt = genSaltSync(10);
    const hashed = hashSync(str, salt);

    return hashed;
  }

  static validateHash(hash1: string, hash2: string): boolean {
    return compareSync(hash1, hash2);
  }

  static generateRandomString(): string {
    return randomBytes(4).toString("hex");
  }
}
