import React from 'react';
import { connect } from 'react-redux';
import AddToCart from './AddToCart';

const Product = ({ product }) => {
  return (
    <div>
      <h1>{product && product.name}</h1>
      <h2>${product && product.price}</h2>
      <AddToCart product={product} />
    </div>
  );
};


const mapStateToProps = ({ products }, { id }) => {
  const product = products && products.find(product => product.id === id);
  return { product };
};

export default connect(mapStateToProps)(Product);
