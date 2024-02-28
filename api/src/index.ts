import UUIDGenerator from "@domain/entities/UUIDGenerator";
import KnexAdapter from "@infra/database/KnexAdapter";
import QuestionDAO from "@infra/database/dao/QuestionDAO";
import UserDAO from "@infra/database/dao/UserDAO";
import QuestionRepositoryImpl from "@infra/database/repository/QuestionRepositoryImpl";
import UserRepositoryImpl from "@infra/database/repository/UserRepositoryImpl";
import Registry from "@infra/di/Registry";
import LoadEnv from "@infra/helpers/LoadEnv";
import ExpressAdapter from "@infra/http/ExpressAdapter";

LoadEnv.load();

const knexAdapter = new KnexAdapter();
knexAdapter.connect();

const userDAO = new UserDAO(knexAdapter.instance);
const userRepository = new UserRepositoryImpl(userDAO);
const questionDAO = new QuestionDAO(knexAdapter.instance);
const questionRepository = new QuestionRepositoryImpl(questionDAO);

const registry = Registry.getInstance();
registry.register("UserRepository", userRepository);
registry.register("QuestionRepository", questionRepository);

const expressAdapter = new ExpressAdapter();
expressAdapter.listen(3000);

// const knexAdapter = new KnexAdapter();
// knexAdapter.connect();

// const userDAO = new UserDAO(knexAdapter.instance);
// userDAO.create({
//   userId: UUIDGenerator.generate(),
//   name: null,
//   pictureUrl: null,
//   email: "teste@teste.com",
//   password: "1234",
//   createdAt: new Date(),
//   updatedAt: null
// });