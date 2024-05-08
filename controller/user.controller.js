
const users = [];

// função 'checkUser' retorna 'true' ou 'false' se o conteúdo de 'body' estiver correto
// caso não esteja correto já envia uma mensagem de erro
const checkUser = (req, res) => {
  const user = req.body;
  const requiredFields = ['id', 'name', 'birthDay', 'email', 'password'];

  if (!user || Object.keys(user).length === 0) {
    res.status(400).send({ message: "corpo da mensagem está vazio" });
    return false;
  }

  const missingFields = requiredFields.filter((field) =>!user[field]);

  if (missingFields.length > 0) {
    res.status(400).send({ message: `os campos '${missingFields.join("', '")}' não foram encontrados` });
    return false;
  }

  return true;
}

// consulta usuário por 'id'
const findUser = (req, res) => {
  const userId = req.params.id;
  const user = users.find(valor => valor.id == userId);

  if (user) {
    return res.send(user);
  }
  
  res.status(404).send({ message: "usuário não foi encontrado" });
}

// consulta todos os usuários
const findAllUsers = (req, res) => {
  res.send(users);
}

// cria um usuário novo (se o campo 'id' não existir)
const createUser = (req, res) => {
  const user = req.body;
  const userId = user.id;

  const found = users.some(valor => valor.id == userId);
  if (found) {
    return res.status(403).send({ message: "'id' de usuário já existente" });
  }

  if (!checkUser(req, res)) {
    return;
  }

  users.push(user);
  res.status(201).send(user);
}

// atualiza um usuário existente
const updateUser = (req, res) => {
  if (!checkUser(req, res))
    return;

  const user = req.body;
  const userId = req.params.id;

  if (user.id != userId)
    return res.status(400).send({ message: "Campo 'id' do usuário não é igual ao do parâmetro" });

  const index = users.findIndex(valor => valor.id == userId);

  if (index !== -1) {
    users[index] = user;
    return res.send(user);
  }
  
  res.status(404).send({ message: "usuário não foi encontrado" });
}

// deleta um usuário existente
const deleteUser = (req, res) => {
  const userId = req.params.id;
  const index = users.findIndex(valor => valor.id == userId);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    return res.send(deletedUser[0]);
  }
  
  res.status(404).send({ message: "Não foi encontrado" });
}

module.exports = { findUser, findAllUsers, createUser, updateUser, deleteUser };
