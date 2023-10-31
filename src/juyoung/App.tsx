import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Menu, MenuList } from './components';

const router = createBrowserRouter([
  {
    path: '/store/1',
    element: <MenuList />,
  },
  {
    path: '/store/1/menu/2',
    element: <Menu />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
