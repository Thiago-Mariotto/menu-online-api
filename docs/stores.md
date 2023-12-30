<p align="center"> Documentação dos endpoints de Lojas (stores)
    <br> 
</p>

## 📝 Sumário

- [POST `/api/stores`](#post-apistores) Cria uma nova loja
- [GET `/api/stores/:storeId`](#get-apistoresid) Lista uma loja específica
- [GET `/api/stores/user/:storeId`](#get-apiuserstoreid) Lista uma loja específica por ID do usuário
- [PUT `/api/stores/:storeId`](#put-apistoresid) Atualiza uma loja específica
- [DELETE `/api/stores/:storeId`](#delete-apistoresid) Desativa/Ativa uma loja específica

### Legenda

- 🚫 não implementado
- ✅ implementado

---

### Criando uma loja - POST `/api/stores` <a name = "post-apistores"></a>

Cria uma nova loja.

<details>
<summary>Detalhes</summary>

Restricões:

- ✅ O campo cnpj deve ser único.
- ✅ O usuário deve estar autenticado.
- 🚫 O nome deve ser único.
- 🚫 O campo name não pode ser nulo e é obrigatório.
- 🚫 O campo cnpj não pode ser nulo e é obrigatório.
- 🚫 O campo phone não pode ser nulo e é obrigatório.
- 🚫 O campo cep não pode ser nulo e é obrigatório.
- 🚫 O campo number não pode ser nulo e é obrigatório.
- 🚫 O campo complement pode ser nulo.
- 🚫 O campo phone deve ser único.
- ? Cada loja deveria ter um email?

```json
{
  "name": "string", 🚫
  "cnpj": "string", 🚫
  "phone": "string", 🚫
  "cep": "string", 🚫
  "number": "string", 🚫
  "complement": "string" 🚫 // opcional
}
```

#### Realizando uma requisição

```json
{
  "name": "Bar do John",
  "cnpj": "67.907.529/0001-64",
  "phone": "12345678901",
  "cep": "12345678",
  "number": "123",
  "complement": "Loja 5"
}
```

#### Resposta

```json
{
  "id": "e12b374a-9e9a-4b11-ba69-2fd795a21831",
  "message": "Loja criada com sucesso!"
}
```

✅ Em caso de sucesso a resposta terá o status 201 e um objeto com o ID da loja criada.

❌ Em casa do erro a resposta será um objeto com a mensagem de erro.

Exemplo: CNPJ já cadastrado.

```json
{
  "name": "BadRequest",
  "message": "CNPJ já cadastrado!"
}
```

</details>

---

### Listando uma loja por ID - GET `/api/stores/:storeId` <a name = "#get-apistoresid"></a>

Lista uma loja específica.

<details>
<summary>Detalhes</summary>

Restricões:

- ✅ O usuário deve estar autenticado.
- ✅ O usuário deve ser o dono da loja ou administrador.

#### Realizando uma requisição

```json
"params": {
  "storeId": "e12b374a-9e9a-4b11-ba69-2fd795a21831"
}
```

#### Resposta

```json
{
  "storeId": "db8f7ce5-d17d-4dea-977c-5dce67e78875",
  "name": "Loja do John",
  "userId": "063f3714-6955-40c1-a47c-3380df6523cf",
  "cnpj": "67.907.529/0001-64",
  "phone": "12992187210",
  "active": true,
  "storeAddressId": "d507de0b-f6a0-47dd-a457-08b19506810e"
}
```

✅ Em caso de sucesso a resposta terá o status 200 e um objeto com os dados da loja.

❌ Em casa do erro a resposta será um objeto com a mensagem de erro.

Exemplo: Loja não encontrada.

```json
{
  "NotFound"
  "message": "Loja não encontrada!"
}
```

Sem permissão para acessar a loja.

```json
{
  "name": "Forbidden",
  "message": "Você não tem permissão para acessar essas lojas"
}
```

</details>

---

### Listando uma loja por ID do usuário - GET `/api/stores/user/:storeId` <a name = "#get-apiuserstoreid"></a>

Lista uma loja específica por ID do usuário.

<details>
<summary>Detalhes</summary>

Restricões:

- ✅ O usuário deve estar autenticado.
- ✅ O usuário deve ser o dono da loja.
- ✅ A loja deve estar ativa.

#### Realizando uma requisição

```json
"params": {
  "storeId": "e12b374a-9e9a-4b11-ba69-2fd795a21831"
}
```

#### Resposta

```json
{
  "storeId": "db8f7ce5-d17d-4dea-977c-5dce67e78875",
  "name": "Loja do John",
  "userId": "063f3714-6955-40c1-a47c-3380df6523cf",
  "cnpj": "67.907.529/0001-64",
  "phone": "12992187210",
  "active": true,
  "storeAddressId": "d507de0b-f6a0-47dd-a457-08b19506810e"
}
```

✅ Em caso de sucesso a resposta será um objeto com os dados da loja.

❌ Em casa do erro a resposta será um objeto com a mensagem de erro.

Exemplo: Loja não encontrada.

```json
{
  "NotFound"
  "message": "Loja não encontrada!"
}
```

Sem permissão para acessar a loja.

```json
{
  "name": "Forbidden",
  "message": "Você não tem permissão para acessar essas lojas"
}
```

</details>

---

### Atualizando uma loja - PUT `/api/stores/:storeId` <a name = "#put-apistoresid"></a>

Realiza a atualização de uma loja específica.

<details>
<summary>Detalhes</summary>

Restricões:

- 🚫 O usuário deve estar autenticado.
- 🚫 O usuário deve ser o dono da loja ou administrador.
- 🚫 Deve validar se a loja existe.
- 🚫 Não deve ser possível alterar o CNPJ.

```json
{
  "name": "string", 🚫
  "phone": "string", 🚫
  "cep": "string", 🚫
  "number": "string", 🚫
  "complement": "string" 🚫 // opcional
}
```

#### Realizando uma requisição

```json
{
  "params": {
    "storeId": "e12b374a-9e9a-4b11-ba69-2fd795a21831"
  },
  "body": {
    "name": "Bar do John",
    "phone": "12345678901",
    "cep": "12345678",
    "number": "123",
    "complement": "Loja 5"
  }
}
```

#### Resposta

```json
{
  "id": "e12b374a-9e9a-4b11-ba69-2fd795a21831",
  "message": "Loja atualizada com sucesso!"
}
```

✅ Em caso de sucesso a resposta terá o status 204.

❌ Em casa do erro a resposta será um objeto com a mensagem de erro.

Exemplo: Loja não encontrada.

```json
{
  "name": "NotFound",
  "message": "Loja não encontrada!"
}
```

Sem permissão para acessar a loja.

```json
{
  "name": "Forbidden",
  "message": "Você não tem permissão para acessar essas lojas"
}
```

</details>

---

### Desativando/Ativando uma loja - PATCH `/api/stores/:storeId` <a name = "#patch-apistoresid"></a>

Realiza a desativação/ativação de uma loja específica.

<details>
<summary>Detalhes</summary>

Restricões:

- 🚫 O usuário deve estar autenticado.
- 🚫 O usuário deve ser o dono da loja ou administrador.
- 🚫 Deve validar se a loja existe

#### Realizando uma requisição

```json
{
  "params": {
    "storeId": "e12b374a-9e9a-4b11-ba69-2fd795a21831"
  }
}
```

#### Resposta

```json
{}
```

✅ Em caso de sucesso a resposta terá o status 204.

❌ Em casa do erro a resposta será um objeto com a mensagem de erro.

Exemplo: Loja não encontrada.

```json
{
  "name": "NotFound",
  "message": "Loja não encontrada!"
}
```

Sem permissão para acessar a loja.

```json
{
  "name": "Forbidden",
  "message": "Você não tem permissão para acessar essas lojas"
}
```

</details>

---
