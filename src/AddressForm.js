import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateAddress, editOrder } from './store';
import { connect } from 'react-redux';
import {
  RIEToggle,
  RIEInput,
  RIETextArea,
  RIENumber,
  RIETags,
  RIESelect
} from 'riek';

let setErrors = function(err) {
  this.setState({ errors: err });
};
class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {
        id: props.id || null,
        lineOne: props.lineOne || '',
        lineTwo: props.lineTwo || '',
        city: props.city || '',
        state: props.state || '',
        zipCode: props.zipCode || ''
      },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address && nextProps.address.id) {
      const { id, lineOne, lineTwo, city, state, zipCode } = nextProps.address;
      nextProps.address !== this.state.address
        ? this.setState({
            address: { id, lineOne, lineTwo, city, state, zipCode }
          })
        : null;
    }
  }
  componentDidMount() {
    if (this.props.address) {
      const { id, lineOne, lineTwo, city, state, zipCode } = this.props.address;
      this.props.address !== this.state.address
        ? this.setState({
            address: { id, lineOne, lineTwo, city, state, zipCode }
          })
        : null;
    }
  }
  onChange(val) {
    let { address } = this.state;
    address = Object.assign({}, address, val);
    this.setState({ address });
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { errors, address } = this.state;
    const { lineOne, lineTwo, city, state, zipCode } = address;
    const { onChange } = this;
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}
        <div>
          <RIEInput value={lineOne} change={onChange} propName="lineOne" />
          <RIEInput value={lineTwo} change={onChange} propName="lineTwo" />
          <RIEInput value={city} change={onChange} propName="city" />
          <RIEInput value={state} change={onChange} propName="state" />
          <RIEInput value={zipCode} change={onChange} propName="zipCode" />
        </div>
        <button onClick={() => createOrUpdateAddress(address)}>Save</button>
      </div>
    );
  }
}
const mapStateToProps = ({ user }, { addressId }) => {
  const { addresses } = user;
  const address =
    addresses && addresses.find(address => address.id === addressId);
  return { address };
};
const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateAddress: address => createOrUpdateAddress(address)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
