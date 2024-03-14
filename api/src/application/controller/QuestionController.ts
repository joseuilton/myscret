export default interface QuestionController {
  create: (request: any, response: any) => Promise<void>;
  get: (request: any, response: any) => Promise<void>;
  listByUser: (request: any, response: any) => Promise<void>;
  delete: (request: any, response: any) => Promise<void>;
}