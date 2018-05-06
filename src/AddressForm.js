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
    setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.address, 'x');
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
    console.log(this.props.address, 'y');
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
    const { user } = this.props;
    const { lineOne, lineTwo, city, state, zipCode } = address;
    const { onChange, onClick } = this;
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}
        <div>
          <RIEInput
            value={lineOne || 'street name'}
            change={onChange}
            propName="lineOne"
          />
          {'   '}
          <RIEInput
            value={lineTwo || 'secondery address'}
            change={onChange}
            propName="lineTwo"
          />
          {'  '}
          <RIEInput
            value={city || 'city'}
            change={onChange}
            propName="city"
          />{' '}
          <RIEInput
            value={state || 'state'}
            change={onChange}
            propName="state"
          />
          {'  '}
          <RIEInput
            value={zipCode || 'zipCode'}
            change={onChange}
            propName="zipCode"
          />
        </div>
        <button onClick={() => onClick()}>Save</button>
      </div>
    );
  }
}
const mapStateToProps = ({ user }, { addressId }) => {
  const { addresses } = user;
  const address =
    addresses && addresses.find(address => address.id === addressId);
  console.log(address, 'z');
  return { address, user };
};
const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateAddress: (address, user) =>
      dispatch(createOrUpdateAddress(address, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
