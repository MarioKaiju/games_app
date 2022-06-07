import NavBar from "./NavBar";
import styled from "styled-components"

const Container = styled.div`
  margin: 50px 5%;
`;

const Template = ({ user, children }) => {
  return (
    <>
    <NavBar user={user} />
    <Container >
      { children }
    </Container>
    </>
  );
}

export default Template