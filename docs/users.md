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

</details>

---

### Listando todos usuários - GET `/api/users` <a name = "get-apiusers"></a>

Realiza a listagem de todos os usuários.

<details>
<summary>Detalhes</summary>

#### Realizando uma requisição

Restrições:

- 🚫 O usuário deve estar logado.
- 🚫 O usuário deve ser um administrador.
- 🚫 A resposta deve ser páginada com no máximo 20 usuários por página.

```json
{}
```

#### Respostas do servidor

✅ Em caso de sucesso, o servidor retornará status 200 e uma lista com todos os usuários.

```json
[
  {
    "userId": "2a616ed2-9ca9-4e48-b344-0cef86ede2ed",
    "cpf": "977.146.150-87",
    "name": "John Doe",
    "email": "john@doe.com",
    "role": "user",
    "phone": "12999887766",
    "active": true,
    "lastLogin": "2023-10-18T17:06:32.164Z",
    "createdAt": "2023-10-18T17:06:32.164Z"
  }
]
```

</details>

---

### Listando um usuário por ID - GET `/api/users/:userId` <a name = "get-apiusersid"></a>

Realiza a listagem de um usuário específico.

<details>
<summary>Detalhes</summary>

#### Realizando uma requisição

Restrições:

- 🚫 O usuário deve estar logado.
- 🚫 O usuário deve ser um administrador ou o próprio usuário.

```json
{}
```

#### Respostas do servidor

✅ Em caso de sucesso, o servidor retornará status 200 e o usuário.

```json
{
  "userId": "2a616ed2-9ca9-4e48-b344-0cef86ede2ed",
  "cpf": "977.146.150-87",
  "name": "John Doe",
  "email": "john@doe.com",
  "role": "user",
  "phone": "12999887766",
  "active": true,
  "lastLogin": "2023-10-18T17:06:32.164Z",
  "createdAt": "2023-10-18T17:06:32.164Z"
}
```

Em caso de erro do cliente, o servidor retornará um status da familia 4XX e um erro com a mensagem correspondente.

Exemplo, usuário não encontrado:

```json
{
  "name": "NotFound",
  "message": "Usuário não encontrado"
}
```

Exemplo, usuário não autorizado:

```json
{
  "name": "Unauthorized",
  "message": "Você não tem permissão para acessar este recurso"
}
```

</details>

---

### Atualizando um usuário - PUT `/api/users/:userId` <a name = "put-apiusersid"></a>

Realiza a atualização de um usuário específico.

<details>
<summary>Detalhes</summary>

#### Realizando uma requisição

Restrições:

- 🚫 O usuário deve estar logado.
- 🚫 O usuário deve ser um administrador ou o próprio usuário.
- 🚫 Não deve ser possível alterar o CPF.
- 🚫 Não deve ser possível alterar o email.
- 🚫 Não deve ser possível alterar a senha nesse endpoint.

```json
{
  "name": "string", 🚫
  "email": "string", 🚫
  "phone": "string", 🚫
}
```

#### Realizando uma requisição

```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "phone": "1298721723"
}
```

#### Respostas do servidor

✅ Em caso de sucesso, o servidor retornará status 204 sem conteúdo.

❌ Em caso de erro do cliente, o servidor retornará um status da familia 4XX e um erro com a mensagem correspondente.

Exemplo, usuário não encontrado:

```json
{
  "name": "NotFound",
  "message": "Usuário não encontrado"
}
```

Exemplo, usuário não autorizado:

```json
{
  "name": "Unauthorized",
  "message": "Você não tem permissão para acessar este recurso"
}
```

---

### Desativando um usuário - DELETE `/api/users/:userId` <a name = "delete-apiusersid"></a>

Realiza a desativação de um usuário específico.

<details>
<summary>Detalhes</summary>

#### Realizando uma requisição

Restrições:

- 🚫 O usuário deve estar logado.
- 🚫 O usuário deve ser um administrador ou o próprio usuário.

```json
{}
```

#### Respostas do servidor

✅ Em caso de sucesso, o servidor retornará status 204 sem conteúdo.

❌ Em caso de erro do cliente, o servidor retornará um status da familia 4XX e um erro com a mensagem correspondente.

Exemplo, usuário não encontrado:

```json
{
  "name": "NotFound",
  "message": "Usuário não encontrado"
}
```

Exemplo, usuário não autorizado:

```json
{
  "name": "Unauthorized",
  "message": "Você não tem permissão para acessar este recurso"
}
```

</details>

---
