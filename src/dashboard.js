import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Products from './Products';
import { editOrder } from './store';

class DashBoard extends Component {
  componentWillReceiveProps(nextProps) {
    const { history, user } = nextProps;
    if (!user.admin) history.push('/home');
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    const { history, user } = this.props;
    if (!user.admin) history.push('/home');
    this.onChange = this.onChange.bind(this);
  }

  onChange(order) {
    !window.localStorage.getItem('checked')
      ? window.localStorage.setItem('checked', 1)
      : window.localStorage.removeItem('checked');
    order.shipped = !order.shipped;
    this.props.editOrder(order);
  }

  render() {
    const { orders, user } = this.props;
    const { onChange } = this;
    return (
      <div>
        <h1>All Orders</h1>
        <div>
          <h3>Order ID</h3>
          <h3>shipped</h3>
        </div>
        {orders.length
          ? orders.map(order => (
              <div key={order.id}>
                <Link to={`/orders/${order.id}`}> {order.id}</Link>
                <div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      datatype="toggle"
                      onChange={() => onChange(order)}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders }) => {
  return {
    user,
    orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => {
      dispatch(editOrder(order));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
