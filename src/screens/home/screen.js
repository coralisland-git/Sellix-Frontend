import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Col,
  Container,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import {
  AppHeader
} from '@coreui/react'

import './style.scss'

import {
  Loading
} from 'components'

import service1 from 'assets/images/home/service1.svg'
import service2 from 'assets/images/home/service2.svg'
import service3 from 'assets/images/home/service3.svg'
import background1 from 'assets/images/home/BG@2x.png'
import background2 from 'assets/images/home/Bg2@2x.png'

import bottom_isometric from 'assets/images/home/Bottom_Isometric.svg'
import Hero_Iphone_Mockup from 'assets/images/home/Hero_Iphone_Mockup.svg'
import Reliable_Payment from 'assets/images/home/Reliable_Payment.svg'

class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const { isOpen } = this.state

    return (
      <div className="home-screen" style={{backgroundImage: "url(" + background1 + ")"}}>

        
        <div className="section" style={{paddingTop: 0, paddingBottom: 50}}>
          <Container className="home-container p-0" fluid>
            <Row className="flex-row">
              <Col md={7} className="mb-3" style={{paddingTop: '10%'}}>
                <h1 className="text-white">Sell Digital Goods Online</h1>
                <p className="large pr-3 text-white col-lg-8 p-0">
                E-commerce is easy with Sellix. Create your own online store with a couple of clicks.
                </p>
                <Button className="landing-primary-button f-20 f-b"><NavLink className="p-0 text-white" href="/auth/register">Get Started for Free</NavLink></Button>
              </Col>
              <Col md={5} className="text-center">
                <img src={Hero_Iphone_Mockup} className="digital-img"/>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="background2-img" style={{backgroundImage: "url(" + background2 + ")"}}>
          <div className="section pt-0 pb-5 text-center">
            <Container className="home-container" fluid>
              <h1 className="text-pink">Start selling with Sellix</h1>
              <p className="large text-darkgrey">
                Put the ability to create a full customizable online storefront right at your fingertips
              </p>
              <Row className="mt-5 pt-4">
                <Col md={4} className="p-0">
                  <div className="service-card service-card-shadow zindex-2 m-2">
                    <img className="service-img" src={service1}/>
                    <h4 className="mt-4 text-pink f-b">Customizable Shop</h4>
                    <p className="small text-pink">
                    Our platforms offers coupons, blacklist, tickets, automated delivery, webhooks and many more features that you can fully customize for your needs.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="p-0">
                  <div className="service-card service-card-shadow zindex-3 m-2">
                    <img className="service-img" src={service2}/>
                    <h4 className="mt-4 text-pink f-b">Payment Flexibility</h4>
                    <p className="small text-pink">
                    Looking for a specific type of payment option? Don't look further. We provide PayPal, Stripe, PerfectMoney and every popular cryptocurrencie for your store.
                    </p>
                    <p className="text-pink f-b mt-5"><Link to="/fees" className="text-pink">Fees →</Link></p>
                  </div>
                </Col>
                <Col md={4} className="p-0">
                  <div className="service-card service-card-shadow zindex-2 m-2">
                    <img className="service-img" src={service3}/>
                    <h4 className="mt-4 text-pink f-b">All-in-One Platform</h4>
                    <p className="small text-pink">
                    With Sellix you got everything in one platform. Statistics about your online store and features make sure you know everything about your orders.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="section" style={{paddingBottom: 100, paddingTop: 150}}>
            <Container className="p-0" fluid>
              <Row className="flex-row align-items-center" style={{position: 'relative'}}>
                
                <Col md={5} className="mb-3">
                  <div className="float-right" style={{maxWidth: 450}}>
                    <h1 className="text-pink">Reliable Payment Processing</h1>
                    <p className="text-pink f-20">
                    Sellix uses the newest payment processing technologies to ensure your payment gets processed with the lowest cost of transaction fees at any time.
                    </p>
                  </div>
                  
                </Col>
                <Col md={7} className="text-right" style={{position: 'relative'}}>
                  <img className="undraw-img" src={Reliable_Payment}/>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="section pt-5 payment-fee">
            <Container className="p-0" fluid style={{maxWidth: 1330}}>
              <Row className="flex-row align-items-center">
                <Col md={7}>
                  <img className="pc-img" src={bottom_isometric}/>
                </Col>
                <Col md={5}>
                  <div className="float-left pb-3" style={{maxWidth: 447}}>
                    <h2 className="text-pink">Cheap Payment Fees</h2>
                    <p className="text-pink f-20 col-11 p-0">
                    We provide very low fees for each transaction. With our unique payment processing method, we keep transaction fees at the lowest amount. Find out more about our fees.
                    </p>
                    <Button className="landing-primary-button"><NavLink className="p-0 text-white mb-1" href="/fees">Our  Fees →</NavLink></Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

        </div>
        
        <div className="section white text-center" style={{paddingBottom: 125}}>
          <Container className="mr-auto ml-auto p-0 purple" fluid style={{maxWidth: 1330}}>
            <h1 className="mb-4">Start using <b>Sellix</b> now!</h1>
            <p className="mr-auto ml-auto f-20 col-lg-4 col-md-5">Create an account and start selling your products. Are you ready? Because we are.</p>
            <Button className="landing-secondary-button f-20"><NavLink className="p-0" href="/auth/register">Get Started →</NavLink></Button>
          </Container>
        </div>
      </div>
    )
  }
}

export default Home
