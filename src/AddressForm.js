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
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  onChange(ev) {

  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { address } = this.props
    console.log(address)
    const { errors, user, addresses } = this.state;
    const { onChange } = this;
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = ({addresses}, {addressId}) => {
  const address = address && addressess.find(address => address.id = addressId)
  return { address };
};
const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateUser: state => {
      state = omit(state, 'fullAddress');
      dispatch(createOrUpdateAddress(state)).catch(err => {
        setErrors(err.response.data, state);
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
