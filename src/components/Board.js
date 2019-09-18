import React, { Component } from 'react';
import Key from './Key';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5
  };

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      powerOn: false
    }
    this.handlePowerClick = this.handlePowerClick.bind(this);
  }

  /* create the board using props */
  createBoard() {
    const { nrows, ncols } = this.props;
    let board = new Array(nrows);

    for(let i = 0; i < nrows; i++) {
      board[i] =  new Array(ncols);
    }

    board[2][2] = "robot";

    return board;
  }

  /* build the table using the board */
  buildTable() {
    const { board } = this.state;
    const rows = board.length;
    let table = [];

    for(let i = 0; i < rows; i++) {
      const cols = board[i].length;
      let row = [];
      for(let j = 0; j < cols; j++) {
        let key = `${i}-${j}`;

        // when the position of the robot found, set robot to that position in the table.
        row.push(<td key={ key }>{ (board[i][j] === "robot") ? <div className="robo-container"><i className="robot fa fa-android" aria-label="robot"></i></div> : ""}</td>);
      }
      table.push(<tr key={ i }>{row}</tr>);
    }
    
    return table;
  }

  /* handle click event */
  handleClick(key) {
    if(this.state.powerOn) {
      let row, col;
      let { nrows, ncols } = this.props;

      // create a new board and remove the current position of the robot
      let board = this.state.board.map((rows, i) => {
        return rows.map((cell, j) => {
          if(cell) {
            row = i;
            col = j;
            return null;
          }
          return cell;
        })
      });

      let newRow, newCol;

      // set new row and col values depend on the arrow key
      if(key === "up") newRow = row - 1;
      if(key === "down") newRow = row + 1;
      if(key === "left") newCol = col - 1;
      if(key === "right") newCol = col + 1;

      // check if the row and col are inside the bounds and set the new position of the robot
      board[(newRow < nrows && newRow >= 0) ? newRow : row][(newCol < ncols && newCol >= 0) ? newCol : col] = "robot";

      this.setState({ ...this.state, board });
    }
  }

  /* power on and off the robot */
  handlePowerClick() {
    const powerOn = !this.state.powerOn;
    this.setState({ ...this.state, powerOn });
  }

  render() {
    return (
      <div className="Board">
        <table>
          <tbody>
            { this.buildTable() }
          </tbody>
        </table>
        <hr />
        <div className="keys-container">
          <div className="control-keys">
            <Key icon="fa fa-arrow-up" onClick={ this.handleClick.bind(this, "up") } />
            <div>
              <Key icon="fa fa-arrow-left" onClick={ this.handleClick.bind(this, "left") } />
              <Key icon={ "fa fa-stop"} /> 
              <Key icon="fa fa-arrow-right" onClick={ this.handleClick.bind(this, "right") } />     
            </div>
            <Key icon="fa fa-arrow-down" onClick={ this.handleClick.bind(this, "down") } />  
          </div>
          <div className="power-key">
            <Key icon={ `fa fa-power-off power ${(!this.state.powerOn) ? "powerOn" : "powerOff"}`} onClick={ this.handlePowerClick } />  
          </div>          
        </div>
      </div>
    );
  }
}

export default Board;
