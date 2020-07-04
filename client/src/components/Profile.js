import React, { Component } from "react";

import jwt_decode from "jwt-decode";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
    };
  }

  componentDidMount() {
    const token = localStorage.userToken;
    const decoded = jwt_decode(token);
    // console.log(decoded);
    if (!decoded.email) {
      this.props.history.push("/");
    }
    this.setState({
      name: decoded.name,
      email: decoded.email,
    });
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
