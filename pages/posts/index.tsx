import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

import Link from "next/link";
import Image from "next/image";

import axiosInstance from "../api/axios";

import { PostObject } from "../../types/Post";

import PostList from "../../components/PostList";
import { useRouter } from "next/router";
import { useEffect } from "react";
interface PostsProps {
  posts: [PostObject];
}
export async function getServerSideProps() {

  try {
    const { data } = await axiosInstance.get("api/posts");

    if (!data) {
      return {
        // notFound: true,
        props: { posts: [] },
      };
    }
    return {
      props: { posts: data },
    };
  } catch (err) {
    console.log("Error");
  }
}

export default function Posts({ posts }: PostsProps) {
  console.log('psu')
  const router = useRouter();
  useEffect(() => {
    async () => {
      console.log('scen 00')

      if (!router.query.perPage && !router.query.page) {
        console.log('scen 11')
        const url = `${router.pathname}&perPage=${4}`
        router.push(url, url, {shallow: true} );

      }
      if (!router.query.page) {
        console.log('scen 22')

        const url = `${router.pathname}&page=${1}`
        router.push(url, url, {shallow: true} );

      }
      if (!router.query.perPage) {
        console.log('scen 33')

        const url = `${router.pathname}&perPage=${4}`

        router.push(url, url, {shallow: true} );
      }
    };
  },[router]);
  return <PostList posts={posts} />;
}
