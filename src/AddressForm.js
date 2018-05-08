import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateAddress } from './store';
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
        id: props.id || null,
        lineOne: props.lineOne || '',
        lineTwo: props.lineTwo || '',
        city: props.city || '',
        state: props.state || '',
        zipCode: props.zipCode || '',
        userId: props.userId || ''
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
      const { id, lineOne, lineTwo, city, state, zipCode } = nextProps.address;
      nextProps.address !== this.state.address &&
        this.setState({
          address: { id, lineOne, lineTwo, city, state, zipCode }
        });
    } else {
      this.setState({
        address: {
          id: null,
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
      const { id, lineOne, lineTwo, city, state, zipCode } = this.props.address;
      this.props.address !== this.state.address &&
        this.setState({
          address: { id, lineOne, lineTwo, city, state, zipCode }
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
    const { user } = this.props;
    this.props.createOrUpdateAddress(address, user);
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
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}
        <form>
          <div>Click fields to edit. Save address to check out.</div>
          <div>
            <label>
              <b>Address Line 1</b>
            </label>
            <br />
            <RIEInput
              value={lineOne || '123 Main St'}
              change={onChange}
              propName="lineOne"
            />
          </div>
          <div>
            <br />
            <label>
              <b>Address Line 2</b>
            </label>
            <br />
            <RIEInput
              value={lineTwo || 'Apt 4B'}
              change={onChange}
              propName="lineTwo"
            />
          </div>
          <div>
            <br />
            <label>
              <b>City</b>
            </label>
            <br />
            <RIEInput
              value={city || 'Springfield'}
              change={onChange}
              propName="city"
            />
          </div>
          <div>
            <br />
            <label>
              <b>State</b>
            </label>
            <br />
            <RIEInput
              value={state || 'XY'}
              change={onChange}
              propName="state"
            />
          </div>
          <div>
            <br />
            <label>
              <b>State</b>
            </label>
            <br />
            <RIEInput
              value={zipCode || '10001'}
              change={onChange}
              propName="zipCode"
            />
          </div>
        </form>
        <button type="submit" onClick={onClick}>
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }, { addressId }) => {
  const { addresses } = user;
  let address =
    addresses && addresses.find(address => address.id === addressId);
  // if (!address)
  //   address = {
  //     id: null,
  //     lineOne: '',
  //     lineTwo: '',
  //     city: '',
  //     state: '',
  //     zipCode: ''
  //   };
  return { address, user };
};

const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateAddress: (address, user) =>
      dispatch(createOrUpdateAddress(address, user)).catch(err =>
        setErrors(err.response.data)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
