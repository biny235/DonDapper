import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { createOrUpdateUser } from './store';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: props.user.firstName || '',
        lastName: props.user.lastName || '',
        email: props.user.email || '',
        password: props.user.password || '',
      },
      edited: {},
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.setErrors = this.setErrors.bind(this);
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
    const { edited } = this.state;
    let { user } = this.state;
    edited[name] = true;
    user = Object.assign({}, user, { [name]: value });
    this.setState({ user, errors: '' });
  }

  onSubmit(id) {
    const user = Object.assign({}, { id }, this.state.user);
    this.props.createOrUpdateUser(user)
      .catch(err => {
        this.setErrors(err.response.data);
      });
    this.setState({ edited: {} });
  }

  setErrors(errors) {
    this.setState({ errors });
  }

  render() {
    const { user } = this.props;
    const { edited, errors } = this.state;
    const { firstName, lastName, email, password } = this.state.user;
    const { onChange, onSubmit } = this;
    const fields = { firstName: 'First Name', lastName: 'Last Name', email: 'E-mail', password: 'Password' };
    const empty = Object.keys(fields).filter(field => !this.state.user[field]);
    const dirtyEmpty = empty.filter(field => edited[field]);
    return (
      <div>
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
            placeholder="E-mail"
            value={email || ''}
            onChange={onChange}
          />
          {!user.id ? <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password || ''}
            onChange={onChange}
          /> :
            null
          }
          {
            !!errors &&
            <Alert color="info">
              {errors}
            </Alert>
          }
          {
            !!dirtyEmpty.length &&
            <Alert color="info">
              {`${dirtyEmpty.map(field => fields[field]).join(', ')} cannot be empty`}
            </Alert>
          }
          <button type="submit" className="btn btn-success" style={{ "width": "100%" }} onClick={() => onSubmit(user.id)} disabled={empty.length}>
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
    createOrUpdateUser: user => dispatch(createOrUpdateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
