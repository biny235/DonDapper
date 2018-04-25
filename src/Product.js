import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Product = ({ product }) => {
  return product ? (
    <div id={product.id}>
      <span>
        <Link to={`/products/${product.id}`}>
          <h1>{product && product.name}</h1>
        </Link>
        <h2>${product && product.price}</h2>
      </span>
    </div>
  ) : null;
};

const mapStateToProps = ({ products }, { id }) => {
  const product = products && products.find(product => product.id === id);
  return { product };
};

export default connect(mapStateToProps)(Product);
