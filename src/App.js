import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar.tsx';
import Products from "./Page/Products.tsx";
import Product from "./Page/features/product/Product.tsx"
import Cart from "./Page/Cart.tsx";
import store from "./reducers/store.ts";
import { Provider } from 'react-redux';
import { Suspense } from 'react';



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products/:productId" element={<Product />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
