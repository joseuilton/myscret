export default interface QuestionModel {
  questionId: string;
  userId: string;
  question: string;
  createdAt: Date;
  updatedAt: Date | null;
}