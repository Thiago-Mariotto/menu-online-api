<p align="center"> Documentação dos endpoints de Usuários (Users)
    <br> 
</p>

## 📝 Sumário

- [POST `/api/users/login`](#post-apiuserslogin) Faz login do usuário
- [POST `/api/users`](#post-apiusers) Cria um novo usuário
- [GET `/api/users`](#get-apiusers) Lista todos os usuários
- [GET `/api/users/:userId`](#get-apiusersid) Lista um usuário específico
- [PUT `/api/users/:userId`](#put-apiusersid) Atualiza um usuário específico
- [DELETE `/api/users/:userId`](#delete-apiusersid) Desativa/Ativa um usuário específico

### Legenda

- 🚫 não implementado
- ✅ implementado

---

### Login do usuário - POST `/api/users/login` <a name = "post-apiuserslogin"></a>

Realiza o login do usuário, retornando um token de acesso.

<details>
<summary>Detalhes</summary>

Restricões:

- 🚫 O campo email não pode ser nulo e é obrigatório.
- 🚫 O campo password não pode ser nulo e é obrigatório.

```json
{
  "email": "string", 🚫
  "password": "string" 🚫
}
```

#### Realizando uma requisição

```json
{
  "email": "john@doe.com",
  "password": "123Abc##"
}
```

#### Resposta do servidor

✅ Em caso de sucesso, login e senhas corretos, o servidor retornará status 200 e o token de acesso no corpo da resposta.

```json
{
  "token": "string"
}
```

❌ Em caso de erro do cliente, o servidor retornará um status da familia 4XX e um erro com a mensagem correspondente.

```json
{
  "name": "string",
  "message": "string"
}
```

👀 Exemplo, email ou senha incorreto: Status 401

```json
{
  "name": "Unauthorized",
  "message": "Email ou senha incorretos"
}
```

#### Exemplo de uso

```bash
curl --location --request POST 'http://localhost:3001/api/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@mail.com",
    "password": "123456"
}'
```

</details>

---

### Cadastro de usuários - POST `/api/users` <a name = "post-apiusers"></a>

Realiza o cadastro de um novo usuário.

<details>
<summary>Detalhes</summary>

#### Realizando uma requisição

Restrições:

- ✅ O nome deve ter no mínimo 3 caracteres e no máximo 100. Não pode conter números ou caracteres especiais.
- ✅ O email deve ser válido, único e seguir o formato `mail@mail.com`.
- ✅ A senha deve ter no mínimo 8 caracteres, conter letras maiúsculas, minúsculas, números e caracteres especiais.
- ✅ O CPF deve ser válido e único.
- 🚫 O telefone deve ser válido e único.

```json
{
  "name": "string", 🚫
  "email": "string", 🚫
  "password": "string", 🚫
  "cpf": "string", 🚫
  "phone": "string" 🚫
}
```

#### Realizando uma requisição

```json
{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "1234Abc##",
  "cpf": "311.702.130-22",
  "phone": "1298721723"
}
```

#### Respostas do servidor

✅ Em caso de sucesso, o servidor retornará status 201 e o id do novo usuário e uma mensagem de sucesso.

```json
{
  "userId": "063f3714-6955-40c1-a47c-3380df6523cf",
  "message": "User created successfully"
}
```

❌ Em caso de erro do cliente, o servidor retornará um status da familia 4XX e um erro com a mensagem correspondente.

Exemplo, CPF inválido:

```json
{
  "name": "BadRequest",
  "message": "CPF inválido"
}
```

#### Exemplo de uso

```bash
curl --location --request POST 'http://localhost:3001/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "email": "john@doe.com",
    "password": "1234Abc##",
    "cpf": "311.702.130-22",
    "phone": "1298721723"
}'
```

---

### GET `/api/users` <a name = "get-apiusers"></a>

### GET `/api/users/:userId` <a name = "get-apiusersid"></a>

### PUT `/api/users/:userId` <a name = "put-apiusersid"></a>

### DELETE `/api/users/:userId` <a name = "delete-apiusersid"></a>
