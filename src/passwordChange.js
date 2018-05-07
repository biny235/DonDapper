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
        password: props.user.password
      },
      oldPassword: '',
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    setErrors = setErrors.bind(this);
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
        {errors && (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        )}
        <div>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Old Password"
            onChange={onChange}
          />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="New Password"
            // value={password || ''}
            onChange={onChange}
          />
          <button type="submit" className="btn btn-success" onClick={() => onSubmit(user.id)}>
            Change
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
