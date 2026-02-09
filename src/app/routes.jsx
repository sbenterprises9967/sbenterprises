import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Services from "../pages/Services.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import WorkGallery from "../pages/WorkGallery.jsx";
import Clients from "../pages/Clients.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/products/:slug", element: <ProductDetails /> },
  { path: "/services", element: <Services /> },
  { path: "/work-gallery", element: <WorkGallery /> },
  { path: "/clients", element: <Clients /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  // { path: "*", element: <NotFound /> },
];
