import { PaginationInerface } from "./general.interface";

export interface QuestionResponseInterface {
  status: string;
  statusCode: number;
  message: string;
  data: Problem[];
}

interface Problem {
  acRate: number;
  content: string;
  difficulty: string;
  title: string;
  topicTags: TopicTag[];
  categoryTitle: string;
}

interface TopicTag {
  _id: string;
  name: string;
}

export interface QuestionParamInterface extends PaginationInerface {
  title?: string;
}
