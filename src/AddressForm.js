import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateAddress } from './store';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

let setErrors = function(err) {
  this.setState({ errors: err });
};
class AddressForm extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      lineOne: props.lineOne || '', 
      lineTwo: props.lineTwo || '',
      city: props.city || '',
      state: props.state || '',
      zipCode: props.zipCode || '',
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    nextProps.address !== this.state.address ?
      this.setState(Object.assign({}, this.state, nextProps.address))
      : 
      null
  }
  onChange(ev) {
    const { name, value } = ev.target
    this.setState({[name]: value})
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { errors, lineOne } = this.state;
    const { onChange } = this;
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}
        <div>
          <input value={lineOne} name="lineOne" onChange={onChange}/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({user}, {addressId}) => {
  const { addresses } = user;
  const address = addresses && addresses.find(address => address.id === addressId)
  return { address };
};
const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateAddress: address => createOrUpdateAddress(address)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);



