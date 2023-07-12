import pkg from '@prisma/client';
import bcrypt from "bcrypt";

const { PrismaClient, Prisma } = pkg;
const prisma = new PrismaClient()

export const create = async (userData) => {
    let existingUser = await getUserByEmail(userData.email);
    if (!existingUser){
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await prisma.user.create({
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          username: userData.username,
          email: userData.email,
          password: hashedPassword
        },
      });
      if (user) return user;
      throw new Error("Error ocurred on creating new user.")
    }  
    throw new Error("'User with that email address already exists.") 
}


export const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({where: {email: email}})
  return user;
}

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({where: {id: +id}})
  return {user}
}

export const getAll = async () =>{
  const users = await prisma.user.findMany();
  return {users};
}

export const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {id},
  });
  message = user ? 'User with id ' + id + ' is successfully deleted.' : 'User could not be deleted.';
  return {message};
}


export const update = async (userData) => {
  const user = await prisma.user.update({
    where: { id: userData.id },
    data: { 
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      email: userData.email,
      is_admin: userData.is_admin,
     },
  });

  if (user) return user;
  throw new Error("Error ocurred on updating a user.")
}
