import { useNavigate } from "react-router-dom";
import { logUserOut } from "../apollo";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut(navigate)}>logout</button>
    </div>
  );
};

export default Home;
