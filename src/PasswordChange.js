import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateUser } from './store';
import { connect } from 'react-redux';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      inputEdited: {},
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setErrors = this.setErrors.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const { inputEdited } = this.state;
    inputEdited[name] = true;
    this.setState({ [name]: value, inputEdited });
  }

  onSubmit(id) {
    const { newPassword } = this.state;
    const user = Object.assign({}, { id }, { password: newPassword });
    this.props.createOrUpdateUser(user);
    this.props.onUpdate();
  }

  setErrors(errors) {
    this.setState({ errors });
  }

  clearErrors() {
    this.setState({ errors: '' });
  }

  render() {
    const { user } = this.props;
    const { errors } = this.state;
    const { oldPassword, newPassword, inputEdited } = this.state;
    const { onChange, onSubmit } = this;
    const passwordCorrect = oldPassword === user.password;
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
            name="oldPassword"
            placeholder="Old Password"
            onChange={onChange}
          />
          <input
            className="form-control"
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={onChange}
          />
          <button type="submit" className="btn btn-success" style={{ "width": "100%" }} onClick={() => onSubmit(user.id)} disabled={!passwordCorrect || !newPassword.length}>
            Change
          </button>
          {!passwordCorrect && inputEdited.oldPassword && <Alert color="info">Old Password is incorrect.</Alert>}
          {passwordCorrect && inputEdited.newPassword && !newPassword.length && <Alert color="info">New Password must be valid.</Alert>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  user = user || {};
  return { user };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createOrUpdateUser: user => {
      dispatch(createOrUpdateUser(user, history)).catch(err => {
        setErrors(err.response.data, user);
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
