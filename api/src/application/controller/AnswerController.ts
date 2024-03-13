export default interface AnswerController {
  create: (request: any, response: any) => Promise<void>;
  getAnswer: (request: any, response: any) => Promise<void>;
  listByUserQuestions: (request: any, response: any) => Promise<void>;
  listByUser: (request: any, response: any) => Promise<void>;
}