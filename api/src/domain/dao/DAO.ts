export default interface DAO<T> {
  create(data: T): Promise<T>;
} 