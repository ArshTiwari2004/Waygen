import { createBrowserRouter } from 'react-router-dom';
import Home from '../../landingpage/Landingpage';
import DashboardLayout from '../Layout/DashboardLayout';
import Dashboard from '../../pages/Dashboard/Dashboard';
import TrafficMap from '../../pages/TrafficMap/TrafficMap';
import LiveMonitoring from '../../pages/LiveMonitoring/LiveMonitoring';
import CCTVFeeds from '../../pages/CCTVFeeds/CCTVFeeds';
import Alerts from '../../pages/Alerts/Alerts';
import Analytics from '../../pages/Analytics/Analytics';
import Settings from '../../pages/Settings/Settings';



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/map",
                element: <TrafficMap />,
            },
            {
                path: "/monitoring",
                element: <LiveMonitoring />,
            },
            {
                path: "/cctv",
                element: <CCTVFeeds />,
            },
            {
                path: "/alerts",
                element: <Alerts />,
            },
            {
                path: "/analytics",
                element: <Analytics />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
        ]
    },
    // {
    //   path: "*",
    //   element: <NotFound />,
    // },
    // {
    //   path: "/coming-soon",
    //   element: <ComingSoon/>,
    // }
]);