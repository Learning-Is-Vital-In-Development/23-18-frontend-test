import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Store, Option, Result, Home } from '../pages';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/store/:storeId',
    element: <Store />,
  },
  {
    path: '/store/:storeId/menu/:menuId',
    element: <Option />,
  },
  {
    path: '/result',
    element: <Result />,
  },
];
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store/:storeId" element={<Store />} />
        <Route path="/store/:storeId/menu/:menuId" element={<Option />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
