import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

// Controller for users to view their past orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.id; // Assuming user ID is available from auth middleware

    const orders = await Order.find({ user: userId })
      .populate({
        path: "items.product",
        select: "name images", // Only populate necessary product fields
      })
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Controller for sellers to view orders containing their products
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.id; // Assuming seller ID is available from auth middleware

    // First find all products belonging to this seller
    const sellerProducts = await Product.find({ seller: sellerId }).select(
      "_id"
    );

    if (!sellerProducts.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No products found for this seller",
      });
    }

    // Find orders that contain any of the seller's products
    const orders = await Order.aggregate([
      {
        $unwind: "$items", // Break down the items array
      },
      {
        $match: {
          "items.product": {
            $in: sellerProducts.map((p) => p._id),
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          items: { $push: "$items" },
          shippingAddress: { $first: "$shippingAddress" },
          status: { $first: "$status" },
          paymentMethod: { $first: "$paymentMethod" },
          paymentStatus: { $first: "$paymentStatus" },
          totalAmount: { $first: "$totalAmount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          "user.password": 0, // Exclude sensitive user info
          "user.__v": 0,
          "productDetails.seller": 0,
          "productDetails.__v": 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller orders",
      error: error.message,
    });
  }
};

// Controller to get order details by ID (for both users and sellers)
export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validate required fields
    if (!items || !items.length || !shippingAddress || !paymentMethod) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Items, shipping address, and payment method are required",
      });
    }

    // Fetch product details and validate
    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } }).session(
      session
    );

    if (products.length !== items.length) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "One or more products not found",
      });
    }

    // Prepare order items with price validation
    let totalAmount = 0;
    const orderItems = items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.product);

      if (!product) {
        throw new Error(`Product ${item.product} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      const itemPrice = product.price * item.quantity;
      totalAmount += itemPrice;

      return {
        product: item.product,
        quantity: item.quantity,
        price: product.price, // Store the price at time of order
      };
    });

    // Create the order
    const order = new Order({
      user: userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending", // You might update this based on payment gateway response
      status: "pending",
      totalAmount,
    });

    // Update product stocks
    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { stock: -item.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOps, { session });
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    // Populate product details in the response
    const populatedOrder = await Order.findById(order._id)
      .populate({
        path: "items.product",
        select: "name images",
      })
      .populate({
        path: "user",
        select: "name email",
      });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: populatedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};
