import React from 'react';
import { Posts } from '../models/PostModel';
import PostItem from './PostItem';
import {TransitionGroup, CSSTransition} from "react-transition-group";

interface Props {
    posts: Posts[],
    title: string,
    removePost: (post: Posts) => void
}

const PostList = ({posts, title, removePost}: Props) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>Posts are not found</h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post) => (
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem removePost={removePost} post={post}/>
                    </CSSTransition>
                    
                ))}
            </TransitionGroup>
            
        </div>
    )
}

export default PostList;