<p align="center">
  <a href="" rel="noopener">
  <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">menu-online-api</h3>

---

<p align="center"> Documentação da api
    <br> 
</p>

## 📝 Sumário

- [Sobre](#about)
- [Endpoints](#endpoints)

## 🧐 Sobre <a name = "about"></a>

Aqui você encontra toda a documentação referente a API, endpoints, validações, etc.

## Endpoints <a name = "endpoints"></a>

### 👤 Usuários

Todos os endpoints referentes a usuários, está listado a baixo, para mais detalhes, basta clicar no link do endpoint desejado.

- POST `/api/users/login` - Faz login do usuário [veja mais](./users.md#post-apiuserslogin)
- POST `/api/users` - Cria um novo usuário [veja mais](./users.md#post-apiusers)
- GET `/api/users` - Lista todos os usuários [veja mais](./users.md#get-apiusers)
- GET `/api/users/:userId` - Lista um usuário específico [veja mais](./users.md#get-apiusersid)
- PUT `/api/users/:userId` - Atualiza um usuário específico ❌
- DELETE `/api/users/:userId` - Desativa/Ativa um usuário específico ❌

---

### 🏪 Lojas

- POST `/api/stores` - Cria uma nova loja [veja mais](./stores.md#post-apistores)
- GET `/api/stores/user/:userId` - Lista todas as lojas de um usuário [veja mais](./stores.md#get-apistores)
- GET `/api/stores/:storeId` - Lista uma loja específica [veja mais](./stores.md#get-apistoresid)
- PUT `/api/stores/:storeId` - Atualiza uma loja específica ❌
- DELETE `/api/stores/:storeId` - Desativa/Ativa uma loja específica ❌

---

### 🧾 Categorias

- POST `/api/categories` - Cria uma nova categoria [veja mais](./categories.md#post-apicategories)
- GET `/api/categories` - Lista todas as categorias [veja mais](./categories.md#get-apicategories)
- GET `/api/categories/:categoryId` - Lista uma categoria específica [veja mais](./categories.md#get-apicategoriesid)
- PUT `/api/categories/:categoryId` - Atualiza uma categoria específica ❌
- DELETE `/api/categories/:categoryId` - Remove uma categoria específica ❌

---

### 🍔 Produtos

- POST `/api/products/store/:storeId` - Cria um novo produto de uma loja ❌
- GET `/api/products/store/:storeId` - Lista todos os produtos de uma loja ❌
- GET `/api/products/:productId/store/:storeId` - Lista um produto específico ❌
- PUT `/api/products/:productId/store/:storeId` - Atualiza um produto específico ❌
- DELETE `/api/products/:productId` - Remove um produto específico ❌

---

### 🛒 Pedidos

- POST `/api/orders/store/:storeId` - Cria um novo pedido ❌
- GET `/api/orders/store/:storeId` - Lista todos os pedidos de uma loja ❌
- GET `/api/orders/:orderId/store/:storeId` - Lista um pedido específico ❌
- PUT `/api/orders/:orderId/store/:storeId` - Atualiza um pedido específico ❌
- DELETE `/api/orders/:orderId` - Remove um pedido específico ❌

---

### 🏠 Endereços

- GET `/api/addresses/states` - Lista uma cidade específica ❌
- GET `/api/addresses/cities?state=stateName` - Lista todas as cidades de uma estado ❌
- GET `/api/addresses/districts?city=cityName` - Lista todos os bairros de uma cidade ❌

---

### 💰 Pagamentos

- POST `/api/payments/` - Lista todos as formas de pagamentos ❌
- GET `/api/payments/:paymentId` - Lista uma forma de pagamento específica ❌
