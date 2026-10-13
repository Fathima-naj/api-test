# Product API

An Express REST API for creating, reading, updating, and deleting products.

## Run

```bash
npm install
npm start
```

The server listens on port `3000` by default. Set the `PORT` environment variable to change it.

## Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/products` | List all products |
| `GET` | `/products/:id` | Get a product by ID |
| `POST` | `/products` | Add a product |
| `PUT` | `/products/:id` | Replace a product |
| `DELETE` | `/products/:id` | Delete a product |

Create and update requests accept a JSON body with `name`, `category`, `price`, and `stock`. These fields are not validated.

Products are stored in memory, so they reset when the server restarts.
