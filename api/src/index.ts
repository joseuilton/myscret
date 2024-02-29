import UUIDGenerator from "@domain/entities/UUIDGenerator";
import KnexAdapter from "@infra/database/KnexAdapter";
import AnswerDAO from "@infra/database/dao/AnswerDAO";
import QuestionDAO from "@infra/database/dao/QuestionDAO";
import UserDAO from "@infra/database/dao/UserDAO";
import AnswerRepositoryImpl from "@infra/database/repository/AnswerRepositoryImpl";
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
const answerDAO = new AnswerDAO(knexAdapter.instance);
const answerRepository = new AnswerRepositoryImpl(answerDAO);

const registry = Registry.getInstance();
registry.register("UserRepository", userRepository);
registry.register("QuestionRepository", questionRepository);
registry.register("AnswerRepository", answerRepository);

const expressAdapter = new ExpressAdapter();
expressAdapter.listen(3000);
