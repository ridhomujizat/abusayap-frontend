import React, { Component } from 'react'
import './Contact.css'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Form, Spinner, Button } from 'react-bootstrap'
import FormSearch from '../Form/FormSearch'
import CardContact from '../CardContact'
import qs from 'querystring'

import { connect } from 'react-redux'
import { contact, contactNew } from '../../redux/action/user'
import { selectReceiver } from '../../redux/action/transaction'

class index extends Component {
  state = {
    isLoading: false,
    message: '',
    icSort: 'up'
  }
  async componentDidMount () {
    const { token } = this.props.auth
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    await this.props.contactNew(token, query)
  }
  changeText = async (event) => {
    const { token } = this.props.auth
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    await this.setState({ isLoading: true })
    delete query.page
    if (event.target.value) {
      query.search = event.target.value
    } else {
      delete query.search
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
    await this.props.contactNew(token, query)
    await this.setState({ isLoading: false })
  }
  order = async (value) => {
    const { token } = this.props.auth
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    await this.setState({ isLoading: true })
    if (this.state.icSort === 'down') {
      await this.setState({ icSort: 'up' })
      query.sort = value
      query.order = 'DESC'
    } else {
      await this.setState({ icSort: 'down' })
      query.sort = value
      query.order = 'ASC'
    }
    await this.props.history.push({
      search: qs.stringify(query)
    })
    await this.props.contactNew(token, query)
    await this.setState({ isLoading: false })
  }
  next = async () => {
    const { token } = this.props.auth
    const { pageInfo } = this.props.user
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    delete query.page
    if (pageInfo.nextLink) {
      await this.setState({ isLoading: true })
      query.page = pageInfo.currentPage + 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      await this.props.contactNew(token, query)
      await this.setState({ isLoading: false })
    }
  }
  prev = async () => {
    const { token } = this.props.auth
    const { pageInfo } = this.props.user
    const { search } = this.props.location
    const query = qs.parse(search.replace('?', ''))
    if (pageInfo.prevLink) {
      await this.setState({ isLoading: true })
      query.page = pageInfo.currentPage - 1
      await this.props.history.push({
        search: qs.stringify(query)
      })
      await this.props.contactNew(token, query)
      await this.setState({ isLoading: false })
    }
  }
  goToTransaction = async (value) => {
    await this.props.selectReceiver(value)
    this.props.history.push('/home-page/contact/input-amount')
  }
  render () {
    return (
      <Container fluid className="ContactContainer">
        <Row>
          <Col>
            <div className="ContacTitle">Search Receiver
            <i className={`fa fa-sort-${this.state.icSort}`} style={{ cursor: 'pointer' }} onClick={() => { this.order('firstname') }} />
            </div>
            <Form className="my-3">
              <FormSearch group="searchIcon" type="text" name="search" onChange={(event) => this.changeText(event)} placeholder="Search receiver here">
                <i className="fa fa-search" aria-hidden="true"></i>
              </FormSearch>
            </Form>
            <div>
              {this.state.isLoading
                ? (<div className="spinner"><Spinner animation="border" variant="success" /></div>)
                : this.props.user.contact && this.props.user.contact.map(item => {
                  return (
                    <CardContact key={String(item.id)} data={item} onClick={() => this.goToTransaction(item)} />
                  )
                })
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.user.pageInfo && (
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-300-12">
                  {`Total data ${this.props.user.contact ? this.props.user.pageInfo.totalData : '0'}`}
                </div>
                <div>
                  <Button className="btn outline-primary mr-3" onClick={this.prev}
                    disabled={!this.props.user.pageInfo.prevLink}
                  >Prev Link</Button>
                  <Button className="btn outline-primary" onClick={this.next}
                    disabled={!this.props.user.pageInfo.nextLink}
                  >Next Link</Button>
                </div>
                <div className="text-300-12">
                  {`Current Page ${this.props.user.pageInfo.currentPage} Total Page ${this.props.user.contact ? this.props.user.pageInfo.totalPage : '0'}`}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

const mapDispatchToProps = { contact, selectReceiver, contactNew }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))
