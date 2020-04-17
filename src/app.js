import React from 'react'

import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import { mainRoutes } from 'routes'
import { configureStore } from 'services'
import { Loading, NotFound } from 'components'
import 'app.scss'
import SingleLogo from './assets/images/single.png'

const hist = createBrowserHistory()
const store = configureStore()


export default class App extends React.Component {

  componentDidMount() {
    for(const elem of document.querySelectorAll('[putSinglePngHrefHere]')) {
      elem.href = SingleLogo
    }

    for(const elem of document.querySelectorAll('[putSinglePngContentHere]')) {
      elem.content = SingleLogo
    }
  }

  render () {
    
    return (
      <Provider store={store}>
        <Router history={hist}>
          <React.Suspense fallback={Loading()}>
            
            <Switch>
              
              {
                mainRoutes.map((prop, key) => {
                  return <Route path={prop.path} key={key} component={prop.component} exact={prop.exact}/>
                })
              }   
              <Route component={NotFound} />
            </Switch>
            
          </React.Suspense>
        </Router>
      </Provider>
    )
  }

}

