import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, CardHeader, Row, Col } from 'reactstrap'
import { getUser, updateUser, banUser, unbanUser } from './actions'
import { CommonActions } from "../../../../services/global";
import UserEditForm from './form'
import UserProductsTable from './products'
import UserOrdersTable from './orders'
import UserIpsTable from './ips';
import { pick, mapValues, isEmpty} from "lodash";
import { withRouter } from "react-router-dom";

import './style.scss'

import { Button, Spin } from "../../../../components";






const mapStateToProps = ({ users: { user }}) => ({ user })
const mapDispatchToProps = (dispatch) => ({
  unbanUser: bindActionCreators(unbanUser, dispatch),
  banUser: bindActionCreators(banUser, dispatch),
  getUser: bindActionCreators(getUser, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  tostifyAlert: bindActionCreators(CommonActions.tostifyAlert, dispatch),
})

class User extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      userLoading: false,
    }
  }

  componentDidMount(){
    this.getUser()
  }

  getUser = () => {
    this.props.getUser(this.props.match.params.id)
  }


  handleSubmit = (values) => {
    this.setState({ userLoading: true })

    const { updateUser, tostifyAlert } = this.props;

    const dataForSend = pick(values, ['username', 'email', 'otp_2fa', 'email_2fa'])
    const correctFormatForSend = mapValues(dataForSend, data => data === true ? 1 : data === false ? 0 : data );

    updateUser(correctFormatForSend)
        .then(res => {
          this.getUser()
          tostifyAlert('success', res.message)
        })
        .catch(err => {
          tostifyAlert('error', err.error)
        })
        .finally(() => {
          this.setState({ userLoading: false })
        })
  }

  banUser = () => {
    const { user: { banned, id }, banUser, unbanUser, tostifyAlert } = this.props;

    if(banned === "0") {
      banUser(id)
          .then(res => {
            this.getUser()
            tostifyAlert('success', res.data.message)
          })
          .catch(res => {
            tostifyAlert('error', res.error)
          })
    } else {
      unbanUser(id)
          .then(res => {
            this.getUser()
            tostifyAlert('success', res.data.message)
          })
          .catch(res => {
            tostifyAlert('error', res.error)
          })
    }
  }


  render() {

    const { loading, userLoading } = this.state;
    const { user } = this.props;
    const { products, invoices, ips } = user;

    return (
      <div className="admin-edit-user-screen">
        <div className="animated fadeIn">
          <Card>
            <CardHeader style={{ height: "40px" }}>
              <Row>
                <Col lg={12}>
                  <div className="flex-wrapper align-items-center">
                    <h1 className={"title"}>User (ID: {user.id})</h1>
                  </div>
                </Col>
              </Row>
            </CardHeader>
          </Card>

          <Row>
            <Col lg={4} md={12} className="mx-auto">
              <Row>
                <Col lg={12} className={"mb-4"}>
                  <Button color="primary" type="submit" className="" style={{width: "100%"}} onClick={this.banUser}>
                    {loading ? <Spin/> : user.banned === "0" ? 'Bun user' : 'Unbun user'}
                  </Button>
                </Col>
              </Row>
              <UserEditForm user={user} loading={userLoading} handleSubmit={this.handleSubmit}/>
            </Col>

            <Col lg={8} md={12} className="mx-auto">
              <UserIpsTable ips={ips} loading={loading}/>
            </Col>
          </Row>

          <Row>
            <Col lg={12} className="mx-auto">
              <UserOrdersTable invoices={invoices} loading={loading} />
            </Col>
          </Row>

          <Row>
            <Col lg={12} className="mx-auto">
              <UserProductsTable products={products}/>
            </Col>
          </Row>

        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User))
