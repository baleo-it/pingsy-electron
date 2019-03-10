import React, { Component } from 'react'
import { Container, Row, Col, } from 'shards-react'

import { Header } from './components/common/Header'
import { FormWebsite } from './components/Forms'
import { List, } from './components/Lists'
import { withWebsites } from './WebsitesProvider'

import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"
import './App.css'

const defaultWebsiteForm = {
  name: '',
  url: '',
}

class App extends Component {
  state = {
    websiteForm: defaultWebsiteForm,
  }

  onFormSubmit = e => {
    e.preventDefault()

    const { websiteForm, } = this.state
    const { addWebsite } = this.props

    // Add new website
    addWebsite({ ...websiteForm, })

    // Reset form
    this.setState({ websiteForm: defaultWebsiteForm, })
  }

  onFormInputChange = ({ target }) => {
    this.setState(prevState => ({
      websiteForm: {
        ...prevState.websiteForm,
        [target.name]: target.value,
      }
    }))
  }

  render() {
    const { websiteForm, } = this.state
    const { websites, removeWebsite, } = this.props

    return (
      <div className="App">
        <Header />

        <main>
          <Container>
            <Row>
              <Col sm={12}>
                <FormWebsite
                  onSubmit={this.onFormSubmit}
                  onInputChange={this.onFormInputChange}
                  values={websiteForm}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <List
                  items={websites}
                  removeFromList={removeWebsite}
                />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    )
  }
}

export default withWebsites(App)
