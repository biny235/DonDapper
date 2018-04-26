import React from 'react';
import { connect } from 'react-redux';
import AddToCart from './AddToCart';

const Product = ({ product, history }) => {
  return product ? (
    <div id={product.id}>
      <h1>{product && product.name}</h1>
      <h2>${product && product.price}</h2>
      <AddToCart product={product} history={history} />
    </div>
  ) : null;
};

const mapStateToProps = ({ products }, { id, history }) => {
  const product = products && products.find(product => product.id === id);
  return { product, history };
};

export default connect(mapStateToProps)(Product);
