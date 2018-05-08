import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editOrder } from './store';
import { RIEInput, RIETextArea } from 'riek';

class Dashboard extends Component {
  componentWillReceiveProps(nextProps) {
    const { history, user } = nextProps;
    if (!user.admin) history.push('/');
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    const { history, user } = this.props;
    if (!user.admin) history.push('/');
    this.onChange = this.onChange.bind(this);
  }

  onChange(order) {
    order.shipped = !order.shipped;
    this.props.editOrder(order);
  }

  render() {
    const { orders, categories, products } = this.props;
    const { onChange } = this;
    let checked = '';
    return (
      <div>
        <h1>All Orders</h1>
        <div>
          <h3>Order ID</h3>
        </div>
        {orders.length &&
          orders.map(order => (
            <div key={order.id}>
              <Link to={`/orders/${order.id}`}> {order.id}</Link>
              <div>
                <label className="switch">
                  <input
                    checked={order.shipped}
                    type="checkbox"
                    datatype="toggle"
                    onChange={() => onChange(order)}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          ))}
        <h1>Products By Category</h1>
        {categories.map(category => {
          return (
            <div key={category.id}>
              <h2>{category.name}</h2>
              {products.map(product => {
                if (product.categoryId === category.id) {
                  return <button key={product.id}>{product.name}</button>;
                }
              })}
            </div>
          );
        })}{' '}
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders, products, categories }) => {
  return {
    user,
    orders,
    categories,
    products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => {
      dispatch(editOrder(order));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
