import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import './landing.scss';
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      specialization: "",
      institute: "",
    };
  }

  componentDidMount() {
    let name = localStorage.getItem("name");
    let mail = localStorage.getItem("userName");
    let specialization = localStorage.getItem("specialization");
    let institute = localStorage.getItem("institute");
    this.setState({
      name: name,
      email: mail,
      specialization: specialization,
      institute: institute,
    });
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
  }
  render() {
    return (
      <div style={{ margin: "auto", paddingTop: "30vh", width: "100%" }}>
        <Card
          style={{
            margin: "auto",
            width: "18rem",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Card.Body>
            <Card.Title>Your Profile</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Welcome</Card.Subtitle>
            <Card.Text>
              Name: {this.state.name}
              <br></br>
              E-Mail: {this.state.email}
              <br></br>
              Specialization: {this.state.specialization}
              <br></br>
              Institute: {this.state.institute}
            </Card.Text>
          </Card.Body>
        </Card>

        <div className="logout">
          <center>
          <button onClick= {this.handleLogout} > Logout </button>
          </center>
        </div>
      </div>
    );
  }
}

export default Landing;
