import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import { ParsedUrlQuery } from 'querystring';
import { Suspense } from 'react'

import Image from "next/image";
import { useRouter } from 'next/router'
import useSwr from 'swr'


import axiosInstance from "../api/axios";

import { PostObject } from "../../types/Post";
import CommentsList from "../../components/CommentsList";
interface PostProps {
  data: PostObject;
}

const fetcher = async (url: string) => {
  const res = await axiosInstance.get(url);

  const {data} = res;
  return data;
};
export default function Post() {
  const router = useRouter()

  const { data, error} = useSwr(router.query.id ? `/api/posts/${router.query.id}`: null, fetcher)
if(!data) return <h1>Failed to load data</h1>
if(error) return <h1>Something gone wrong, error accured</h1>

    const {id, title, content, imageURL} = data;
  return ( <div key={title}>

             <h1>{title}</h1>

            <Image
             className=""
             src={imageURL}
             alt={title}
             layout="fixed"
             width={900}
             height={600}

           />
          <p>{content}</p> 
          <CommentsList />
         </div>
         
         )
}
