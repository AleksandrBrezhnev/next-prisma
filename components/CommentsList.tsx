import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import { ParsedUrlQuery } from "querystring";
import { Suspense, useState, useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import useSwr from "swr";

import axiosInstance from "../pages/api/axios";

import { PostObject } from "../types/Post";
import { CommentProps } from "../types/Comments";

const fetcher = async (url: string) => {
  const res = await axiosInstance.get(url);
 
  const { data } = res;
  return data;
};
export default function CommentsList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const { data, error } = useSwr(
    router.query.id
      ? `/api/comments/${router.query.id}?page=${page}&&perPage=${3}`
      : null,
    fetcher
  );
  if (!data) return <h1>Failed to load data</h1>;
  if (error) return <h1>Something gone wrong, error accured</h1>;
  const { comments } = data;
  return (
    <div>
      {comments.map((item: CommentProps) => {
        const { id, createdAt, text, user:{name} } = item;
        return (
          <div key={id}>
            <p>{name} says:</p>
            <p>{text}</p>
            <p>{createdAt}</p>
          </div>
        );
      })}
      <button onClick={()=>setPage(page-1)}>Prev Page</button>
      <button onClick={()=>setPage(page+1)}>Next Page</button>

    </div>
  );
}
