import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateAddress, editOrder } from './store';
import { connect } from 'react-redux';
import { RIEInput } from 'riek';

let setErrors = function (err) {
  this.setState({ errors: err });
};

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {
        lineOne: props.lineOne || '',
        lineTwo: props.lineTwo || '',
        city: props.city || '',
        state: props.state || '',
        zipCode: props.zipCode || ''
      },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      const { lineOne, lineTwo, city, state, zipCode } = nextProps.address;
      nextProps.address !== this.state.address && this.setState({
        address: { lineOne, lineTwo, city, state, zipCode }
      });
    } else {
      this.setState({
        address: {
          lineOne: '',
          lineTwo: '',
          city: '',
          state: '',
          zipCode: ''
        }
      });
    }
  }

  componentDidMount() {
    if (this.props.address) {
      const { lineOne, lineTwo, city, state, zipCode } = this.props.address;
      this.props.address !== this.state.address &&
        this.setState({
          address: { lineOne, lineTwo, city, state, zipCode }
        });
    }
  }

  onChange(value) {
    let { address } = this.state;
    address = Object.assign({}, address, value);
    this.setState({ address });
  }

  onClick() {
    const { address } = this.state;
    const { addressId, user } = this.props;
    address.userId = user && user.id;
    this.props.createOrUpdateAddress(address, addressId);
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { errors, address } = this.state;
    const { lineOne, lineTwo, city, state, zipCode } = address;
    const { onChange, onClick } = this;
    return (
      <div>
        {errors && (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        )}
        <form>
          <div>Click fields to edit.</div>
          <div>
            <label><b>Address Line 1</b></label><br />
            <RIEInput
              className="address"
              value={lineOne || '123 Main St'}
              change={onChange}
              propName="lineOne"
            />
          </div>
          <div>
            <br /><label><b>Address Line 2</b></label><br />
            <RIEInput
              className="address"
              value={lineTwo || 'Apt. 4B'}
              change={onChange}
              propName="lineTwo"
            />
          </div>
          <div>
            <br /><label><b>City</b></label><br />
            <RIEInput
              className="address"
              value={city || 'Springfield'}
              change={onChange}
              propName="city"
            />
          </div>
          <div>
            <br /><label><b>State</b></label><br />
            <RIEInput
              className="address"
              value={state || 'Ohio'}
              change={onChange}
              propName="state"
            />
          </div>
          <div>
            <br /><label><b>State</b></label><br />
            <RIEInput
              className="address"
              value={zipCode || '10001'}
              change={onChange}
              propName="zipCode"
            />
          </div>
        </form>
        <button type='submit' onClick={onClick}>Save Address</button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }, { addressId }) => {
  const { addresses } = user;
  const address = addresses && addresses.find(address => address.id === addressId);
  return { address, addressId, user };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => dispatch(editOrder(order)),
    createOrUpdateAddress: (address, id) =>
      dispatch(createOrUpdateAddress(address, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
