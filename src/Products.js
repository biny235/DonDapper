import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from './Product';
import Category from './Category';

class Products extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    if (
      this.props.history.location.state &&
      document.getElementById(this.props.history.location.state)
    ) {
      const id = this.props.history.location.state;
      console.log(document.getElementById(id).scrollIntoView());
    }
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        <h1>Products</h1>
        <div className="products-grid">
          {categories.map(category => (
            <div key={category.id} id={category.id}>
              <Category id={category.id} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Products);
