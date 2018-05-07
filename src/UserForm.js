import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateUser } from './store';
import { connect } from 'react-redux';

let setErrors = function (err, user) {
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
    const { firstName, lastName, email, password } = user;
    if (user.firstName !== this.state.user) {
      this.setState({
        user: { firstName, lastName, email, password }
      });
    }
  }

  onChange(ev) {
    const { name, value } = ev.target;
    let { user } = this.state;
    user = Object.assign({}, user, { [name]: value });
    this.setState({ user });
  }
  onSubmit(id) {
    const user = Object.assign({}, { id }, this.state.user);
    this.props.createOrUpdateUser(user);
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { user } = this.props;
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

        <div>
          <input
            className="form-control"
            name="firstName"
            placeholder="First Name"
            value={firstName || ''}
            onChange={onChange}
          />
          <input
            className="form-control"
            name="lastName"
            placeholder="Last Name"
            value={lastName || ''}
            onChange={onChange}
          />

          <input
            className="form-control"
            name="email"
            placeholder="Email"
            value={email || ''}
            onChange={onChange}
          />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="password"
            value={password || ''}
            onChange={onChange}
          />
          <button className="btn btn-success" style={{ "width": "100%" }} onClick={() => onSubmit(user.id)}>
            {user.id ? 'Update' : 'Create'}
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
