import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from './Product';

const Products = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
              <Product id={product.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(mapStateToProps)(Products);
