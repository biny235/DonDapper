import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

export default class Autocomplete extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      predictions: []
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev){
    axios.post('/google', {input: ev.target.value})
    .then(res => {
      console.log(res)
      return res.data
    })
    .then(predictions => {
      console.log(predictions)
      this.setState({predictions})
    })
  }

  render(){
    const { predictions } = this.state;
    console.log(predictions)
    return(
      <div>
        <input onChange={this.onChange}/>
        <ul>
          {predictions.length ? predictions.map(pred =>(
            <li key={pred.place_id}>{pred.description}</li>
          )) : null}
        </ul>
      </div>
    )
  }


}

