import React, { useState} from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { Posts } from '../models/PostModel';


interface myProps {
    createPost: (newPost: Posts) => void;
}

const PostForm = ({createPost}: myProps) => {
    const [post, setPost] = useState<Posts>({ id: 0, title: '', body: ''});

    const addNewPost = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newPost = {
            ...post, id: Date.now()
        };

    
        createPost(newPost);
        setPost({ id: 0, title: '', body: ''});
        
    }


    return (
        <form>
            <MyInput 
            value={post.title} 
            onChange={e => setPost({...post, title: e.target.value})} 
            type="text" 
            placeholder="Post title"
            />

            <MyInput 
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            type="text" 
            placeholder="Post Description"
            />

            <MyButton onClick={addNewPost}>Create post</MyButton>
      </form>
    )
}


export default PostForm;