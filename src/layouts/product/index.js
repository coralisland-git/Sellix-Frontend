import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container } from 'reactstrap'
import {
  AppHeader,
  AppFooter
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'layouts/theme/theme'
import { GlobalStyles } from 'layouts/theme/global'

import { productRoutes } from 'routes'
import { AuthActions, CommonActions } from 'services/global'
import { Header, Loading } from 'components'


import './style.scss'


const mapStateToProps = (state) => {
  return ({
    version: state.common.version,
    is_authed: state.auth.is_authed,
    profile: state.auth.profile,
    theme: state.common.theme,
    user: state.common.general_info,
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    authActions: bindActionCreators(AuthActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class ProductLayout extends React.Component {

  componentDidMount () {

      document.title = `${this.props.user ? this.props.user.username ? this.props.user.username : '' : ''} Sellix - Products`;

      this.props.authActions.getSelfUser()
          .catch(err => {
            this.props.authActions.logOut()
          })
      const toastifyAlert = (status, message) => {
        if (!message) {
          message = 'Unexpected Error'
        }
        if (status === 'success') {
          toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else if (status === 'error') {
          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else if (status === 'warn') {
          toast.warn(message, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else if (status === 'info') {
          toast.info(message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      }
      this.props.commonActions.setTostifyAlertFunc(toastifyAlert)
  }

  render() {
    const theme = this.props.theme

    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
          <div className="admin-container">
            <div className="app">
              <AppHeader fixed className="border-bottom">
                <Suspense fallback={Loading()}>
                  <Header {...this.props} theme={theme} isShop={true}/>
                </Suspense>
              </AppHeader>
              
              <div className="app-body mt-5 pt-5">
                  <Container className="p-0" fluid>
                    <Suspense fallback={Loading()}>
                      <ToastContainer position="top-right" autoClose={5000} style={{ zIndex: 1999 }} />
                      <Switch>
                        {
                          productRoutes.map((prop, key) => {
                            if (prop.redirect)
                              return <Redirect from={prop.path} to={prop.pathTo} key={key} />
                            return (
                              <Route
                                path={prop.path}
                                component={prop.component}
                                key={key}
                              />
                            )
                          })
                        }
                      </Switch>
                    </Suspense>
                  </Container>
                </div>
                <AppFooter>
                  <p className="text-center text-grey footer-report py-4 m-0">
                      Copyright by Sellix.io - <a href="mailto:abuse@sellix.io">Report Abuse</a>
                  </p>
                </AppFooter>
            </div>
          </div>
      </ThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLayout)
