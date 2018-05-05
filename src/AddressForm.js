import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateAddress } from './store';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

let setErrors = function (err) {
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
        zipCode: props.zipCode || '',
      },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.address !== this.state.address);
    const { id, lineOne, lineTwo, city, state, zipCode } = nextProps.address;
    nextProps.address !== this.state.address ?

      this.setState({ address: { id, lineOne, lineTwo, city, state, zipCode } })
      :
      null;
  }
  onChange(ev) {
    const { name, value } = ev.target;
    let { address } = this.state;
    address = Object.assign({}, address, { [name]: value });
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
          <Alert color='info' isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}
        <div>
          <input
            value={lineOne || ''}
            name='lineOne'
            onChange={onChange} />
          <input
            value={lineTwo || ''}
            name='lineTwo'
            onChange={onChange} />
          <input
            value={city || ''}
            name='city'
            onChange={onChange} />
          <input
            value={state || ''}
            name='state'
            onChange={onChange} />
          <input
            value={zipCode || ''}
            name='zipCode'
            onChange={onChange} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }, { addressId }) => {
  const { addresses } = user;
  const address = addresses && addresses.find(address => address.id === addressId);
  return { address };
};
const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateAddress: address => createOrUpdateAddress(address)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);

