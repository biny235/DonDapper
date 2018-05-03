import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from './Product';
import Category from './Category';

class Products extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let id;
      this.props.history.location.state ?
        this.props.history.location.state.id ?
          { id } = this.props.history.location.state
          :
          id = this.props.history.location.state
        :
        null
    id ? document.getElementById(id).scrollIntoView() : null
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <div className="parallax" />
        <div className="products">
          <div className="products-grid">
            {categories.map(category => (
              <div key={category.id} id={category.id}>
                <Category id={category.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }, ownProps) => {
  console.log(ownProps)
  return {
    categories
  };
};

export default connect(mapStateToProps)(Products);
