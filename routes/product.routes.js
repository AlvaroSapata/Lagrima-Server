const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model'); // Asegúrate de importar tu modelo de producto

//* GET /products/all - Ruta para obtener todos los productos
router.get('/all', async (req, res) => {
    try {
      const products = await Product.find();
      if (products.length === 0) {
        res.status(404).json({ message: 'No hay productos.' }); // Enviar un código de estado 404 para indicar que no se encontraron productos
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//* POST /products/add Ruta para registrar un nuevo producto
router.post('/add', async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json({ message: 'Producto registrado con éxito', product: savedProduct });
      console.log('Producto creado con éxito')
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el producto', error: error.message });
      console.log('Error al registrar el producto')
    }
  });

// Ruta para editar un producto existente por su ID
router.put('/edit/:productId', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
      );
      if (updatedProduct) {
        res.status(200).json({ message: 'Producto editado con éxito', product: updatedProduct });
        console.log('Producto editado con éxito')
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
        console.log('Producto no encontrado')
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al editar el producto', error: error.message });
      console.log('Error al editar el producto')
    }
  });
  
  // Ruta para borrar un producto por su ID
  router.delete('/delete/:productId', async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
      if (deletedProduct) {
        res.status(204).json({ message: 'Producto eliminado con éxito' });
        console.log('Producto eliminado con éxito')
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
        console.log('Producto no encontrado')
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
      console.log('Error al eliminar el producto')

    }
  });
  

module.exports = router;
