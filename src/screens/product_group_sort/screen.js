import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import config from 'constants/config'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Input
} from 'reactstrap'
import { Loader, Spin } from 'components'
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import {
  CommonActions,
} from 'services/global'
import ProductCard from "../product_shop/productCard"
import VirtualDraggableGrid from 'react-virtual-draggable-grid';
import { DragAndDropGrid } from '../product_sort/dragAndDropGrid2'
import * as ProductGroupActions from '../product_group/actions'


import * as ProductGroupSortActions from './actions'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
    all_product_groups: state.product_group.all_product_groups
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
		productGroupActions: bindActionCreators(ProductGroupActions, dispatch),
		actions: bindActionCreators(ProductGroupSortActions, dispatch)
  })
}

const ProductGroupCardExtended = ({ group }) => (
    <div style={{ background: 'white', marginRight: '15px', marginLeft: '15px', borderRadius: '5px'}} 
         className="product-card-extended">
      <Card className="bg-white p-0 product-card">
            <div style={{ minHeight: 150, width: '100%' }}>
                {group.image_attachment && <img src={config.API_ROOT_URL + '/attachments/image/' + group.image_attachment} alt={group.title} />}
            </div>
            
            <div className="p-3 d-flex flex-column h-100">
                <h5 className="mb-1 text-black">{group.title}</h5>
            </div> 
        </Card>
    </div>
)

class Product extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      saving: false,
      product_groups: []
    }

    this.initializeData = this.initializeData.bind(this)
    this.handleRLDDChange = this.handleRLDDChange.bind(this);
  }

  componentDidMount () {
    this.initializeData()
  }

  async initializeData () {
    this.setState({ loading: true })
    this.props.productGroupActions.getProductGroupList().then(res => {
      this.setState({ product_groups: res.data.groups })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  saveOrder() {
    const order = this.state.product_groups.map(group => group.uniqid).join()

    this.setState({saving: true})
    this.props.actions.saveProductGroupOrder({
      groups_ids: order
    }).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      this.setState({ saving: false })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
      this.setState({ saving: false })
    })
  }

  handleRLDDChange(reorderedItems) {
    this.setState({ product_groups: reorderedItems });
  }

  render() {
    let { loading, product_groups, saving } = this.state
    
    return (
      <div className="productsort-screen">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Sort Groups</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                    <Button className="ml-3" color="primary" onClick={this.saveOrder.bind(this)} disabled={saving}>
                      {saving?<Spin/>:'Update Group Order'}</Button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <div>
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

                        <DragAndDropGrid
                            items={product_groups}
                            ItemComponent={ProductGroupCardExtended}
                            itemToProps={group => ({ group })}
                            handleChange={this.handleRLDDChange}
                         />
                      </div>
                    </Col>
                  </Row>
              }
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
