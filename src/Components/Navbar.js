import React, { Component } from "react";
import "../Styles/Navbar.css";

class Navbar extends Component {
  state = {
    value: "",
    info: false,
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleClick = () => {
    if (this.state.value.length > 3) {
      this.setState({
        value: "",
        info: false,
      });
      this.props.post(this.state.value);
    } else {
      this.setState({
        info: true,
      });
    }
  };

  render() {
    const { value, info } = this.state;
    return (
      <>
        <div className="navbar">
          <p>podaj nip lub nazwę dłużnika</p>
          <input
            type="text"
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.handleClick();
              }
            }}
            onChange={this.handleChange}
          />
          <button typ="button" onClick={() => this.handleClick(value)}>
            szukaj
          </button>
          <p className="info">{info ? "Wpisz więcej niż 3 znaki" : null}</p>
        </div>
      </>
    );
  }
}

export default Navbar;
