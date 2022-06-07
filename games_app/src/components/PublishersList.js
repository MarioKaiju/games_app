import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";

const PublishersListContainer = styled.div``;

const PublisherList = ({ user }) => {
  const [publishers, setPublishers] = useState(null)
  console.log(publishers)

  useEffect(() => {
    axios.get('api/publishers').then(publishers => setPublishers(publishers.data))
  }, []);

  if (publishers)
  return (
    <PublishersListContainer>
      {
        publishers.map((publisher, i) => (
          <div key={i}>
            <Link to={`/publishers/${publisher.name}`}>Distribuidor: {publisher.name}</Link>
            <p>Juegos: {publisher.games.length}</p>
          </div>
        ))
      }
    </PublishersListContainer>
  )

  return (null);
}


export default PublisherList