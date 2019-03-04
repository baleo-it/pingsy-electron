import React from "react"
import { ListGroup, ListGroupItem, Container, Row, Col, } from "shards-react"

const List = ({ items, removeFromList, }) => (
    <Container>
      <Row>
        <Col sm={12}>
          <ListGroup>
            { items.map(item => (
              <ListGroupItem key={item.id}>
                {item.name} <br />
                {item.url} <br />
                Status: {item.status} {item.status === 'online' && `- Response time ${item.responseTime}ms`}
                <button onClick={() => removeFromList(item.id)}>Remove</button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
)

export { List, }
