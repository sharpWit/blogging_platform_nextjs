export interface PostResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}
