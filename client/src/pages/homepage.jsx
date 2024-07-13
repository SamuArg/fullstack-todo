import Header from "../components/Header";
import Todos from "../components/Todos";
import styled from "styled-components";
const Homepage = () => {
  return (
    <Div className="pt-4 bg-gradient">
      <Header />
      <Todos />
    </Div>
  );
};

const Div = styled.div`
  background-color: #bde0fe;
  min-height: 100vh;
`;

export default Homepage;
