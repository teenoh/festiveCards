import React, { Component } from "react";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      dimension: {
        width: 0,
        height: 0
      }
    };
  }

  componentDidMount() {
    const deviceWidth = window.innerWidth;
    const width = Math.min(400, deviceWidth - 20);
    const height = Math.min(400, deviceWidth - 20);
    const newDimension = { width: width, height: height };
    console.log(newDimension);

    this.setState({ dimension: newDimension });
  }

  renderCanvas = () => {
    let canvas = document.getElementById("canvas"),
      text = document.getElementById("imageText"),
      image = document.getElementById("festive-image"),
      ctx = canvas.getContext("2d");

    const { width, height } = this.state.dimension;

    ctx.clearRect(0, 0, width, height);

    ctx.drawImage(image, 0, 0, width, height);

    const textLocation = text.getBoundingClientRect();
    const imageLocation = image.getBoundingClientRect();
    const textValue = text.innerText || "bobo";

    const offsetX = textLocation.left - imageLocation.left;
    const offsetY = textLocation.top - imageLocation.top;

    ctx.lineWidth = 5;
    ctx.font = "2em TrajanBold";
    ctx.fillStyle = "whitesmoke";
    ctx.lineJoin = "round";
    ctx.fillText(textValue, parseInt(offsetX), parseInt(offsetY + 25));

    var download = document.getElementById("download-link")
    let link = document.createElement('a')
    link.download = `${this.state.username}_festive_image.png`
    link.href = canvas.toDataURL();
    link.click()
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  renderImage = () => {
  }

  render() {
    const { width, height } = this.state.dimension;
    return (
      <section>
        <div>
          Username:
          <input
            id="user-input"
            type="text"
            name="username"
            maxLength={9}
            onChange={this.handleChange}
            value={this.state.username}
            placeholder="Enter username"
          />
        </div>
        <div className="container" style={{ width, height }}>
          <img
            id="festive-image"
            src={require("../assets/images/festive_card1.png")}
            alt="festive"
            style={{ width: "inherit", height: "inherit" }}
          />
          <p id="imageText">{this.state.username || "bobo"}</p>
        </div>
        <div>
          <a id="download-link" onClick={this.renderCanvas} href="">
            Dowload Image
          </a>
        </div>
        <canvas id="canvas" width={`${width}px`} height={`${height}px`} hidden/>
      </section>
    );
  }
}
