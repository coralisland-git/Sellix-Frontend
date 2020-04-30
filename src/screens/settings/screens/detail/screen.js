import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import *  as _ from 'lodash'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Formik } from 'formik'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { tableOptions } from 'constants/tableoptions'
import Select from 'react-select'
import { Loader } from 'components'
import {
  CommonActions
} from 'services/global'
import { getSettings } from '../../actions'
import {editSettings} from './actions'
// import {getUser} from './actions'


import './style.scss'

const mapStateToProps = (state) => {
  return ({
    settings: state.settings.settings
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators({ getSettings }, dispatch),
    editSettings: bindActionCreators({ editSettings }, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

const settingsData = [
  {label: 'Main Directory', key: 'main_directory'},
  {label: 'File Upload', key: 'file_upload'},
  {label: 'Change Address Bitcoin', key: 'change_address_bitcoin'},
  {label: 'Change Address Litecoin', key: 'change_address_litecoin'},
  {label: 'Site Address Bitcoin', key: 'site_address_bitcoin'},
  {label: 'Site Address Litecoin', key: 'site_address_litecoin'},
  {label: 'Site Address Ethereum', key: 'site_address_ethereum'},
  {label: 'Transaction Fee Bitcoin', key: 'transaction_fee_bitcoin'},
  {label: 'Transaction Fee Litecoin', key: 'transaction_fee_litecoin'},
  {label: 'Transaction Fee Ethereum', key: 'transaction_fee_ethereum'},
  {label: 'Transaction Expire', key: 'transaction_expire'},
  {label: 'Fee Fixed Bitcoin', key: 'fee_fixed_bitcoin'},
  {label: 'Fee Fixed Litecoin', key: 'fee_fixed_litecoin'},
  {label: 'Fee Fixed Ethereum', key: 'fee_fixed_ethereum'},
  {label: 'Fee Percentage', key: 'fee_percentage'}
]

class SettingsEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

  }

  componentDidMount(){
    this.props.actions.getSettings()
  }

  rednerSettingRow = (props) => {
    return _.map(settingsData, row => {
      return <Row>
      <Col lg={12}>
        <FormGroup className="mb-3">
          <Label htmlFor="product_code">{row.label}</Label>
          <div className="d-flex">
            <Input
              name={row.key}
              onChange={props.handleChange}
              value={props.values[row.key]}
            />
          </div>
        </FormGroup>
      </Col>
    </Row>
    })
  }

  handleSubmit(values) {
    this.setState({ loading: true })
    this.props.editSettings.editSettings(values).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      this.props.history.push({
        pathname: `/admin/settings`
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.message)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    const { loading } = this.state
    if(!this.props.settings){return null}
    return (
      <div className="product-screen mt-3">
        <div className="animated fadeIn">
          <Breadcrumb className="mb-0">
						<BreadcrumbItem active className="mb-0">
							<a onClick={(e) => this.props.history.goBack()}><i className="fas fa-chevron-left"/> Settings</a>
						</BreadcrumbItem>
					</Breadcrumb>
          <Formik
            initialValues={this.props.settings}
            enableReinitialize={true}
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}>{props => (
              <Form onSubmit={props.handleSubmit}>
                <Card>
                  <CardHeader>
                    <Row style={{ alignItems: 'center' }}>
                      <Col md={12}>
                        <h1>Edit Settings</h1>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="p-4 mb-5">
                    {
                      loading ?
                        <Row>
                          <Col lg={12}>
                            <Loader />
                          </Col>
                        </Row>
                        :
                        <Row className="mt-4 mb-4">
                          <Col lg={12}>
                            {this.rednerSettingRow(props)}
                          </Col>
                        </Row>
                    }
                  </CardBody>
                  <Button color="primary" className="" style={{ width: 200 }}>Save Settings</Button>
                </Card>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEdit)