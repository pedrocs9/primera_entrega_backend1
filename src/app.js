const express = require("express")
const path = require("path")
const cartsRouter = require("./routes/carts.router.js") //Error por extension de archivo
const productRouter = require("./routes/products.router.js")

const app = express()
const PORT = 8080

app.use(express.json()) // Middleware body (cuando envio info desde una url)
app.use(express.urlencoded({ extended: true })) // Middleware para recibir parametros por url


app.use("/api", cartsRouter)
app.use("/api", productRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
