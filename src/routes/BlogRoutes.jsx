import { lazy } from "react";
import Loadable from 'components/Loadable';

const BlogDetailPage = Loadable(lazy(() => import('pages/BlogDetailPage')));
const BlogPage = Loadable(lazy(() => import('pages/BlogPage')));

const BlogRoutes = {
    path: '/blogs',
    children: [
        {
            path: '',
            element: <BlogPage />
        },
        {
            path: ':slug',
            element: <BlogDetailPage />
        }
    ]
};

export default BlogRoutes;