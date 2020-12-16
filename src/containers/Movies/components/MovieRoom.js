import React from 'react';

function MovieRoom() {
  return (
    <div class="container">
      <div class="w3ls-reg">
        <div
          className="seatStructure txt-center"
          style={{ overflow: 'hidden' }}
        >
          <table id="seatsBlock">
            <tr>
              <td></td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td></td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
            </tr>
            <tr>
              <td>A</td>
              <td>
                <input type="checkbox" className="seats" value="A1"></input>
                <input type="checkbox" className="seats" value="A2"></input>
                <input type="checkbox" className="seats" value="A3"></input>
                <input type="checkbox" className="seats" value="A4"></input>
                <input type="checkbox" className="seats" value="A5"></input>
                <input type="checkbox" className="seats" value="A6"></input>
                <input type="checkbox" className="seats" value="A7"></input>
                <input type="checkbox" className="seats" value="A8"></input>
              </td>
            </tr>
            <tr>
              <td>B</td>
              <td>
                <input type="checkbox" className="seats" value="B1"></input>
                <input type="checkbox" className="seats" value="B2"></input>
                <input type="checkbox" className="seats" value="B3"></input>
                <input type="checkbox" className="seats" value="B4"></input>
                <input type="checkbox" className="seats" value="B5"></input>
                <input type="checkbox" className="seats" value="B6"></input>
                <input type="checkbox" className="seats" value="B7"></input>
                <input type="checkbox" className="seats" value="B8"></input>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MovieRoom;
