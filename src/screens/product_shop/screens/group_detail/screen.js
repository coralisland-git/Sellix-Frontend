import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { converter } from 'constants/config'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { CommonActions } from 'services/global'
import { Loader, Affix } from 'components'
import ShopProductDetail from '../detail/screen'
import { Loading } from 'components'
import { api } from 'utils'
import Select from 'react-select'
import { getProductStock } from 'screens/product_shop/productCard';
import config from 'constants/config';


const mapStateToProps = ({ common: { user_products } }) => ({
  user_products
});

const mapDispatchToProps = dispatch => ({
  commonActions: bindActionCreators(CommonActions, dispatch)
});


class ShopGroupDetail extends React.Component {

  state = {
    loading: true,
    selectedProduct: null,
    group: null
  }

  componentDidMount() {
    let data = {
      method: 'GET',
      url: `groups/unique/${this.props.match.params.id}`
    }

    return api(data).then(res => {
      if (res.status === 200) {
        this.setState({
          loading: false,
          group: res.data.group,
          selectedProduct: res.data.group.products_bound[0]
        })
      } else {
        throw res
      }     
    }).catch(err => {
      throw err
    })
  }

  formatProductOption = product => {
    const rating = product.average_score || 0

    const isRatingGold = rating > 4 

    return <div className="option-select-option">
      <div>
        <span>{product.title}</span>
        <span className={isRatingGold && "text-gold"} style={{marginLeft: '10px'}}>
          <span className={isRatingGold && "text-gold"} style={{fontSize: '18px', position: 'relative'}}>⭑</span>
        {rating.toFixed(2)}</span>
      </div>
      <div style={{margin: '2px 0'}}>
        <span className="price">{`${config.CURRENCY_LIST[product.currency]}${product.price_display}`}</span>
        <span style={{fontSize: '6px', position: 'relative', top: '-3px', marginLeft: '5px', marginRight: '5px'}}>
          {'  ●  '}
        </span>
        <span className="stock">
            <span className="stock-size" style={getProductStock(product) === '∞' ? { position: 'relative', top: '1px' } : getProductStock(product) == 0?{color:'red'}:{}}>{getProductStock(product)}</span>
            {' '}in stock
        </span>
      </div>
    </div>
  }

  render() {

    const { loading, selectedProduct, group } = this.state
    let { history } = this.props;

    return loading ? Loading() : (
      <div>
        <style>
          {`
          .text-gold {
            color: gold !important;
          }
          .option-select, .option-select * {
            user-select: none !important;
          }
          .option-select > * > * > * {
            background: white !important;
          }
          // .option-select-option:hover {
          //   background: rgba(0,0,0,.1);
          //   margin: 0;
          // }
          `}
        </style>
        <div style={{filter: 'blur(10px)'}}>
          <ShopProductDetail {...this.props} selectedProduct={selectedProduct} group={group}
          handleProductChange={product => []/*this.setState({ selectedProduct: product })*/} />
        </div>
        <div>
          <Modal isOpen={true} className="blur" centered={true}>
            <ModalHeader><span>{group.title}</span></ModalHeader>
            <ModalBody>
              <p>Select option:</p>
              <Select 
                defaultValue={group.products_bound[0]}
                formatOptionLabel={this.formatProductOption}
                options={group.products_bound}
                className="option-select"
                onChange={product => this.setState({ selectedProduct: product})}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => history.push(`/product/${selectedProduct.uniqid}`)}>Next</Button>{' '}
              <Button color="secondary" onClick={() => history.push(`/${selectedProduct.username}`)}>Go Back</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopGroupDetail)
