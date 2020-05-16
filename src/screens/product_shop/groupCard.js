import React from 'react'
import config from 'constants/config'
import { Card } from 'reactstrap';


const GroupCard = ({ group, preventDefault, onClick, center_group_titles }) => {

    let { image_attachment, title, products_bound } = group;

    const minPrice = Math.min(...products_bound.map(p => parseFloat(p.price_display)))
    const productWithMinPrice = products_bound.find(p => parseFloat(p.price_display) == minPrice) || {}

    return <Card className="bg-white p-0 product-card" onClick={() => preventDefault ? null : onClick && onClick()}>
            <div style={{ minHeight: 150, width: '100%' }}>
                {image_attachment && <img src={config.API_ROOT_URL + '/attachments/image/' + image_attachment} alt={title} />}
            </div>
            
            <div className="p-3 d-flex flex-column h-100">
                <h5 className={center_group_titles ? "mb-1 text-black text-center" : "mb-1 text-black"}>{title}</h5>
                <div className="d-flex justify-content-between mt-1">
                    <span>
                    <span className="stock">Starting at: </span>
                    <span className="price">{config.CURRENCY_LIST[productWithMinPrice.currency]}{productWithMinPrice.price_display}</span>
                    </span>
                    <span className="stock">
                        Group
                    </span>
                </div>
            </div> 
        </Card>
}

export default GroupCard;