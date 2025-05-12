import { lazy } from "react";
import Loadable from 'components/Loadable';

import Dashboard from "layout/Dashboard";
import ProtectedRoute from "components/ProtectedRoute";

const AdminPage = Loadable(lazy(() => import('pages/AdminPage')));
const BlogCreate = Loadable(lazy(() => import('pages/admin/blog/BlogCreate')));
const BlogView = Loadable(lazy(() => import('pages/admin/blog/BlogView')));
const BlogManagement = Loadable(lazy(() => import('pages/admin/blog/BlogManagement')));
const BlogDesignView = Loadable(lazy(() => import('pages/admin/blog/design-details/BlogDesignView')));
const BlogDesignCreate = Loadable(lazy(() => import('pages/admin/blog/design-details/BlogDesignCreate')));
const OrderManagement = Loadable(lazy(() => import('pages/admin/order/OrderManagement')));
const ProductCreate = Loadable(lazy(() => import('pages/admin/product/ProductCreate')));
const ProductView = Loadable(lazy(() => import('pages/admin/product/ProductView')));
const ProductManagement = Loadable(lazy(() => import('pages/admin/product/ProductManagement')));

const AdminRoutes = {
    path: '/admin',
    element: <ProtectedRoute element={<Dashboard />} />,
    children: [
        {
            path: 'dashboard',
            element: <ProtectedRoute element={<AdminPage />} />
        },
        {
            path: 'orders',
            children: [
                {
                    path: '',
                    element: <ProtectedRoute element={<OrderManagement />} />
                }
            ]
        },
        {
            path: 'products',
            children: [
                {
                    path: '',
                    element: <ProtectedRoute element={<ProductManagement />} />
                },
                {
                    path: ':slug',
                    element: <ProtectedRoute element={<ProductView />} />
                },
                {
                    path: 'create-product',
                    element: <ProtectedRoute element={<ProductCreate />} />
                }
            ]
        },
        {
            path: 'blogs',
            children: [
                {
                    path: '',
                    element: <ProtectedRoute element={<BlogManagement />} />
                },
                {
                    path: ':slug',
                    children: [
                        {
                            path: '',
                            element: <ProtectedRoute element={<BlogView />} />
                        },
                        {
                            path: 'design-details',
                            children: [
                                {
                                    path: ':slug',
                                    element: <ProtectedRoute element={<BlogDesignView />} />
                                },
                                {
                                    path: 'create-design-detail',
                                    element: <ProtectedRoute element={<BlogDesignCreate />} />
                                }
                            ]

                        }
                    ]

                },
                {
                    path: 'create-blog',
                    element: <ProtectedRoute element={<BlogCreate />} />
                },
            ]
        },
    ]
};

export default AdminRoutes;