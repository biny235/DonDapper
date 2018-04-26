import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { createUser, updateUser, clearErrors } from './store';
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
  }
  onDismiss() {
    this.setState({ errors: '' });
    clearErrors();
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

  onDismiss() {
    this.setState({ errors: '' });
    clearErrors();
  }

  onChange(ev) {
    let key = ev.target.name;
    let value = ev.target.value;
    this.setState({ [key]: value });
  }

  render() {
    const { createUser, updateUser } = this.props;

    const { user, errors } = this.state;

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
          </div>
        )}

        {user.id ? (
          <button
            onClick={() => {
              updateUser(user);
            }}
          >
            update
          </button>
        ) : (
          <button
            onClick={() => {
              createUser(user);
            }}
          >
            create
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ errors }) => {
  return {
    errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: ({ user }) => {
      dispatch(createUser({ user }));
      dispatch(clearErrors());
    },
    updateUser: ({ user }) => {
      dispatch(updateUser({ user }));
      dispatch(clearErrors());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
