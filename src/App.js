import 'bootstrap/dist/css/bootstrap.min.css';
import AddKendaraan from './pages/AddKendaraan';
import AddTipe from './pages/AddTipe';
import Home from './pages/Home';
import Report from './pages/Report';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/transaksi",
    element: <AddKendaraan/>,
  },
  {
    path: "/addTipe",
    element: <AddTipe/>,
  },
  {
    path: "/report",
    element: <Report/>,
  },
]);

function App() {
  return (
    
    <RouterProvider router={router} />
    
  );
}

export default App;
