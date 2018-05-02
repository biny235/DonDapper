import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import UserForm from './UserForm';
import { Link } from 'react-router-dom'

class LoginModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.onChange = this.onChange.bind(this)
  }
  onChange(slideIndex){
    this.setState({slideIndex})
  }
  

  render() {
    const { slideIndex } = this.state;
    const { user } = this.props;
    const { onChange } = this;
    return (

      <div className="card login-modal" >
          {!user.id && 
            (<div className='card-header btn-group'>
                <button className="btn btn-secondary" onClick={()=>onChange(0)}>Login</button>
                <button className="btn btn-secondary" onClick={()=>onChange(1)}>Sign Up</button>
              </div>
          )}
        <div className="card-body">
          {
          slideIndex === 0 ? 
            <div>
            <LoginForm />
              <Link to={'/user'}>Account</Link>
            </div>
            :
            user.id ? 
              null
              :
              <UserForm />
                
          }
        </div>
          
      </div>
    )
  }
}

const mapStateToProps = ({user})=>{
  return{
    user
  }
}

export default connect(mapStateToProps)(LoginModal)
