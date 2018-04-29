import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AddToCart from './AddToCart';
import { Container, Row, Col } from 'reactstrap';

const Product = ({ product, history }) => {
  return product ? (
<<<<<<< HEAD
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
=======
    <Container className="product" id={product.id}>
      <span><img src="http://via.placeholder.com/350x500" /></span>
      <span>
        <h1>{product && product.name}</h1>
        <span className='product-description-text'>{product.description}</span>
        <h2>${product && product.price}</h2> 
        <AddToCart product={product} history={history} />
      </span>
>>>>>>> master
    </Container>
  ) : null;
};

const mapStateToProps = ({ products }, { id, history }) => {
  const product = products && products.find(product => product.id === id);
  return { product, history };
};

export default connect(mapStateToProps)(Product);
