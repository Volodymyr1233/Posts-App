import React, { useEffect, useRef, useState } from 'react';
import "../styles/App.css";
import { Filter } from '../models/Filter';
import { Posts } from '../models/PostModel';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import { getPageCount } from '../utils/pages';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import Pagination from '../components/UI/pagination/Pagination';
import Loader from '../components/UI/loader/Loader';
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function PostsPage() {

  const [posts, setPosts] = useState<Posts[]>([]);
  const [filterObj, setFilterObj] = useState<Filter>({
    sort: "", 
    query: "",
  });

  const [visible, setVisible] = useState<boolean>(false); // is form visible
  const sortedAndSearchPosts = usePosts(posts, filterObj.sort, filterObj.query);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0); // post limit per page
  const [page, setPage] = useState<number>(1); // number of current page
  const lastElement = useRef<HTMLDivElement>(null); // last element on the page

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    if (limit === 0) return;
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  const changePage = (page: number) => {
    setPage(page);
  }

  useObserver({ref: lastElement, isLoading: isPostsLoading, canLoad: page < totalPages, callback: () => {
      setPage(page+1);
  }})

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])

  const createPost = (newPost: Posts) => {
    setPosts([...posts, newPost]);
    setVisible(false);
  }

  const removePost = (post: Posts) => {
    setPosts(posts.filter(p => post.id !== p.id))
  }

  

  return (
      <div className="App">
          <MyButton style={{marginTop: "25px"}} onClick={() => setVisible(true)}>
              Create post
          </MyButton>
          <MyModal visible={visible} setVisible={setVisible}>
              <PostForm createPost={createPost}/>
          </MyModal>
          <hr style={{margin: "15px 0"}}/>
          <MySelect
              value={String(limit)}
              onChange={value1 => {
                  setPosts([]);
                  setLimit(Number(value1));
                  setPage(0);
              }}
              defaultValue="Posts on the page"
              options={[
                  {value: "5", name: "5"},
                  {value: "10", name: "10"},
                  {value: "25", name: "25"},
                  {value: "-1", name: "Show all"},
              ]}
          />
          <PostFilter filterObj={filterObj} setFilterObj={setFilterObj}/>
          {postError &&
              <h1>Error {postError}</h1>}
          <PostList removePost={removePost} posts={sortedAndSearchPosts} title="Our posts"/>

          {isPostsLoading
              && <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>}

          <Pagination
              totalPages={totalPages}
              page={page}
          />

          {page === totalPages
              ? <div ref={lastElement} style={{height: 10, background: 'none'}}/>
              : <div ref={lastElement} style={{height: 10, background: 'none', marginTop: "150px"}}/>
          }
      </div>
  );
}

export default PostsPage;