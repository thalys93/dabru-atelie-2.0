
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from '../Index';
import Home from '../pages/Home';   
import Product from '../pages/Product';
import Product_Info from '../components/products/Product_Info';
import Contact from '../pages/Contact';
import {About} from '../pages/About/';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/Sobre',
                element: <About />
            },
            {
                path: '/Produtos',
                element: <Product />,               
            },
            {
                path: '/Contato',
                element: <Contact />
            },
            {
                path: 'Produto/:id/:name',
                element: <Product_Info />
            }
        ]
    },
])

function Routes() {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes