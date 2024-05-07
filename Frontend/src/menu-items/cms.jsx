// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall, IconQuestionMark, IconShieldLock, IconBook } from '@tabler/icons-react';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    IconQuestionMark,
    IconShieldLock,
    IconBook
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: <FormattedMessage id="Course Management" />,
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'price',
            title: <FormattedMessage id="Manage Course" />,
            type: 'collapse',
            icon: icons.IconBook,
            children: [
                {
                    id: 'price1',
                    title: (
                        <>
                            <FormattedMessage id="Course" /> 01
                        </>
                    ),
                    type: 'item',
                    url: '/pages/price/price1'
                },
                {
                    id: 'price2',
                    title: (
                        <>
                            <FormattedMessage id="Course" /> 02
                        </>
                    ),
                    type: 'item',
                    url: '/pages/price/price2'
                }
            ]
        }
    ]
};

export default pages;
