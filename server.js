const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
let products = [];
let nextId = 1;

app.use(express.json());

function validateProduct(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Request body must be a JSON object.";
  }

  if (typeof body.name !== "string" || body.name.trim() === "") {
    return "Product name is required.";
  }

  if (typeof body.price !== "number" || !Number.isFinite(body.price) || body.price < 0) {
    return "Product price must be a non-negative number.";
  }

  return null;
}

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  return res.json(product);
});

app.post("/products", (req, res) => {
  const validationError = validateProduct(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const product = {
    id: nextId++,
    name: req.body.name.trim(),
    price: req.body.price,
    ...(typeof req.body.description === "string"
      ? { description: req.body.description }
      : {}),
  };

  products.push(product);
  return res.status(201).json(product);
});

app.put("/products/:id", (req, res) => {
  const validationError = validateProduct(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const index = products.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Product not found." });
  }

  const product = {
    id: products[index].id,
    name: req.body.name.trim(),
    price: req.body.price,
    ...(typeof req.body.description === "string"
      ? { description: req.body.description }
      : {}),
  };

  products[index] = product;
  return res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Product not found." });
  }

  products.splice(index, 1);
  return res.status(204).end();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Product API listening on port ${port}`);
  });
}

module.exports = app;
