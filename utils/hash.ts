import crypto from "crypto";

const hash = (password:string) => {
  return crypto
    .createHmac(process.env.HASH_TYPE ||"md5", process.env.HASH_KEY || "key")
    .update(password.trim())
    .digest('hex');
};

export default hash;