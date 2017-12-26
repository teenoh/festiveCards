import React, { Component } from "react";
import fonts from "./fonts";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      color: "#ffffff",
      font: "TrajanBold",
      dimension: {
        width: 0,
        height: 0
      }
    };
  }

  componentDidMount() {
    const deviceWidth = window.innerWidth;
    const width = Math.min(400, deviceWidth - 40);
    const height = Math.min(400, deviceWidth - 40);
    const newDimension = { width: width, height: height };
    console.log(newDimension);

    this.setState({ dimension: newDimension });
  }

  renderCanvas = e => {
    e.preventDefault();
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
    ctx.font = `2em ${this.state.font}`;
    ctx.fillStyle = this.state.color;
    ctx.lineJoin = "round";
    ctx.fillText(textValue, parseInt(offsetX), parseInt(offsetY + 20));

    var download = document.getElementById("download-link");
    let link = document.createElement("a");
    link.download = `${this.state.username}_festive_image.png`;
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  renderImage = () => {};

  render() {
    const { width, height } = this.state.dimension;
    return (
      <section>
        <div>
          Enter your name:
          <input
            id="user-input"
            type="text"
            name="username"
            maxLength={9}
            onChange={this.handleChange}
            value={this.state.username}
            placeholder="Bobo"
          />
          <br />
          <div style={{ textAlign: "center" }}>
            <span>
              Choose color:
              <input
                id="color-input"
                type="color"
                name="color"
                onChange={this.handleChange}
                value={this.state.color}
              />
            </span>

            <span>
              Select Font :
              <select
                name="font"
                onChange={this.handleChange}
                value={this.state.font}
              >
                {fonts.map((font, id) => (
                  <option value={font.value} style={{ fontFamily: font.value }}>
                    {font.name}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>
        <div className="container" style={{ width, height }}>
          <img
            id="festive-image"
            src={require("../assets/images/festive_card1.png")}
            alt="festive"
            style={{ width: "inherit", height: "inherit" }}
          />
          <p
            id="imageText"
            style={{ color: this.state.color, fontFamily: this.state.font }}
          >
            {this.state.username || "bobo"}
          </p>
        </div>
        <div>
          <a id="download-link" onClick={this.renderCanvas} href="">
            Download Image
          </a>
        </div>
        <canvas
          id="canvas"
          width={`${width}px`}
          height={`${height}px`}
          hidden
        />
      </section>
    );
  }
}
