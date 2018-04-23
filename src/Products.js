import React from 'react';
import { connect } from 'react-redux';


const Products = ({ products }) => {
  return (
    <ul>
      {products.map(product => {
        return (<li key={product.id}>
          {product.name} ${product.price}
        </li>);
      })}
    </ul>
  );
};

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(mapStateToProps)(Products);
