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
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: props.user.firstName || '',
        lastName: props.user.lastName || '',
        email: props.user.email || '',
        password: props.user.password || ''
      },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user !== this.state.user)
      this.setState({
        user: user
      });
  }

  componentWillMount() {
    const { user } = this.props;
  }

  onChange(ev) {
    const { name, value } = ev.target;
    let { user } = this.state;
    user = Object.assign({}, user, { [name]: value });
    this.setState({ user });
    console.log(this.state);
  }
  onSubmit(id) {
    console.log(this.state.user);
    const user = Object.assign({}, { id }, this.state.user);
    console.log(user);
    this.props.createOrUpdateUser(user);
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { createOrUpdateUser, user } = this.props;
    const { errors } = this.state;
    const { firstName, lastName, email, password } = this.state.user;
    const { onChange, onSubmit } = this;
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}

        <div className="">
          <h1>{user.id ? user.name : ''}</h1>
          <input
            name="firstName"
            placeholder="First Name"
            value={firstName || ''}
            onChange={onChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            defaultValue={lastName}
            onChange={onChange}
          />

          <input
            name="email"
            placeholder="Email"
            defaultValue={email}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            defaultValue={password}
            onChange={onChange}
          />
          <button onClick={() => onSubmit(user.id)}>
            {user.id ? 'update' : 'create'}
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => {
  user = user || {};
  return { user };
};
const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateUser: user => {
      dispatch(createOrUpdateUser(user)).catch(err => {
        setErrors(err.response.data, user);
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
