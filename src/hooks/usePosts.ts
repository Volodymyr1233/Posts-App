import { useMemo } from "react";
import { Posts } from "../models/PostModel";


export const useSortedPosts = (posts: Posts[], sort: string) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => String(a[sort]).localeCompare(String(b[sort])));
        }
        return posts;
    }, [posts, sort]);

    return sortedPosts;
}

export const usePosts = (posts: Posts[], sort: string, query: string) => {
    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(post => String(post.title).toLowerCase().includes(query));
    }, [query, sortedPosts]);

    return sortedAndSearchPosts;
}