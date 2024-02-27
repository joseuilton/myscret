export default class Registry {
  private readonly dependencies: Map<RegistryKeys, any> = new Map();
  private static instance: Registry;

  register<T>(key: RegistryKeys, value: T): void {
    this.dependencies.set(key, value);
  }

  resolve<T>(key: RegistryKeys): T {
    if (!this.dependencies.has(key)) throw new Error(`Dependency ${key} not found.`);
    return this.dependencies.get(key);
  }

  static getInstance(): Registry {
    if (!Registry.instance) Registry.instance = new Registry();
    return Registry.instance;
  }
}

type RegistryKeys = "UserRepository" | "QuestionRepository" | "AnswerRepository";