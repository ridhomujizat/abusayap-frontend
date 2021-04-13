import React, { Component } from 'react'
import { Col, Row, Container, Form, Spinner, Alert } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import LeftAuth from '../components/LeftAuth'
import FormInput from '../components/Form/FormInput'

import { connect } from 'react-redux'
import { resetPassword } from '../redux/action/auth'

class CreateNewPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    message: '',
    isLoading: false
  }
  changeText = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  resetPassword = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    const { password, confirmPassword } = this.state
    if (password === confirmPassword) {
      await this.props.resetPassword(this.props.token, password)
      if (this.props.auth.errorMsg === '') {
        this.setState({ isLoading: false })
        this.props.history.push('/login?success=true')
      } else {
        this.setState({ isLoading: false })
        this.setState({ message: this.props.auth.errorMsg })
      }
    } else {
      this.setState({ isLoading: false })
      this.setState({ message: 'The password you entered does not match' })
    }
  }
  render () {
    return (
      <Row className="container-fluid">
        <Col md={7} className="d-none d-md-block auth-img p-5">
          <LeftAuth />
        </Col>
        <Col md={5} className="p-5">
          <Container>
            <p className="text-display-xs-bold">Did You Forgot Your Password?
            Don’t Worry, You Can Reset Your
Password In a Minutes.</p>
            <p>
              Now you can create a new password for your Zwallet account. Type your password twice so we can confirm your new passsword.</p>
            {this.state.message !== '' && <Alert variant="danger">{this.state.message}</Alert>}
            <Form onSubmit={this.resetPassword}>
              <FormInput div="py-3" group="inputWithIcon" type="password" name="password" onChange={(event) => this.changeText(event)} placeholder="Enter your password">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </FormInput>
              <FormInput div="pb-5" group="inputWithIcon" type="password" name="confirmPassword" onChange={(event) => this.changeText(event)} placeholder="Enter your password">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </FormInput>
              {this.state.isLoading === false
                ? <ButtonCustom block type="submit" >Reset Password</ButtonCustom>
                : (<div className="text-center"><Spinner animation="border" variant="success" /></div>)}
            </Form>
          </Container>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { resetPassword }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateNewPassword))
