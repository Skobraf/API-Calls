import React, { Component } from 'react';
import { formatDate } from '../helpers'

class GitRepo extends Component {

  render() {
    return (
     <section style={{ display: "flex" }} >
         <div>
            <img
              src={this.props.user.avatar}
              alt={this.props.user.name}
              style={{
                borderRadius: "50%",
                height: 72,
                marginRight: 20,
                width: 72
              }}
            />
            </div>
            <ul>
              <li>
                <h1>{this.props.user.name}</h1>
              </li>
              <li>
                <p>{this.props.user.description} </p>
              </li>
              <li>
                <div style={{display:"inline-block"}} ><span>Stars: {this.props.user.numbStars}</span></div>
                <div style={{display:"inline-block"}} ><span>Issues: {this.props.user.numbIssues}</span></div>
                <div style={{display:"inline-block"}} ><p>Submited {formatDate(this.props.user.timeInterval)} days ago  by {this.props.user.authorName}</p></div>
              </li>
            </ul>
      </section>
    );
  }
}

export default GitRepo;
