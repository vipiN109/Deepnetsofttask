import './App.css';
import {Route,Routes} from 'react-router-dom'
import Category from './Components/Category';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainCategory from './Components/MainCategory';
import SubCategory from './Components/SubCategory';
import Products from './Components/Products';

function App() {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/mainCategorys/:id" element={<MainCategory />} />
        <Route path="/subCategorys/:id" element={<SubCategory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/subCategory/:id" element={<Products />} />
        <Route path="/products/mainCategory/:id" element={<Products />} />
        <Route path="/products/category/:id" element={<Products />} />
        </Routes>
        <ToastContainer/>
    </div>
  );
}

export default App;
