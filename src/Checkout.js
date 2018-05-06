import React from 'react';
import { connect } from 'react-redux';
import AddressDropdown from './AddressDropdown';
import { editOrder } from './store';
import axios from 'axios';
class Checkout extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { cart, user } = this.props;
    const email = {
      from: '"Grace Shopper" <grace@shopper.com>',
      to: user.email,
      subject: 'Order Confirmed',
      text: `Hi, ${user.firstName}. Your order ID is ${cart.id}.`
    };
    axios.post(`/api/email/send`, email).then(res => res.data);
    this.props.editOrder({ id: cart.id, status: 'order' });
  }

  render() {
    const { onSubmit } = this;
    return (
      <div>
        <div>
          <AddressDropdown />
        </div>
        <button type="submit" onClick={onSubmit}>
          Check Out
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user }) => {
  return {
    cart,
    user
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editOrder: (order, id) => dispatch(editOrder(order, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
