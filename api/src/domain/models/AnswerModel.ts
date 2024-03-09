export interface AnswerModel {
  answerId: string;
  userId: string | null;
  pictureUrl?: string | null;
  questionId: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date | null;
}