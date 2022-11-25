export interface PostObject {

    id:number,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    content: string,
    published: boolean,
    authorId: number,
    imageURL: string,
  }


export interface PostsProps {
  posts: [PostObject];
}
