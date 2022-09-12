import React, { Component } from "react";
import "../Styles/App.css";
import Navbar from "./Navbar";
import Main from "./Main";

const GETAPI =
  "http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetTopDebts";

const POSTAPI =
  "http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetFilteredDebts";

class App extends Component {
  state = {
    users: [],
    blur: false,
    preloader: false,
    error: false,
    errorCode: "",
  };

  componentDidMount() {
    fetch(GETAPI)
      .then(
        this.setState({
          blur: true,
          preloader: true,
        })
      )
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response;
        }
        throw response.status;
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          users: data,
          blur: false,
          preloader: false,
        });
      })
      .catch((error) =>
        this.setState({
          blur: true,
          preloader: false,
          error: true,
          errorCode: error,
        })
      );
  }

  postAPI = (value) => {
    fetch(POSTAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then(
        this.setState({
          blur: true,
          preloader: true,
        })
      )
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw response.status;
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          users: data,
          blur: false,
          preloader: false,
        });
      })
      .catch((error) =>
        this.setState({
          blur: true,
          preloader: false,
          error: true,
          errorCode: error,
        })
      );
  };

  handleSortClick = () => {
    alert("W trakcie budowy");
  };

  render() {
    const { blur, preloader, error, errorCode, users } = this.state;
    return (
      <>
        <div className={blur ? "blur" : null}>
          {preloader ? <div className="preloader"></div> : null}
          {error ? <div className="error">{errorCode}</div> : null}
          <Navbar post={this.postAPI} />
          <Main users={users} click={this.handleSortClick} />
        </div>
      </>
    );
  }
}
export default App;
