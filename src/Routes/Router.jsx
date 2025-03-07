import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import StockData from '../Pages/Dashboard/StockData';
import DashboardOverview from '../Pages/Dashboard/DashboardOverview';
import AddStock from '../Pages/Dashboard/AddStock';

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
            },
            {
                path: '/add-new-stock',
                element: <AddStock />
            }
        ]
    }
])

export default router;