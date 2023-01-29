import React, { Component } from "react";
import "../Styles/App.css";
import Navbar from "./Navbar";
import Main from "./Main";

const GETAPI = "data/api.json";
// "http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetTopDebts";

const POSTAPI ="data/api.json"
  // "http://rekrutacja-webhosting.it.krd.pl/api/Recruitment/GetFilteredDebts";

class App extends Component {
  state = {
    users: [],
    blur: false,
    preloader: false,
    error: false,
    errorCode: "",
    name: false,
    nip: true,
    value: true,
    date: true,
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
          return response;
        }
        throw response.status;
      })
      .then((response) => response.json())
      .then((data) => {
        function sortStrByNameAsc(a, b) {
          return a.Name.localeCompare(b.Name);
        }
        this.setState({
          users: data.sort(sortStrByNameAsc),
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
        function sortStrByNameAsc(a, b) {
          return a.Name.localeCompare(b.Name);
        }
        this.setState({
          users: data.sort(sortStrByNameAsc),
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

  handleClickSortName = () => {
    const users = this.state.users;

    function sortStrByNameAsc(a, b) {
      return a.Name.localeCompare(b.Name);
    }

    function sortStrByNameDesc(a, b) {
      return b.Name.localeCompare(a.Name);
    }

    this.setState({
      users: users.sort(this.state.name ? sortStrByNameAsc : sortStrByNameDesc),
      name: !this.state.name,
    });
  };

  handleClickSortNip = () => {
    const users = this.state.users;

    function sortByNipAsc(a, b) {
      return a.NIP - b.NIP;
    }

    function sortByNipDesc(a, b) {
      return b.NIP - a.NIP;
    }

    this.setState({
      users: users.sort(this.state.nip ? sortByNipAsc : sortByNipDesc),
      nip: !this.state.nip,
    });
  };

  handleClickSortValue = () => {
    const users = this.state.users;

    function sortByValueAsc(a, b) {
      return a.Value - b.Value;
    }

    function sortByValueDesc(a, b) {
      return b.Value - a.Value;
    }

    this.setState({
      users: users.sort(this.state.value ? sortByValueAsc : sortByValueDesc),
      value: !this.state.value,
    });
  };

  handleClickSortDate = () => {
    const users = this.state.users;

    function sortStrByDateAsc(a, b) {
      return a.Date.slice(0, 10).localeCompare(b.Date.slice(0, 10));
    }

    function sortStrByDateDesc(a, b) {
      return b.Date.slice(0, 10).localeCompare(a.Date.slice(0, 10));
    }

    this.setState({
      users: users.sort(this.state.date ? sortStrByDateAsc : sortStrByDateDesc),
      date: !this.state.date,
    });
  };

  render() {
    const { blur, preloader, error, errorCode, users } = this.state;
    return (
      <>
        <div className={blur ? "blur" : null}>
          {preloader ? <div className="preloader"></div> : null}
          {error ? <div className="error">{errorCode}</div> : null}
          <Navbar post={this.postAPI} />
          <Main
            users={users}
            clickSortName={this.handleClickSortName}
            clickSortNip={this.handleClickSortNip}
            clickSortValue={this.handleClickSortValue}
            clickSortDate={this.handleClickSortDate}
          />
        </div>
      </>
    );
  }
}
export default App;
