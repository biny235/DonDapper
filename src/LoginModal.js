import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import UserForm from './UserForm';


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
    console.log(slideIndex)
    return (

      <div className="card">
        {
        slideIndex === 0 ? 
          <LoginForm />
          :
          user.id ? 
            null
            :
            <UserForm />
        }
        {!user.id && 
          (<div className='btn-group'>
            <button className="btn btn-secondary" onClick={()=>onChange(0)}>Login</button>
            <button className="btn btn-secondary" onClick={()=>onChange(1)}>Sign Up</button>
            </div>
        )}
        
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
