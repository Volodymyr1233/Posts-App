import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {Posts} from "../models/PostModel";
import Loader from "../components/UI/loader/Loader";
import {Comment} from "../models/Comment";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState<Posts>({id: 0, title: '', body: '', });
    const [comments, setComments] = useState<Comment[]>([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getByID(id);
        setPost(response.data);
    });

    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(parseInt(params.id!));
        fetchComments(parseInt(params.id!));
    }, []);

    if (error || commentsError) {
        return (
            <div>
                <h1>Error, can't load this page!</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>You are on the page of post id = {params.id}</h1>

            {isLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                : <div>{post.id} {post.title}</div>}

            <h1>
                Comments
            </h1>


            {isCommentsLoading
              ? <Loader/>
                : <div>
                    {comments.map(comm => (
                        <div key={comm.id} style={{marginTop: "25px"}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    ))}
                </div>
            }


        </div>
    )
}
export default PostIdPage;