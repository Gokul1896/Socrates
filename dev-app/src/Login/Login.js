import React, { Component } from "react";
import "./login.scss";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Assets/Logo.png";
import { Col, Row } from "react-bootstrap";

import { API_ENDPOINT } from "../config/config";
import { Container } from "react-bootstrap";

toast.configure({
  autoClose: 1500,
  draggable: false,
  transition: Slide,
});
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formValid: false,
      // errorCount: null,
      errors: {
        email: "",
        password: "",
      },
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ [name]: value });
  };
  newUserChange = () => {
    this.props.history.push("/newuser");
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    let payload = {
      userName: email,
      password: password,
    };
    // console.log(payload);
    axios.post(`${API_ENDPOINT}api/login/user`, payload).then((res) => {
     console.log(res.data);

      const userName = res.data.user.userName;
      // const role = res.data.role;
      const institute = res.data.user.institute;
      const fullName = res.data.user.fullName;
      const specialization = res.data.user.specialization;
      const role = res.data.user.role;
      localStorage.setItem("userName", userName);
      localStorage.setItem("institute", institute);
      localStorage.setItem("fullname", fullName);
      localStorage.setItem("name", fullName);
      localStorage.setItem("specialization", specialization);
      

      if (role === "user") {
        this.props.history.push("/Landing");
      } else {
        this.props.history.push("/newUser");
      }
    });
  };
  render() {
    const { errors, email, password } = this.state;
    const isEnabled = email.length > 0 && password.length > 0;
    return (
      <React.Fragment>
          <Container fluid>
          <Row style={{minWidth:'100%' , minHeight: '100vh' , minHeight:'100vh'}}>
          <Col sm={12} md={6} style={{backgroundColor:'#0097e0'}}>
          <div style={{ margin: 'auto' , minHeight:'100%' , marginTop: '30vh'}}>
            
              <div style={{ margin: 'auto' , width: '100%'}}>
                <center>
                <img alt="Logo" className="loginlogo" src={logo}></img>
                </center>
              </div>
            
          </div>
         </Col>
         <Col sm={12} md={6}>
          <div  style={{minWidth:'100%' , margin:'auto' , minHeight:'100%' , marginTop: '20vh'}} >
            <div className="form-wrapper">
              <h2> Login </h2>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="email">
                  <label htmlFor="email"> Email </label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    className="Logininput"
                    noValidate
                  />
                  {errors.email.length > 0 && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="password">
                  <label htmlFor="password"> Password </label>
                  <input
                    type="password"
                    className="Logininput"
                    name="password"
                    onChange={this.handleChange}
                    noValidate
                  />
                </div>
                <div className="submit">
                  <button disabled={!isEnabled}> Login </button>
                </div>
                <div className="newuser">
                  <a onClick={this.newUserChange}>New User?</a>
                </div>
                
              </form>
            </div>
          </div>
          </Col>
       </Row>
       </Container>

      </React.Fragment>
    );
  }
}
export default LoginPage;
