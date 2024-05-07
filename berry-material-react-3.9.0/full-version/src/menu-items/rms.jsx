// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrush, IconTools, IconUser, IconDashboard } from '@tabler/icons-react';

// constant
const icons = {
    IconBrush,
    IconTools,
    IconUser,
    IconDashboard
};

// ==============================|| UI ELEMENTS MENU ITEMS ||============================== //

const elements = {
    id: 'ui-element',
    title: <FormattedMessage id="Registration Management" />,
    icon: icons.IconBrush,
    type: 'group',
    children: [
        {
            id: 'default',
            title: <FormattedMessage id="Dashboard" />,
            type: 'item',
            url: '/advance/alert',
            breadcrumbs: false,
            icon: icons.IconDashboard
        },
        {
            id: 'basic',
            title: <FormattedMessage id="Manage Students" />,
            type: 'collapse',
            icon: icons.IconUser,
            children: [
                {
                    id: 'accordion',
                    title: <FormattedMessage id="Viwe All Students" />,
                    type: 'item',
                    url: '/basic/accordion',
                    breadcrumbs: false
                },
                {
                    id: 'avatar',
                    title: <FormattedMessage id="Detailed Registration " />,
                    type: 'item',
                    url: '/basic/avatar',
                    breadcrumbs: false
                },
                {
                    id: 'badges',
                    title: <FormattedMessage id="Quick Registration" />,
                    type: 'item',
                    url: '/basic/badges',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default elements;
