import React, { Component } from "react";
import "./register.scss";
import { toast, Slide } from "react-toastify";
import axios from "axios";
import { Redirect } from "react-router";
import { Navbar } from "react-bootstrap";
import { API_ENDPOINT } from "../config/config";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../Assets/Logo.png";
// Toast library is used for giving registration success message to the user
toast.configure({
  autoClose: 1500,
  draggable: false,
  transition: Slide,
});

// RegEx is used for verifying email os of correct format
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      institute: "",
      role: "user",
      specialization: "",
      errors: {
        firstName: "",
        email: "",
        password: "",
      },
    };
  }
  // The below function is to store the entered field values and also to check for errors
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 4 ? "Full Name must be 4 characters long!" : "";
        break;
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

    this.setState({ errors, [name]: value });
  };

  //For redirection to login page
  alrdyuser = () => {
    this.props.history.push("/");
  };

  //This function posts the data to the backend by calling registration API
  handleRegister = (event) => {
    event.preventDefault();

    const {
      firstName,
      fullName,
      lastName,
      email,
      password,
      institute,
      specialization,
    } = this.state;

    const payload = {
      fullName: fullName,
      userName: email,
      password: password,
      institute: institute,
      role: "user",
      specialization: specialization,
    };
    // console.log(payload);

    axios.post(`${API_ENDPOINT}api/create/user`, payload).then((res) => {
      if (res.status === 200) {
        toast.success("Successfully registred", { containerId: "ERROR" });
        this.setState({
          formValid: validateForm(this.state.errors),
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          institute: "",
          specialization: "",
          redirect: true,
        });
      }
    });
  };
  // For rendering the HTML
  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    const {
      errors,
      formValid,
      fullName,
      email,
      specialization,
      password,
      institute,
    } = this.state;
    const isEnabled =
      email.length > 0 &&
      password.length > 0 &&
      fullName.length > 0 &&
      institute.length > 0 &&
      specialization.length > 0;
    return (
      <React.Fragment>
        <Container fluid>
          <Row
            style={{ minWidth: "100%", minHeight: "100vh", minHeight: "100vh" }}
          >
            <Col sm={12} md={6} style={{ backgroundColor: "#0097e0" }}>
              <div
                style={{ margin: "auto", minHeight: "100%", marginTop: "30vh" }}
              >
                <div style={{ margin: "auto", width: "100%" }}>
                  <center>
                    <img alt="Logo" className="loginlogo" src={logo}></img>
                  </center>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6}>
              <div
                style={{
                  minWidth: "100%",
                  margin: "auto",
                  minHeight: "100%",
                  marginTop: "3vh",
                }}
              >
                <div className="form-Signupwrapper">
                  <h2>New User</h2>
                  <form
                    onSubmit={this.handleRegister}
                    noValidate
                    className="regForm"
                  >
                    <div className="RegfirstName">
                      <label htmlFor="firstName">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        onChange={this.handleChange}
                        noValidate
                      />
                      {errors.firstName.length > 0 && (
                        <span className="error">{errors.firstName}</span>
                      )}
                    </div>
                    <div className="Regemail">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        noValidate
                      />
                      {errors.email.length > 0 && (
                        <span className="error">{errors.email}</span>
                      )}
                    </div>
                    <div className="Regpassword">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        noValidate
                      />
                    </div>
                    <div className="Regcompany">
                      <label htmlFor="institute">institute</label>
                      <input
                        type="text"
                        name="institute"
                        onChange={this.handleChange}
                        noValidate
                      />
                    </div>
                    <div className="Regcompany">
                      <label htmlFor="company">Specialization</label>
                      <input
                        type="text"
                        name="specialization"
                        onChange={this.handleChange}
                        noValidate
                      />
                    </div>

                    <div className="register">
                      <button type="submit">Register</button>
                    </div>

                    <div className="alrdyuser">
                      <p onClick={this.alrdyuser}>Already user ?</p>
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

export default Register;
