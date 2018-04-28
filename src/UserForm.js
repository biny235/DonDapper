import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import omit from 'object.omit';
import { createOrUpdateUser } from './store';
import { connect } from 'react-redux';

let setErrors = function(err, user) {
  if (!user.id) this.setState({ user: {} });
  this.setState({ errors: err });
};
class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.id) this.setState({ user: user });
  }

  componentWillMount() {
    const { user } = this.props;
    if (user.id) this.setState({ user });
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
    this.setState({ errors: '' });
  }

  render() {
    const { createOrUpdateUser } = this.props;
    const { errors, user } = this.state;

    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
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
const mapStateToProps = ({ user }) => {
  return { user };
};
const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateUser: state => {
      state = omit(state, 'name');
      dispatch(createOrUpdateUser(state)).catch(err => {
        setErrors(err.response.data, state);
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
