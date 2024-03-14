export default interface UserController {
  create: (request: any, response: any) => Promise<void>;
  get: (request: any, response: any) => Promise<void>;
  authenticate: (request: any, response: any) => Promise<void>;
}