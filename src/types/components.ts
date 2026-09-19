import { ErrorType } from "./api";
import { Post } from "./post";

export interface ListComponentProps {
  data: Post[];
}

export interface ErrorModalProps {
  visible: boolean;
  type: ErrorType; // 'no-internet' | 'server-error' | null
  onButtonPress: () => void;
}

export interface SuccessModalProps {
  visible: boolean;
  message?: string;
  onButtonPress: () => void;
}

export interface PostCardProps {
  item: Post;
}
