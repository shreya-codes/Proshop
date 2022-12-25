import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/product.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    console.log("______________________");
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    console.log("______________________");

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(`error: ${error}`);

    process.exit();
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(`error: ${error}`);

    process.exit();
  }
};
if (process.argv[2] === "-d") {
  destroyData;
} else {
  importData();
}
