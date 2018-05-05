import React from 'react';
import { connect } from 'react-redux';
import AddressDropdown from './AddressDropdown';
import AddressForm from './AddressForm';
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
    axios.post(`/api/email/send`, email)
      .then(res => res.data);
    this.props.editOrder({ status: 'order' }, cart.id);
  }

  render() {
    const order = { id: 1, addressId: 3 };
    const { onSubmit } = this;
    return (
      <div>
        <div>
          <AddressDropdown orderId={order.id} />
        </div>
        <div>
          <AddressForm addressId={order.addressId} />
        </div>
        <button type='submit' onClick={onSubmit}>Check Out</button>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user }) => {
  return {
    cart, user
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editOrder: (order, id) => dispatch(editOrder(order, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

