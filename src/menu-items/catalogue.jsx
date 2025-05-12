import { BallotOutlined, ContentPasteGoOutlined, Inventory2Outlined } from '@mui/icons-material';

const icons = {
    BallotOutlined,
    ContentPasteGoOutlined,
    Inventory2Outlined
};

const catalogue = {
    id: 'group-catalogue',
    title: 'Danh mục',
    type: 'group',
    children: [
        {
            id: 'order',
            title: 'Đơn hàng',
            type: 'item',
            url: '/admin/orders',
            icon: icons.ContentPasteGoOutlined,
        },
        {
            id: 'products',
            title: 'Sản phẩm',
            type: 'item',
            url: '/admin/products',
            icon: icons.Inventory2Outlined,
        },
        {
            id: 'blogs',
            title: 'Blogs',
            type: 'item',
            url: '/admin/blogs',
            icon: icons.BallotOutlined,
        },
    ]
};

export default catalogue;