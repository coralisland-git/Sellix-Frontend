import React, { Component } from 'react'
import {connect} from 'react-redux'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from 'components/reactstrap'
import { bindActionCreators } from 'redux'
import { AuthActions } from 'services/global'
import './style.scss'
import sellix_logo from 'assets/images/Sellix_logo.svg'


const userId = window.localStorage.getItem('userId')

class Header extends Component {

  signOut = () => {
    this.props.logOut()
    this.props.history.push('/auth/login')
  }

  render() {
    const { profile, is_authed, history } = this.props

    return (
      <React.Fragment>
        <a href="/" className="logo"><img src={sellix_logo} alt='Sellix Logo'/></a>
        <Nav className="ml-auto shop-header" navbar style={{flex:1, justifyContent: 'flex-end'}}>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle className="user-name" nav>
              <div>
                {profile && profile.profile_attachment?
                  <img src={profile.profile_attachment} className="mt-2" width="45" height="45" style={{borderRadius: '50%'}} alt={"Logo"}/>:
                  <i className="fas fa-user-circle text-primary avatar-icon"/>
                }
              </div>
            </DropdownToggle>
            {
                is_authed? 
                  <DropdownMenu right className="mt-4">
                    {
                      profile && profile.rank !== "0" && <DropdownItem onClick={() => history.push(`/admin/dashboard`)}>
                        <i className={"far fa-circle fa-md"} /> Admin Panel
                      </DropdownItem>
                    }
                    <DropdownItem onClick={() => this.props.history.push(`/dashboard/${userId}`)}>
                      <i className={"far fa-circle fa-md"} /> Dashboard
                    </DropdownItem>
                    <DropdownItem className={'active'} onClick={() => this.props.history.push(`/${userId}`)}>
                      <i className={"far fa-dot-circle fa-md"} /> Your Shop
                    </DropdownItem>
                    <DropdownItem onClick={() => this.props.history.push(`/settings/${userId}`)}>
                      <i className={"far fa-circle fa-md"} /> Settings
                    </DropdownItem>
                    
                    <DropdownItem onClick={() => this.signOut()}>
                      <i className={"far fa-circle fa-md"} /> Sign Out
                    </DropdownItem>
                  </DropdownMenu>:
                  <DropdownMenu right className="mt-2">
                    <DropdownItem onClick={() => this.props.history.push(`/auth/login`)}>
                      Log In
                    </DropdownItem>
                  </DropdownMenu>
              }
            
          </UncontrolledDropdown>
          
        </Nav>
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  logOut: bindActionCreators(AuthActions.logOut, dispatch)
})

export default connect(null, mapDispatchToProps)(Header)
