import bcrypt from "bcryptjs";

const hasePassword = async(password) => {
   const saltRounds = 10;
   const hashed = await bcrypt.hash(password, saltRounds)
   return hashed;
}

export default hasePassword