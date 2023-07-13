
import pkg from '@prisma/client';
const { PrismaClient, Prisma } = pkg;
const prisma = new PrismaClient()

import moment from "moment";

//create function inserts a new order into the databse
export const create = async (userId, orderData) => {
  let currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

  const order = await prisma.order.create({
    data: {
      customer_id: +userId,
      status: orderData.status,
      order_date: currentDate,
      price_amount: orderData.price_amount,
      price_currency: orderData.price_currency,
      shipping_street: orderData.shipping_street,
      shipping_city: orderData.shipping_city,
      shipping_postal_code: orderData.shipping_postal_code,
      shipping_country: orderData.shipping_country,
      special_instructions: orderData.special_instructions,
    }
  })

  let message = "Error in creating new order";

  if (order) {
    order.line_items.forEach((line_item) => {
      addNewOrderLineItem(line_item, order.id);
    });

    data = await getOrderById(order.id);
    return { data };
  } else {
    return { message };
  }
}

//addNewOrderLineItem function inserts a new order line item into the databse
export const addNewOrderLineItem = async (line_item_data, orderId) => {
  const line_item = await prisma.order_line_item.create({
    data: {
      product_id: +line_item_data.product_id,
      quantity: line_item_data.quantity,
      unit_price_amount: line_item_data.unit_price_amount,
      total_line_amount: line_item_data.total_line_amount,
      order_id: +orderId
    }
  })

  let message = "Error in creating new order line item";

  if (line_item) {
    let message = "New order line item is successfully created";
    return { message };
  } else {
    return { message };
  }
}

//get all orders
export const getAll = async () => {

  const orders = await prisma.order.findMany({
    include: { user: true },
  })


  return {
    orders,
  };
}

//get all orders for the logged in user
export const getAllOrdersForUser = async (id) => {
  const orders = await prisma.order.findMany({
    where: {
      customer_id: +id,
    },
    include: { user: true}
})


  return {
    orders,
  };
}

//get order by id
export const getOrderById = async (id) => {
  const order = await prisma.order.findUnique({
      where: {
        id: +id
      },
      include: { user: true}
  })

  const line_items = await prisma.order_line_item.findUnique({
    where: {
      order_id: +id
    },
    select: {
      id: true,
      order_id: true,
      name: true,
      quantity: true,
      unit_price_amount: true,
      total_line_amount: true,

    }
})


  return {
    order,
    line_items,
  };
}

//deleteOrder function deletes one order in the databse
export const deleteOrder = async (id) => {

  const order = await prisma.order.delete({
    where: {
      id: +id
    }
  })

  let message = "Error in deleting order";

  if (order) {
    message = "Order is deleted successfully";
  }

  return { message };
}

//updateOrder function updates status of the order
export const update = async (id, status) => {
  const order = await prisma.order.update({
    where: {
      id: +id
    },
    data: {
      status: status,
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss")
    }
  })

  let message = "Error in updating order";

  if (order) {
    message = "Order updated successfully";
  }

  return { message };
}
