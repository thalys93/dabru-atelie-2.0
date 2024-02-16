
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from '../Index';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Product_Info from '../components/products/Product_Info';
import Contact from '../pages/Contact';
import { About } from '../pages/About/';
import Checkout_Entrega from '../pages/Checkout/Checkout_Entrega';
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
                path: 'Produto/:id/:produto',
                element: <Product_Info />
            }
        ]
    },
    {
        path: "/Checkout",
        element: <Checkout_Entrega />,
    }
])

function Routes() {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes