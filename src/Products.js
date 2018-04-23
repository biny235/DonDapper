import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {
          products.map(product => {
            return (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  {product.name}
                </Link>
                <span> - ${product.price}</span>
              </li>);
          })
        }
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
