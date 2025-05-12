import { lazy } from "react";
import Loadable from 'components/Loadable';

const ShopPage = Loadable(lazy(() => import('pages/ShopPage')));
const ProductDetailPage = Loadable(lazy(() => import('pages/ProductDetailPage')));

const ShopRoutes = {
    path: '/shop',
    children: [
        {
            path: '',
            element: <ShopPage />
        },
        {
            path: 'product/:slug',
            element: <ProductDetailPage />
        }
    ]
}

export default ShopRoutes;