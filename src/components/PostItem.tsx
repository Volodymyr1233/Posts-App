import React from 'react';
import MyButton from './UI/button/MyButton';
import { Posts } from '../models/PostModel';
import {useNavigate} from 'react-router-dom';

interface Props {
    post: any,
    removePost: (post: Posts) => void
}

const PostItem = ({post, removePost}: Props) => {
    const router = useNavigate();
    
    return (
        <div className="post">
            <div className="post__content">
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => router(`/posts/${post.id}`)}>Open</MyButton>
                <MyButton onClick={() => removePost(post)}>Remove</MyButton>
            </div>
        </div>
    )
}

export default PostItem;