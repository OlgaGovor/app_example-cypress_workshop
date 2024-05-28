import "./App.css";

import apiClient from "./http-common";

function App() {

  async function fillForm(result) {
    let i = result.data.results[0]
    document.getElementById("user_photo").getElementsByTagName("img")[0].src = i.picture.large;
    document.getElementById("user_value").innerHTML = i.name.first + " " + i.name.last;
    document.getElementById("user_email").innerHTML = "Email: " + i.email;
    let n = new Date(i.dob.date);
    document.getElementById("user_birthday").innerHTML = "Date of birth: " + n.getDate() + "/" + (n.getMonth() + 1) + "/"+ n.getFullYear();
    document.getElementById("user_address").innerHTML = "Address: " + i.location.street.number + " " + i.location.street.name;
    document.getElementById("user_phone").innerHTML = "Phone number: " + i.cell;
    document.getElementById("user_password").innerHTML = "Password: " + i.login.password;
    document.getElementById("user_gender").innerHTML = "Gender: " + i.gender;
  }

  async function generateNewUser() {
    try {
      const res = await apiClient.get("/");
      await fillForm(res);
    } catch (err) {}
  }

  async function generateNewMale() {
    try {
      const res = await apiClient.get("/?gender=male");
      await fillForm(res);
    } catch (err) {}
  }

  async function generateNewFemale() {
    try {
      const res = await apiClient.get("/?gender=female");
      await fillForm(res);
    } catch (err) {}
  }

  async function clearOutput() {
    document.getElementById("user_photo").getElementsByTagName("img")[0].src = "https://upload.wikimedia.org/wikipedia/commons/3/35/Orange_question_mark.svg";
    document.getElementById("user_value").innerHTML = '...';
    document.getElementById("user_email").innerHTML = '...';
    document.getElementById("user_birthday").innerHTML = '...';
    document.getElementById("user_address").innerHTML = '...';
    document.getElementById("user_phone").innerHTML = '...';
    document.getElementById("user_password").innerHTML = '...';
  }

  return (
    <div id="app" className="container my-3">
      <div className="card mt-3">
        <div className="card-header">App example - Cypress workshop</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={generateNewUser}>Generate new user</button>
            <button className="btn btn-sm btn-primary" onClick={generateNewMale}>Generate new male</button>
            <button className="btn btn-sm btn-primary" onClick={generateNewFemale}>Generate new female</button>
            <button className="btn btn-sm btn-warning ml-2" onClick={clearOutput}>Clear</button>
          </div>

        </div>
      </div>
      <div className="card">
        <div className="details">
          <div className="user_photo horizontal_center" id="user_photo">
            <img alt="question mark" src="https://upload.wikimedia.org/wikipedia/commons/3/35/Orange_question_mark.svg"/>
          </div>
          <p id="user_title">Hi, My name is</p>
          <p id="user_value">...</p>
          <p id="user_email">...</p>
          <p id="user_birthday">...</p>
          <p id="user_address">...</p>
          <p id="user_phone">...</p>
          <p id="user_password">...</p>
          <p id="user_gender">...</p>
        </div>
      </div>
    </div>
  );
}


export default App;
