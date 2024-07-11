import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Item from "../Item/Item";
import Button from "react-bootstrap/Button";
import { ShopContext } from "../../Context/ShopContext";
import config from "../../config";

const Popular = () => {
  // BaseURL
  const url = config.url;

  const [popular, setPopular] = useState([]);
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    fetch(url + "/popularInEducation")
      .then((res) => res.json())
      .then((data) => setPopular(data));
  }, []);

  return (
    <Container>
      <h2 className="mt-5 mb-4">Popular</h2>
      <Row>
        {popular.map((book) => {
          return (
            <Col md="3" key={book.id} className="mb-5">
              <Item
                id={book.id}
                name={book.name}
                image={book.image}
                newPrice={book.newPrice}
                oldPrice={book.oldPrice}
              />
              <Button
                variant="primary"
                onClick={() => {
                  addToCart(book.id);
                }}
                className="mt-3"
              >
                Add To Cart
              </Button>{" "}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Popular;
