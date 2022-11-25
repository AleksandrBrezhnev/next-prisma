import { FC } from "react";

import Link from "next/link";
import Image from "next/image";

import { PostsProps, PostObject } from "../types/Post";
const PostList = ({ posts }: PostsProps) => {
    return (
      <div>
        {Array.isArray(posts)? posts.map((post: PostObject) => {
          const { id, title, createdAt: rawCreatedAt, imageURL } = post;
          const createdAt = new Date(rawCreatedAt);
          return (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <h1>{title}</h1>
              </Link>
              {imageURL?
               <Image
                className=""
                src={imageURL}
                alt={title}
                layout="fixed"
                width={600}
                height={400}
              /> : null}
              <h3>{`${createdAt.getDate()}-${createdAt.getMonth()}-${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`}</h3>
            </article>
          );
        }): null}
      </div>
    );
  }
export default PostList
