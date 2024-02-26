export interface AnswerModel {
  answerId: string;
  userId: string | null;
  questionId: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date | null;
}