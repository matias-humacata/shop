import React, { useEffect, useState } from 'react';
import { Pagination } from './pagination';
import './cart';
import '../index.css';

export const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const productList = async () => {
    const data = await fetch('https://fakestoreapi.com/products');
    const products = await data.json();
    setProducts(products);
  };

  useEffect(() => {
    productList();
  }, []);

  return (
    <>
      <div className='container-products'>
        {products.slice(firstIndex, lastIndex).map(product => (
          <div className='card-product' key={product.id}>
            <figure className='container-img'>
              <img src={product.image} alt={product.title} />
            </figure>
            <div className='info-product'>
              <h3>{product.title}</h3>
              <p className='price'>${product.price}</p>
              <button onClick={() => onAddToCart(product)}>Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>

      <Pagination 
        productsPerPage={productsPerPage} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalProducts={products.length}
      />
    </>
  );
};