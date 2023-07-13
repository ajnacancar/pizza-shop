import pkg from '@prisma/client';
const { PrismaClient, Prisma } = pkg;
const prisma = new PrismaClient()

const productsWithAverageRating = (products) => {
  if (Array.isArray(products)) {
    products.map((product) => {
      const averageRating = product.rating.reduce((sum, rating) => sum + rating.rating, 0) / product.rating.length;
      return {...product,averageRating};
      })
  } else {
    const averageRating = products.rating.reduce((sum, rating) => sum + rating.rating, 0) / products.rating.length;
    products.rating = averageRating;
  }


return products;
};


export const getAll = async () => {
  let pizzas = await prisma.pizza.findMany({
    include: {rating: true},
  });
  pizzas = productsWithAverageRating(pizzas);
  return {pizzas}
}


export const getNewest = async (number = 3) => {
  let pizzas = await prisma.pizza.findMany({
    include: {rating: true},
    take: number
  });
  pizzas = productsWithAverageRating(pizzas);
  return {pizzas}
}

export const getBest = async (number = 3) => {
  let pizzas = await prisma.pizza.findMany({
    include: {rating: true}
  });
  pizzas = productsWithAverageRating(pizzas);
  pizzas.sort(function(first, second) {
    return second["rating"] - first["rating"];
  });
  pizzas = pizzas.slice(0, number)
  return {pizzas}
}

export const search = async (searchParam) =>{
  let pizzas = await prisma.pizza.findMany({
    include: {rating: true},
    where: {name: {contains: searchParam}},
  });
  pizzas = productsWithAverageRating(pizzas);
  return {pizzas}
}


export const get = async (id) => {
  let pizza = await prisma.pizza.findUnique({
    include: {rating: true},
    where: {id: +id},
  });

  pizza = productsWithAverageRating(pizza);
  return {pizza}
}


export const getByCategory = async (category_id) => {
  let pizzas = await prisma.pizza.findMany({
    include: {rating: true},
    where: {category_id: +category_id},
  });

  pizzas = productsWithAverageRating(pizzas);
  return {pizzas}
}

export const create = async (pizzaData) => {
  const pizza = await prisma.pizza.create({
    data: {
      name: pizzaData.name,
      price: pizzaData.price,
      description: pizzaData.description.slice(0, 255),
      ingredients: pizzaData.ingredients,
      picture_link: pizzaData.picture_link,
      category_id: +pizzaData.category_id
    }
  });
  
  let message = pizza ? 'New pizza is created successfully' : 'Error in creating new pizza';
  return {message};
}

export const update = async (id, pizzaData) => {
  const pizza = await prisma.pizza.update({
    where: { id: +id },
    data: { 
      name: pizzaData.name,
      price: pizzaData.price,
      description: pizzaData.description,
      ingredients: pizzaData.ingredients,
      picture_link: pizzaData.picture_link,
      category_id: +pizzaData.category_id,
      }
  });

  let message = pizza ? 'Pizza updated successfully': 'Error in updating pizza';
  return {message};
}

export const remove = async (id) => {
  const pizza = await prisma.pizza.delete({where: {id: +id}})
  let message = pizza ? 'Pizza is deleted successfully' : 'Error in deleting pizza';
  return {message};
}
