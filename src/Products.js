import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from './Product';
import Category from './Category';

const Products = ({ products, categories }) => {
  return (
    <div>
      <h1>Products</h1>
      <div className="products-grid">
        {categories.map((category)=>(
          <div key={category.id }>
            <Category id={category.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ products, categories }) => {
  return {
    products,
    categories
  };
};

export default connect(mapStateToProps)(Products);
