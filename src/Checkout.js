import React from 'react';
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
    return (
      <div>
        <div>
          <AddressDropdown orderId={order.id} />
        </div>
        <div>
          <AddressForm addressId={order.addressId} />
        </div>
        <form>
          <script
            src="https://checkout.stripe.com/checkout.js" class="stripe-button"
            data-key="pk_test_t4Gsi41KZkmzWDyxcwcFMHhp"
            data-amount="999"
            data-name="Demo Site"
            data-description="Widget"
            data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
            data-locale="auto">
          </script>
        </form>
      </div>
    );
  }
}

export default Checkout;
