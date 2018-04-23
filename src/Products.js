import React from 'react';
import { connect } from 'react-redux';


const Products = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => {
          return (<li key={product.id}>
            {product.name} - ${product.price}
          </li>);
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
