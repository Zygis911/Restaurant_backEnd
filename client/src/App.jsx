import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import RegisterForm from "./component/RegisterForm";
import LoginForm from "./component/LoginForm";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Register</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<RegisterForm />} />
      </Routes>

    </Router>
  );
}

export default App;