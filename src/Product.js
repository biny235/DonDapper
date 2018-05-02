import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddToCart from './AddToCart';
import { Container, Row, Col } from 'reactstrap';

const Product = ({ product, history }) => {
  return product ? (
    <Container className="product" id={product.id}>
      <span>
        <img src={product.imageUrl} />
      </span>
      <span>
        <h1>{product && product.name}</h1>
        <span className="product-description-text">{product.description}</span>
        <h2>${product && product.price}</h2>
        <AddToCart product={product} history={history} />
      </span>
    </Container>
  ) : null;
};

const mapStateToProps = ({ products }, { id, history }) => {
  const product = products && products.find(product => product.id === id);
  return { product, history };
};

export default connect(mapStateToProps)(Product);
