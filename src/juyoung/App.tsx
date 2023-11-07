import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Store from './page/Store';
import Detail from './page/Detail';
import Error from './page/Error';
import Result from './page/Result';
import Home from './page/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/store/:id',
    element: <Store />,
  },
  {
    path: '/store/:id/menu/:menuId',
    element: <Detail />,
  },
  {
    path: '/result',
    element: <Result />,
  },

  {
    path: '*',
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
