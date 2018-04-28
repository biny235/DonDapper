import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

class User extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    };
    this.click = this.click.bind(this);
  }
  click() {
    this.setState({ showForm: true });
  }
  componentWillReceiveProps(nextProps) {
    !nextProps.user.id && this.setState({ showForm: false });
  }
  render() {
    const { user, orders } = this.props;
    const { showForm } = this.state;
    return (
      <div>
        <h1>Account</h1>
        <h2>{user.name}</h2>
        <h3>{!user.name ? 'Please sign in.' : 'Orders'}</h3>
        {orders.map(order => (
          <div key={order.id}>
            <Link to={`/orders/${order.id}`}>Order ID: {order.id}</Link>
          </div>
        ))}
        <button onClick={() => this.click()}>
          {window.localStorage.getItem('token') ? 'update user' : 'create user'}
        </button>
        {showForm && <UserForm />}
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders }) => {
  const userOrders = orders && orders.filter(order => order.userId === user.id);
  return { user, orders };
};

export default connect(mapStateToProps)(User);
