import PostsPage from "../pages/PostsPage";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: "/posts", component: PostsPage},
    {path: "/posts/:id", component: PostIdPage},
]

export const publicRoutes = [
    {path: "/login", component: Login},
]