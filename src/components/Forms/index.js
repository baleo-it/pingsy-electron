import React from "react";
import { Form, FormInput, FormGroup, Button, Container, Row, Col, } from "shards-react";

const FormWebsite = ({ onSubmit, onInputChange, values, }) => (
    <Container>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col sm={3}>
            <FormGroup inline>
              <FormInput
                id="name"
                name="name"
                onChange={onInputChange}
                value={values.name}
                placeholder="Facebook"
                required
              />
            </FormGroup>
          </Col>
          <Col sm={5}>
            <FormGroup inline>
              <FormInput
                id="website"
                name="url"
                onChange={onInputChange}
                value={values.url}
                type="url"
                placeholder="https://www.facebook.com" 
                required
              />
            </FormGroup>
          </Col>
          <Col sm={4}>
            <Button
              type="submit"
              block
              outline
            >
              Add a new website
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
)

export { FormWebsite, }
