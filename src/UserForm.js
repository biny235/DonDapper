import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import omit from 'object.omit';
import { createOrUpdateUser } from './store';
import { connect } from 'react-redux';

class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }
  onDismiss() {
    this.setState({ errors: '' });
    this.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    const { user, errors } = nextProps;
    if (user.id) this.setState({ user: user });
    this.setState({ errors: errors });
  }

  componentWillMount() {
    const { user, errors } = this.props;
    if (user.id) this.setState({ user, errors });
  }

  onChange(ev) {
    let { user } = this.state;
    user = omit(user, 'name');
    let key = ev.target.name;
    let value = ev.target.value;
    user[key] = value;
    this.setState({ user: user });
  }

  clearErrors() {
    this.setState({ error: '' });
  }
  setErrors(err) {
    this.setState({ error: err });
  }

  render() {
    const { createOrUpdateUser } = this.props;

    const { user, errors } = this.state;
    console.log(this.state);
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.onDismiss}>
            {errors}
          </Alert>
        ) : !user.id ? (
          <div>
            <h1>Create User</h1>

            <input
              name="firstName"
              placeholder="first name "
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="lastName"
              placeholder="last name "
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="email"
              placeholder="email"
              defaultValue=""
              onChange={this.onChange}
            />
            <input
              name="password"
              placeholder="password"
              defaultValue=""
              onChange={this.onChange}
            />
          </div>
        ) : (
          <div>
            <h1>{user.name}</h1>
            <input
              name="firstName"
              placeholder={user.firstName}
              defaultValue={user.firstName}
              onChange={this.onChange}
            />
            <input
              name="lastName"
              placeholder={user.lastName}
              defaultValue={user.lastName}
              onChange={this.onChange}
            />

            <input
              name="email"
              placeholder={user.email}
              defaultValue={user.email}
              onChange={this.onChange}
            />
            <input
              type="password"
              name="password"
              placeholder={user.password}
              defaultValue={user.password}
              onChange={this.onChange}
            />
          </div>
        )}

        {user.id ? (
          <button
            onClick={() => {
              createOrUpdateUser(user);
            }}
          >
            update
          </button>
        ) : (
          <button
            onClick={() => {
              createOrUpdateUser(user);
            }}
          >
            create
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, setErrors) => {
  return {
    createOrUpdateUser: state => {
      dispatch(createOrUpdateUser(state)).catch(err => {
        console.log(err.response.data);
        setErrors(err.response.data);
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(UserForm);