import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import omit from 'object.omit';
import { createOrUpdateAddress } from './store';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

let setErrors = function(err, user) {
  if (!user.id) this.setState({ user: {} });
  this.setState({ errors: err });
};
class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || {},
      addresses: props.user.addresses || {},
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.id !== this.state.user.id) this.setState({ user: user });
  }

  componentWillMount() {
    const { user } = this.props;
  }

  onChange(ev) {
    let { user } = this.state;
    let key = ev.target.name;
    let value = ev.target.value;
    user[key] = value;
    this.setState({ user: user });
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { createOrUpdateAddress } = this.props;
    const { errors, user, addresses } = this.state;
    const { onChange } = this;
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}

        <div className="">
          <h1>{user.id ? user.name : ''}</h1>
          <EditableLabel
            name="streetName"
            text={address.name}
            value={address.name}
            change={console.log('yey')}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            defaultValue={user.lastName || ''}
            onChange={onChange}
          />

          <input
            name="email"
            placeholder="Email"
            defaultValue={user.email || ''}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            defaultValue={user.password || ''}
            onChange={onChange}
          />
          <button
            onClick={() => {
              createOrUpdateUser(user);
            }}
          >
            {user.id ? 'update' : 'create'}
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => {
  return { user };
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
