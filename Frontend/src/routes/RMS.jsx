import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

import { loader as productsLoader, productLoader } from 'api/products';

// advance Dashboard routing
const AdvanceUIAlert = Loadable(lazy(() => import('views/RMS/ui-elements/advance/Dashboard/index')));

// basic Students routing
const BasicUIAccordion = Loadable(lazy(() => import('views/RMS/ui-elements/basic/ViweAllStudents/index')));
const BasicUIAvatar = Loadable(lazy(() => import('views/RMS/ui-elements/basic/DetailedRegistratin/index')));
const BasicUIBadges = Loadable(lazy(() => import('views/RMS/ui-elements/basic/QuickRegistration/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/advance/alert',
            element: <AdvanceUIAlert />
        },
        
        {
            path: '/basic/accordion',
            element: <BasicUIAccordion />
        },
        {
            path: '/basic/avatar',
            element: <BasicUIAvatar />
        },
        {
            path: '/basic/badges',
            element: <BasicUIBadges />
        }
    ]
};

export default MainRoutes;
