import pkg from '@prisma/client';
const { PrismaClient, Prisma } = pkg;
const prisma = new PrismaClient()

export const rate = async (ratingData) => {
  const rating = await prisma.rating.create({
    data: {
      product_id: ratingData.product_id,
      rating: ratingData.rating
    }
  })

  let message = rating ? 'Rated successfully' : 'Error ocurred while saving the rating';
  return {message};
  }

