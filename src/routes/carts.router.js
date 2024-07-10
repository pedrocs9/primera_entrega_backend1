const express = require("express")
const router = express.Router()

const carts = []

// get
// Ruta para listar los productos de un carrito por su ID (cid)
router.get("/carts/:idCarts", (req, res) => {
    const cartId = req.params.cid;
    const cart = carts.find(c => c.id === cartId);
  
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: `Carrito con ID ${cartId} no encontrado` });
    }
  });

// post
router.post("/carts", (req, res) => {
    const newCart = {
      id: carts.length() + 1, // Función para generar un ID único
      products: [] // Array vacío de productos al inicio
    };
  
    carts.push(newCart);
    res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
  });

  //post
  // Ruta para agregar un producto al carrito por su ID (cid)
router.post("/:cid/product/:pid", (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
  
    // Verificar si el carrito existe
    const cartIndex = carts.findIndex(c => c.id === cartId);
    if (cartIndex === -1) {
      return res.status(404).json({ error: `Carrito con ID ${cartId} no encontrado` });
    }
  
    // Verificar si el producto ya está en el carrito
    const productIndex = carts[cartIndex].products.findIndex(p => p.product === productId);
  
    if (productIndex !== -1) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      carts[cartIndex].products[productIndex].quantity += quantity || 1;
    } else {
      // Si el producto no está en el carrito, agregarlo
      carts[cartIndex].products.push({ product: productId, quantity: quantity || 1 });
    }
  
    res.json({ message: `Producto con ID ${productId} agregado al carrito con ID ${cartId} correctamente` });
  });

module.exports = router