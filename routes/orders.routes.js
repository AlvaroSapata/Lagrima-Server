const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const nodemailer = require("nodemailer");

router.get("/", (req, res, next) => {
  res.json("Checking Lagrima orders route");
});

//*! POST /orders/createOrder - Crear un pedido sin confirmar
router.post("/createOrder", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  console.log(userId);

  try {
    // Primero, verifica si el carrito del usuario no está vacío
    const user = await User.findById(userId).populate("cart.productId");
    console.log(user);
    if (user.cart.length === 0) {
      return res.status(400).json({
        error: "El carrito está vacío. No se puede crear un pedido vacio.",
      });
    }
    console.log(user.cart);
    // Crea un nuevo pedido en estado "sin confirmar"
    let totalPrice = 0;
    let quantity = 0;
    user.cart.forEach((product) => {
      console.log(product);
      totalPrice += product.productId.price * product.quantity;
      quantity += product.quantity;
    });
    const newOrder = {
      user: userId,
      /* status: "sin confirmar", */
      products: user.cart.map((cartItem) => {
        return {
          productId: cartItem.productId._id,
          quantity: cartItem.quantity,
          unitPrice: cartItem.productId.price,
        };
      }),
      totalPrice: totalPrice,
      quantity: quantity,
    };

    // Guarda el nuevo pedido en la base de datos
    const createdOrder = await Order.create(newOrder);
    console.log(createdOrder);

    //! VOLVER A ACTIVAR ESTO AL FINAL
    /*     // Limpia el carrito del usuario
    await User.findByIdAndUpdate(userId, { cart: [] }); */

    res.json({ message: "Pedido creado con éxito", order: createdOrder });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/* const transporter = nodemailer.createTransport({
  service: "Gmail", // Puedes cambiarlo según tu proveedor de correo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
}); */

/* router.get("/sendEmail", (req, res, next) => {
  const adminEmail = "pablocomemocosgordo@gmail.com"; // Correo al que se enviará el mensaje

  const mailOptions = {
    from: "tuCorreo@gmail.com", // Tu dirección de correo electrónico
    to: adminEmail,
    subject: "Correo de prueba",
    text: "Este es un correo de prueba enviado desde la aplicación.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo: " + error);
      res.status(500).json({ error: "No se pudo enviar el correo" });
    } else {
      console.log("Correo electrónico enviado: " + info.response);
      res.json({ message: "Correo enviado con éxito" });
    }
  });
}); */

module.exports = router;
