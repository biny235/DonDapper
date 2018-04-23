import React from 'react';
import { connect } from 'react-redux';


const Categories = ({ categories }) => {
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => {
          return (<li key={category.id}>
            {category.name}
          </li>);
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Categories);
