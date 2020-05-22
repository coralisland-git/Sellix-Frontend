import React from 'react'
import * as router from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserView, MobileView } from "react-device-detect";

import { Container, Collapse, NavbarToggler, Navbar, Row, Col } from 'components/reactstrap'
import AppSidebarNav from '@coreui/react/es/SidebarNav'
import AppSidebar from '@coreui/react/es/Sidebar'
import AppHeader from '@coreui/react/es/Header'

import { settingsRoutes } from 'routes'
import { AuthActions } from 'services/global'
import initComponent from '../index'

import {
  mainBrowserNavigation,
  mainMobileNavigation,
  accountSettingsNavigation,
  shopSettingsNavigation
} from 'constants/navigation'

import { Header, SetTitle } from 'components'

import './style.scss'




class SettingsLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      theme: window.localStorage.getItem('theme') || 'light',
      isOpen: false
    }
  }

  componentDidMount() {

    if (!window.localStorage.getItem('accessToken')) {
      this.props.history.push('/auth/login')
    } else {
      this.props.getSelfUser()
          .catch(err => {
            this.props.logOut()
            this.props.history.push('/auth/login')
          })
    }
  }


  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {

    const { isOpen, theme } = this.state

    return (
        <div className="admin-container">
          <div className="app">
            <AppHeader fixed className="border-bottom">
              <Header theme={theme} changeTheme={this.props.changeTheme} />
            </AppHeader>

            <div className="app-body">
              <AppSidebar fixed className="pt-3 mb-5" display="lg">
                <BrowserView>
                  <AppSidebarNav navConfig={mainBrowserNavigation()} location={this.props.location} router={router}/>
                </BrowserView>
                <MobileView>
                  <AppSidebarNav navConfig={mainMobileNavigation()} location={this.props.location} router={router}/>
                </MobileView>
              </AppSidebar>

              <main className="main mt-5 mb-5 settings-main">
                <Container fluid>

                  <Row>
                    <Col lg={3}>
                      <div>
                        <div className="settings-sidebar mb-4 mt-4 p-4">
                          <Navbar expand="xs" className="p-0">
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse className="mr-5" isOpen={isOpen} navbar>
                              <div>
                                <h4 style={{ color: 'black', fontSize: '16px' }}>Account</h4>
                                <AppSidebarNav navConfig={accountSettingsNavigation} location={this.props.location} router={router} />
                              </div>
                            </Collapse>
                          </Navbar>
                        </div>
                        <div className="settings-sidebar mb-4 mt-4 p-4">
                          <Navbar expand="xs" className="p-0">
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse className="mr-5" isOpen={isOpen} navbar>
                              <div>
                                <h4 style={{ color: 'black', fontSize: '16px' }}>Shop</h4>
                                <AppSidebarNav navConfig={shopSettingsNavigation} location={this.props.location} router={router} />
                              </div>
                            </Collapse>
                          </Navbar>
                        </div>
                      </div>
                    </Col>

                    <Col lg={9}>
                      <div className="p-0 mt-4">
                        <Switch>
                          {settingsRoutes.map(({ path, pathTo, redirect, title, component: Component }, key) =>
                              redirect ?
                                  <Redirect from={path} to={pathTo} key={key} /> :
                                      <Route path={path} render={(props) => <SetTitle title={title}><Component {...props} /></SetTitle>} key={key}/>
                          )}
                        </Switch>
                      </div>
                    </Col>
                  </Row>

                </Container>
              </main>
            </div>
          </div>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSelfUser: bindActionCreators(AuthActions.getSelfUser, dispatch),
  logOut: bindActionCreators(AuthActions.logOut, dispatch)
})

export default initComponent(connect(null, mapDispatchToProps)(SettingsLayout))
