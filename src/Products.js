import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Category from './Category';

class Products extends Component {
  componentDidMount() {
    let id;
    this.props.history.location.state &&
<<<<<<< HEAD
      (this.props.history.location.state.id
        ? ({ id } = this.props.history.location.state)
        : (id = this.props.history.location.state));
    id && document.getElementById(id).scrollIntoView();
  }
=======
      (this.props.history.location.state.id ?
        { id } = this.props.history.location.state
        : id = this.props.history.location.state);
    id && document.getElementById(id).scrollIntoView();
}
>>>>>>> refs/remotes/origin/aj

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

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};
export default connect(mapStateToProps)(Products);
