import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateAddress, editOrder } from './store';
import { connect } from 'react-redux';

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
      errors: '',
      inputEdited: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentDidMount() {
    const { lineOne, lineTwo, city, state, zipCode } = this.props.address;
    this.props.address && this.setState({ address: { lineOne, lineTwo, city, state, zipCode } });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      const { lineOne, lineTwo, city, state, zipCode } = nextProps.address;
      nextProps.address !== this.state.address &&
        this.setState({
          address: { lineOne, lineTwo, city, state, zipCode }
        });
    }
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const { inputEdited } = this.state;
    const address = Object.assign({}, this.state.address, { [name]: value });
    inputEdited[name] = true;
    this.setState({ address });
  }

  onClick() {
    const { address } = this.state;
    const { user, cart } = this.props;
    address.userId = user && user.id;
    address.id = this.props.addressId;
    this.props.createOrUpdateAddress(address, cart);
    this.props.onEdit();
  }

  onCancel() {
    this.props.onEdit();
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { errors, address, inputEdited } = this.state;
    const { lineOne, lineTwo, city, state, zipCode } = address;
    const { onChange, onClick, onCancel } = this;
    const edited = Object.keys(inputEdited).some(field => field);
    return (
      <div>
        {errors && (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        )}
        <form>
          <input className="form-control" onChange={onChange} name='lineOne' value={lineOne || ''} placeholder="Street Name" />
          <input className="form-control" onChange={onChange} name='lineTwo' value={lineTwo || ''} placeholder="Apt, Suite, Unit, etc." />
          <input className="form-control" onChange={onChange} name='city' value={city || ''} placeholder="City" />
          <input className="form-control" onChange={onChange} name='state' value={state.toUpperCase() || ''} placeholder="State" maxLength="2" />
          <input className="form-control" onChange={onChange} name='zipCode' value={zipCode || ''} placeholder="Zip Code" maxLength="5" />
        </form>
        <button className="btn btn-success" type="submit" onClick={onClick} disabled={!edited}>
          Save Address
        </button>
        <button className="btn btn-danger" type="submit" onClick={onCancel}>
          Cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }, { cart }) => {
  const addressId = cart.addressId;
  const { addresses } = user;
  const address =
    addresses && addresses.find(address => address.id === addressId);
  return { address, addressId, user, cart };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => dispatch(editOrder(order)),
    createOrUpdateAddress: (address, id) =>
      dispatch(createOrUpdateAddress(address, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
