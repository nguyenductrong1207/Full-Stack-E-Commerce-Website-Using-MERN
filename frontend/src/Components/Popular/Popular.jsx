import React, { useEffect, useState } from "react";
import "./Style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Item from "../Item/Item";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularInEducation")
      .then((res) => res.json())
      .then((data) => setPopular(data));
  }, []);

  return (
    <Container>
      <h2>Popular</h2>
      <Row>
        {popular.map((item, i) => {
          return (
            <Col>
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                newPrice={item.newPrice}
                oldPrice={item.oldPrice}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Popular;
