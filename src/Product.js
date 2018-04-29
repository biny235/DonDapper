import React from 'react';
import { connect } from 'react-redux';
import AddToCart from './AddToCart';
import { Container, Row, Col } from 'reactstrap';

const Product = ({ product, history }) => {
  return product ? (
    <Container id={product.id}>
      <h1>{product && product.name}</h1>
      <h5>{product.description}</h5>
      <h2>${product && product.price}</h2> 
      <AddToCart product={product} history={history} />
    </Container>
  ) : null;
};

const mapStateToProps = ({ products }, { id, history }) => {
  const product = products && products.find(product => product.id === id);
  return { product, history };
};

export default connect(mapStateToProps)(Product);
