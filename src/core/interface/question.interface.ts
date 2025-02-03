import { PaginationInerface } from "./general.interface";

export interface Problem {
  acRate: number;
  content: string;
  difficulty: string;
  title: string;
  topicTags: TopicTag[];
  categoryTitle: string;
  examples?: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints?: string[];
}

export interface TopicTag {
  _id: string;
  name: string;
}

export interface QuestionResponseInterface {
  status: string;
  statusCode: number;
  message: string;
  data: Problem[];
}

export type Language = 'javascript' | 'python' | 'java';

export interface Message {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  userId: string;
  userName: string;
  body: string;
  isSystem?: boolean;
  roomId: string;
}

export interface UserData {
  userId: string;
  userName: string;
  roomId: string;
}
export interface CodeSubmission {
  code: string;
  language: string;
  questionId: string;
  roomId: string;
  userId: string;
}
export interface CodeTemplate {
  [key: string]: string;
}
export interface QuestionParamInterface extends PaginationInerface {
  title?: string;
  tags?: string;
  difficulty?: string;
}