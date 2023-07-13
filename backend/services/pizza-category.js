import pkg from '@prisma/client';
const { PrismaClient, Prisma } = pkg;
const prisma = new PrismaClient()


export const getAll = async () => {
  const categories = await prisma.category.findMany()
  return {categories};
}

export const get = async (id) => {
  const category = await prisma.category.findUnique({where: {id: +id}})
  return {category}
}

export const create = async (categoryData) => {
    const category = await prisma.category.create({data: {name: categoryData.name}})
    let message = category ? 'New category is created successfully' : 'Error in creating new category';
    return {message};
}

export const update = async (id, categoryData) => {
  const category = await prisma.category.update({
    where: {id: +id},
    data: {name: categoryData.name}
  })

  let message = category ? 'Category updated successfully' : 'Error in updating category';  
  return {message};
}

export const remove = async (id) => {
  const category = await prisma.category.delete({where: {id: +id}})

  let message = category ? 'Category is deleted successfully' : 'Error in deleting category';
  return {message};
}