const express = require("express")
const router = express.Router()

const products = [{id: 1,
                title: "PC Gamer",
                description: "Test",
                code: "Test",
                price: "Test",
                status: true,
                stock: "Test",
                category: "Test",
                thumbnails: []
                }]

//get
router.get("/products", (req, res) => {
    let limit = parseInt(req.query.limit)

    let limitedProducts = [...products]

    if (!isNaN(limit) && limit > 0) {
        limitedProducts = limitedProducts.slice(0, limit) // Limitar la cantidad de alumnos del parametro LIMIT
    }

    res.json(limitedProducts)
})

// get
router.get("/products/:idProduct", (req, res) => {
    let idProduct = req.params.idProduct

    let producto = products.find(a => a.id === idProduct)

    if (!producto) return res.send({ error: "No se encuentra el producto solicitado" })
        res.send({ producto })
})


// post

router.post("/products", (req, res) => {
  const { product } = req.body

  // Verificar si todos los campos obligatorios están presentes
  if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const newProduct = {
    id: products.length + 1,
    title: product.title,
    description: product.description,
    code: product.code,
    price: product.price,
    status: true,
    stock: product.stock,
    category: product.category,
    thumbnails: [],
  };
  products.push(newProduct);
  res.status(201).json({ message: `Producto agregado correctamente`, product: newProduct });});

  //put
  router.put("/products/:idProduct", (req, res) => {
    const pid = parseInt(req.params.pid); // Obtener el ID del producto a actualizar
  const updatedProduct = req.body; // Obtener los datos actualizados del producto desde el cuerpo de la solicitud

  // Encontrar el índice del producto en el array
  const productIndex = products.findIndex(p => p.id === pid);

  if (productIndex !== -1) {
    // Actualizar el producto sin modificar el ID
    products[productIndex] = {
      id: products[productIndex].id,
      title: updatedProduct.title,
      description: updatedProduct.description || "",
      code: updatedProduct.code || "",
      price: updatedProduct.price || 0,
      status: updatedProduct.status !== undefined ? updatedProduct.status : true,
      stock: updatedProduct.stock || 0,
      category: updatedProduct.category || "",
      thumbnails: products[productIndex].thumbnails // Mantener las imágenes existentes
    };

    res.json({ message: `Producto con ID ${pid} actualizado correctamente`, updatedProduct: products[productIndex] });
  } else {
    res.status(404).json({ error: `Producto con ID ${pid} no encontrado` });
  }
});

//delete 
router.delete('/products/:idProduct', (req, res) => {
    const productID = parseInt(req.params.id)
    products = products.filter((product) => product.id !== productID)
    res.json({ message: `Producto con id ${productID} eliminado correctamente` })
})

module.exports = router