export interface IPosts {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  createAt: Date;
  views: number;
  author: IAuthor | null;
  tags: ITags | null;
  category: ICats | null;
}

export interface IAuthor {
  id: string;
  name: string;
}
export interface ICats {
  id: string;
  name: string;
}
export interface ITags {
  id: string;
  name: string;
}
