import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";

const PublishersListContainer = styled.div``;

const PublishersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: space-between;
  grid-auto-rows: 100px;
  margin-top: 25px;
  gap: 50px 20px;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.6);
    padding: 10px;
    border-radius: 10px;

    
    @media (max-width: 550px) {
      padding: 25px;
      border-radius: 25px;
    }

    p {
      font-size: 16px;
    }

    a {
      text-decoration: none;
      color: #187010;
      text-decoration: underline 0.15em rgba(0, 0, 0, 0);
      transition: text-decoration-color 300ms;
      @media (hover: hover) and (pointer: fine) {
        :hover {
          color: #27b71a;
          text-decoration-color: #27b71a;
        }
      }
    }
  }  
`;


const PublisherList = ({ user }) => {
  const [publishers, setPublishers] = useState(null)
  console.log(publishers)

  useEffect(() => {
    axios.get('api/publishers').then(publishers => setPublishers(publishers.data))
  }, []);

  if (publishers)
  return (
    <PublishersListContainer>
      <h2>Lista de distribuidores</h2>
      <PublishersContainer>
        {
          publishers.map((publisher, i) => (
            <div key={i}>
              <Link to={`/publishers/${publisher.name}`}>{publisher.name}</Link>
              <p>Juegos en la lista: {publisher.games.length}</p>
            </div>
          ))
        }
      </PublishersContainer>
    </PublishersListContainer>
  )

  return (null);
}


export default PublisherList