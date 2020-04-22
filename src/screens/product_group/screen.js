import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Input
} from 'reactstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Loader } from 'components'
import { confirmAlert } from 'react-confirm-alert'; 
import { tableOptions } from 'constants/tableoptions'
import config from 'constants/config'
import { CommonActions } from 'services/global'

import * as ProductGroupActions from './actions'
import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    all_product_groups: state.product_group.all_product_groups
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(ProductGroupActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}


const Confirm = ({ onClose, title, message, onDelete }) => {
  return <div className={"react-confirm-alert" + ` ${window.localStorage.getItem('theme') || 'light'}`}>
    <div className="react-confirm-alert-body">
      <h1>{title}</h1>
      <h3>{message}</h3>
      <div className="react-confirm-alert-button-group">
        <button onClick={() => {
          onDelete()
          onClose()
        }}>Yes, Delete it!</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  </div>
}

class ProductGroups extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      search_key: null
    }
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData = () => {
    this.setState({ loading: true })
    this.props.actions.getProductGroupList().catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  gotoEditPage = (e, id) => {
    this.props.history.push({
      pathname: `/dashboard/${user}/product-groups/all/edit/${id}`
    })
  }

  deleteProductGroup = (e, id) => {
    confirmAlert({
      title: "Are you sure?",
      message: "You want to delete this product group?",
      customUI:  (props) => <Confirm {...props} onDelete={this.onDeleteProductGroup(id)}/>
    });
  }

  renderProductInfo = (cell, row) => {
    if (
      row.title && row.uniqid
    ) {
      return (
        <div>
          <p>
            <a href={`/dashboard/${user}/product-groups/all/edit/${row.uniqid}`} >
              {row.title}
            </a>
          </p>
          <p className="caption">{row.uniqid}</p>
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderGroupTitle = (cell, row) => {
    if (
      row.title && row.uniqid
    ) {
      return (
        <div>
          <p>
            <a href={`/dashboard/${user}/product-groups/all/edit/${row.uniqid}`} >
              {row.title}
            </a>
          </p>
          <p className="caption">{row.uniqid}</p>
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  onDeleteProductGroup = (uniqid) => () => {
    this.setState({ loading: true })
    this.props.actions.deleteProductGroup({ uniqid })
        .then(res => {
          this.props.actions.getProductGroupList()
          this.props.commonActions.tostifyAlert('success', res.message)
        })
        .catch(err => {
          this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
        })
        .finally(() => {
          this.setState({ loading: false })
        })
  }

  renderProductType = (cell, row) => {
    if (
      row.type
    ) {
      return (
        <div className="badge badge-normal" style={{ margin: '0 auto'}}>
          {row.type}
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderProductPrice = (cell, row) => {
    return (
      <p>
        {config.CURRENCY_LIST[row.currency]}{row.price_display}
      </p>
    )  
  }

  renderFileStock = (cell, row) => {

      if(row.type === 'serials'){
        return <p>
          {row.stock}
         </p>
      }
      if(row.type === 'service'){
        if(row.service_stock === '-1'){
          return <p>
            <span style={{fontSize:  20}}>∞</span>
          </p>
        }
        if(row.service_stock != '-1'){
          return <p>
            {row.service_stock}
          </p>
        }
      }
      if(row.type === 'file'){
        if(row.file_stock === '-1'){
          return <p>
            <span style={{fontSize:  20}}>∞</span>
          </p>
        }
        if(row.file_stock != '-1'){
          return <p>
            {row.file_stock}
          </p>
        }
      }
  }

  renderOptions = (cell, row) => {
    return (
      <div className="d-flex actions">
        <a onClick={(e) => this.gotoEditPage(e, row.uniqid)}>
          <i className="fas fa-pen"/>
        </a>
        <a>
          <i className="fas fa-bar-chart"/>
        </a>
        <a onClick={(e) => this.deleteProductGroup(e, row.uniqid)}>
          <i className="fas fa-trash"/>
        </a>
      </div>
    )
  }

  searchProducts = (products) => {
    
    const { search_key } = this.state
    const search_fields = ['title']

    console.log('all prods', products)

    const data = products.filter(product => {
      for(let i=0; i<search_fields.length; i++)
        if(product[search_fields[i]] && product[search_fields[i]].includes(search_key))
          return true
      return false
    })

    return data
  }

  render() {
    const { loading, search_key } = this.state

    console.log(this.props.all_product_groups)

    const all_product_groups = search_key?this.searchProducts(this.props.all_product_groups):this.props.all_product_groups

    return (
      <div className="product-screen">
        <div className="animated fadeIn">
          <Card className="grey">
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Product Groups</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                    <div className="searchbar white">
                      <i className="fas fa-search"/>
                      <Input placeholder="Search..." 
                        className="header-search-input"
                        onChange={(e) => {
                          this.setState({search_key: e.target.value})
                        }}
                      />
                    </div>
                    <Button className="ml-3" color="primary" onClick={() => this.props.history.push(`/dashboard/${user}/product-groups/all/new`)}>
                      Add Product Group</Button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col lg={12}>
                      <div>
                        <BootstrapTable
                          options={ tableOptions() }
                          data={all_product_groups}
                          version="4"
                          pagination
                          totalSize={all_product_groups ? all_product_groups.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="uniqid"
                            dataFormat={this.renderGroupTitle}
                            dataSort
                            width='44%'
                          >
                            Info
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="products_count"
                            // dataFormat={this.renderGroupTitle}
                            dataSort
                            width='44%'
                          >
                            Products Count
                          </TableHeaderColumn>
                          {/* <TableHeaderColumn
                            dataField="type"
                            dataFormat={this.renderGroupProducts}
                            dataAlign="center"
                            dataSort
                            width='13%'
                          >
                            Type
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="file_stock"
                            dataSort
                            dataAlign="center"
                            dataFormat={this.renderFileStock}
                            width='13%'
                          >
                            Stock
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="price_display"
                            dataFormat={this.renderProductPrice}
                            dataSort
                            dataAlign="center"
                            width='13%'
                          >
                            Price
                          </TableHeaderColumn> */}
                          <TableHeaderColumn
                            dataField="id"
                            dataAlign="right"
                            width='17%'
                            dataFormat={this.renderOptions}
                          >
                            Options
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGroups)