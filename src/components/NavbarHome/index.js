import React, { Component } from 'react'
import './NavbarHome.scss'
import { Navbar, Nav, Image, Container, DropdownButton } from 'react-bootstrap'
import logo from '../../assets/images/abusayap_primary_logo.png'
import defaultProfile from '../../assets/images/default-image.png'
import bell from '../../assets/icons/bell.png'
import CardNotif from '../CardNotif'
import { connect } from 'react-redux'
import { notification } from '../../redux/action/user'
const { REACT_APP_API_URL: API_URL } = process.env

class NavbarHome extends Component {
  state = {
    notification: true
  }
  render () {
    return (
      <Navbar className="nav-home">
        <Container>
          <Navbar.Brand>
            <Image src={logo} height={40} />
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link>
              <Image
                src={this.props.auth.user.picture ? `${API_URL}upload/profile/${this.props.auth.user.picture}` : defaultProfile}
                height={52}
                className="img-avatar"
              />
            </Nav.Link>
            <Nav.Link>
              <p className="m-0 text-phone-small">{`${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`}</p>
              <p className="m-0">{this.props.auth.user.phoneNumber !== null ? `+62 ${this.props.auth.user.phoneNumber}` : 'No PhoneNumber'}</p>
            </Nav.Link>
            <div>
              {this.props.user.notification &&
                <div className='reddot' ></div>}
              <DropdownButton
                onClick={() => this.props.notification(false)}
                menuAlign="right"
                title={<Image src={bell} height={24} />}
                variant="transparent"
                className="pt-3"
              >
                <CardNotif />
              </DropdownButton>
            </div>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})
const mapDispatchToProps = { notification }
export default connect(mapStateToProps, mapDispatchToProps)(NavbarHome)
