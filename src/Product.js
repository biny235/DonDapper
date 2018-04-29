import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddToCart from './AddToCart';
import { Container, Row, Col } from 'reactstrap';

const Product = ({ product, history }) => {
  return product ? (
    <Container id={product.id}>
      {history ? (
        <NavLink
          activeClassName="active"
          className="disabled-link"
          to={`/products/${product.id}`}
        >
          <h1>{product && product.name}</h1>
        </NavLink>
      ) : (
        <NavLink activeClassName="active" to={`/products/${product.id}`}>
          <h1>{product && product.name}</h1>
        </NavLink>
      )}
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
