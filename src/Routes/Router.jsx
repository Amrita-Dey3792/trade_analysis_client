import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import StockData from '../Pages/Dashboard/StockData';
import DashboardOverview from '../Pages/Dashboard/DashboardOverview';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <DashboardOverview />
            },
            {
                path: '/stock-data',
                element: <StockData />
            }
        ]
    }
])

export default router;