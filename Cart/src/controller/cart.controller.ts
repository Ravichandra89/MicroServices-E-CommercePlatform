import productModel from "../models/productModel";
import cartModel from "../models/cartModel";

// Get products from the cart
const getProductFromCart = async (req, res) => {
  try {
    const cartItems = await cartModel
      .find({ userId: req.user._id })
      .select("productId");

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const productIds = cartItems.map((item) => item.productId);
    const products = await productModel.find({ _id: { $in: productIds } });

    const totalPrice = products.reduce(
      (sum, product) => sum + product.price,
      0
    );

    res.status(200).json({
      success: true,
      products,
      totalPrice,
    });
  } catch (error) {
    console.error("Error while fetching products from cart", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching products from cart",
      error: error.message,
    });
  }
};

// Add a product to the cart
const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const addProduct = await cartModel.create({
      userId: req.user._id,
      productId,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: addProduct,
    });
  } catch (error) {
    console.error("Error while adding product to cart", error);
    res.status(500).json({
      success: false,
      message: "Error while adding product to cart",
      error: error.message,
    });
  }
};

// Delete a product from the cart
const deleteProductFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const deleteProduct = await cartModel.findOneAndDelete({
      userId: req.user._id,
      productId,
    });

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted from cart successfully",
      data: deleteProduct,
    });
  } catch (error) {
    console.error("Error while deleting product from cart", error);
    res.status(500).json({
      success: false,
      message: "Error while deleting product from cart",
      error: error.message,
    });
  }
};

// Checkout and clear the cart
const checkOut = async (req, res) => {
  try {
    await cartModel.deleteMany({ userId: req.user._id });

    res.status(200).json({
      success: true,
      message: "Checkout successful, cart cleared",
    });
  } catch (error) {
    console.error("Error while checking out", error);
    res.status(500).json({
      success: false,
      message: "Error while checking out",
      error: error.message,
    });
  }
};

export {
  getProductFromCart,
  addProductToCart,
  deleteProductFromCart,
  checkOut,
};
