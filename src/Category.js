import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Category = ({ category, categoryProducts }) => {
  return (
    <div>
      <h1>{category && category.name}</h1>
      <ul>
        {
          categoryProducts.map(product => {
            return (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  {product.name}
                </Link>
                <span> - ${product.price}</span>
              </li>);
          })
        }
      </ul>
    </div>
  );
};


const mapStateToProps = ({ categories, products }, { id }) => {
  const category = categories && categories.find(category => category.id === id);
  const categoryProducts = products && products.filter(product => product.categoryId === category.id);
  return { category, categoryProducts };
};

export default connect(mapStateToProps)(Category);
