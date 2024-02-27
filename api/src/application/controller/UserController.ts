export default interface UserController {
  create: (request: any, response: any) => Promise<void>;
}