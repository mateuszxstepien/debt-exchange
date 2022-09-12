import React from "react";
import "../Styles/Main.css";

const Main = (props) => {
  const users = props.users.map((user) => (
    <tr className="line" key={user.Id}>
      <td>
        <span className="mobile-head">dłużnik</span>
        {user.Name}
      </td>
      <td>
        <span className="mobile-head">nip</span>
        {user.NIP}
      </td>
      <td>
        <span className="mobile-head">kwota zadłużenia</span>
        {user.Value}
      </td>
      <td>
        <span className="mobile-head">data powstania zobowiązania</span>
        {user.Date.slice(8, 10)}-{user.Date.slice(5, 7)}-{user.Date.slice(0, 4)}
      </td>
    </tr>
  ));

  return (
    <div className="main">
      <table>
        <thead>
          <tr className="tr">
            <th>
              <i className="sort" onClick={props.click}>
                dłużnik ▼
              </i>
            </th>
            <th>nip</th>
            <th>kwota zadłużenia</th>
            <th>data powstania zobowiązania</th>
          </tr>
        </thead>
        <tbody>{users}</tbody>
      </table>
    </div>
  );
};

export default Main;
