import { UserForReference } from "./User";

export interface CommentProps {

    id:number,
    createdAt: string,
    text: string,
    user: UserForReference
  }

