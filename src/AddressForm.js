import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateAddress, editOrder } from './store';
import { connect } from 'react-redux';
import { RIEInput } from 'riek';

let setErrors = function(err) {
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
      showForm: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.editSwitch = this.editSwitch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      const { lineOne, lineTwo, city, state, zipCode } = nextProps.address;
      nextProps.address !== this.state.address &&
        this.setState({
          address: { lineOne, lineTwo, city, state, zipCode },
          showForm: false
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
          address: { lineOne, lineTwo, city, state, zipCode },
          showForm: false
        });
    }
  }

  onChange(value) {
    let { address } = this.state;
    address = Object.assign({}, address, value);
    this.setState({ address });
  }
  editSwitch() {
    const { showForm } = this.state;

    this.setState({ showForm: !showForm });
  }

  onClick() {
    const { address } = this.state;
    const { user, cart } = this.props;
    address.userId = user && user.id;

    this.props.createOrUpdateAddress(address, cart);
    this.setState({
      address: address,
      showForm: false
    });
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { errors, address, showForm } = this.state;
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
            <div onClick={this.editSwitch}>
              <label>
                <b>Address Line 1</b>
              </label>
              <br />
              {showForm ? (
                <RIEInput
                  className="address placeHolder"
                  value={lineOne || 'lineOne'}
                  change={onChange}
                  propName="lineOne"
                />
              ) : (
                <div>{lineOne}</div>
              )}
            </div>
          </div>

          <div>
            <br />

            <div onClick={this.editSwitch}>
              <label>
                <b>Address Line 2</b>
              </label>
              <br />
              {showForm ? (
                <RIEInput
                  className="address placeHolder"
                  value={lineTwo || 'Apt. 4B'}
                  change={onChange}
                  propName="lineTwo"
                />
              ) : (
                <div>{lineTwo}</div>
              )}
            </div>
          </div>
          <div>
            <br />
            <div onClick={this.editSwitch}>
              <label>
                <b>City</b>
              </label>
              <br />
              {showForm ? (
                <RIEInput
                  className="address placeHolder"
                  value={city || 'Springfield'}
                  change={onChange}
                  propName="city"
                />
              ) : (
                <div>{city}</div>
              )}
            </div>
          </div>
          <div>
            <br />
            <div onClick={this.editSwitch}>
              <label>
                <b>State</b>
              </label>
              <br />
              {showForm ? (
                <RIEInput
                  className="address placeHolder"
                  value={state || 'Ohio'}
                  change={onChange}
                  propName="state"
                />
              ) : (
                <div>{state}</div>
              )}
            </div>
          </div>
          <div>
            <br />
            <div onClick={this.editSwitch}>
              <label>
                <b>State</b>
              </label>
              <br />
              {showForm ? (
                <RIEInput
                  className="address placeHolder"
                  value={zipCode || '10001'}
                  change={onChange}
                  propName="zipCode"
                />
              ) : (
                <div>{zipCode}</div>
              )}
            </div>
          </div>
        </form>
        <button type="submit" onClick={onClick}>
          Save Address
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
