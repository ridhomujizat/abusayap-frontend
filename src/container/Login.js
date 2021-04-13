import React, { Component } from 'react'
import { Col, Row, Container, Form, Alert, Spinner } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import ButtonCustom from '../components/ButtonCustom'
import LeftAuth from '../components/LeftAuth'
import FormInput from '../components/Form/FormInput'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { connect } from 'react-redux'
import { login } from '../redux/action/auth'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required'),
  password: Yup.string()
    .min(8, '*Password must have at least 8 characters')
    .required('Password is required')
})

class Login extends Component {
  state = {
    message: '',
    isLoading: false
  }
  componentDidMount () {
    const query = this.props.location.search
    if (query.indexOf('success=true') !== -1) {
      this.setState({ message: 'Reset password success' })
    }
  }
  loginPush = async (values) => {
    this.setState({ isLoading: true })
    await this.props.login(values.email, values.password)
    if (this.props.auth.token) {
      if (this.props.auth.user.role === 1) {
        if (this.props.location.state === undefined) {
          await this.setState({ isLoading: false })
          return this.props.history.push('/admin')
        } else {
          await this.setState({ isLoading: false })
          return this.props.history.push((this.props.location.state.from && this.props.location.state.from.pathname))
        }
      } else {
        if (this.props.location.state === undefined) {
          await this.setState({ isLoading: false })
          return this.props.history.push('/home-page')
        } else {
          return this.props.history.push((this.props.location.state.from && this.props.location.state.from.pathname))
        }
      }
    } else {
      this.setState({ isLoading: false })
      this.setState({ message: this.props.auth.errorMsg })
    }
  }
  render () {
    return (
      <div className='container-fluid'>
        <Row>
          <Col md={7} className="d-none d-md-block auth-img p-5">
            <LeftAuth />
          </Col>
          <Col md={5} className="p-5">
            <Container>
              <p className="text-display-xs-bold">Start Accessing Banking Needs
              With All Devices and All Platforms
              With 30.000+ Users</p>
              <p>
                Transfering money is eassier than ever, you can access Abusayap wherever you are.
                Desktop, laptop, mobile phone? we cover all of that for you!
            </p>
              {this.state.message !== '' && <Alert variant={this.state.message.indexOf('success') !== -1 ? 'success' : 'danger'}>{this.state.message}</Alert>}
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true)
                  resetForm()
                  setSubmitting(false)
                  this.loginPush(values)
                }}
              >
                {(
                  {
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormInput div="py-3" type='email' placeholder="Enter your e-mail"
                      controlId="validationFormik01"
                      group={`inputWithIcon ${touched.email && errors.email ? 'error' : null}`}
                      name='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      isValid={touched.email && !errors.email}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                      </svg>
                      {touched.email && errors.email
                        ? (<div className="error-message" style={{ color: 'red' }}>{errors.email}</div>)
                        : null}
                    </FormInput>
                    <FormInput type="password" placeholder="Enter your password"
                      group={`inputWithIcon ${touched.password && errors.password ? 'error' : null}`}
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isValid={touched.password && !errors.password}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                      {touched.password && errors.password
                        ? (<div className="error-message" style={{ color: 'red' }}>{errors.password}</div>)
                        : null}
                    </FormInput>
                    <Link to='/reset-password' className="float-right text-secondary text-link-xs pb-5">Forgot password?</Link>
                    {this.state.isLoading === false
                      ? <ButtonCustom block className="btn-custom" type="submit" disabled={isSubmitting}>Login</ButtonCustom>
                      : (<div className="text-center"><Spinner animation="border" variant="success" /></div>)}
                    <p className="text-center pt-4">Don’t have an account? Let’s <Link to='/sign-up'><b>Sign Up</b></Link> </p>
                  </Form>
                )}
              </Formik>
            </Container>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
