import React from 'react'

export default function MarinaProducts({marina, user, productList, history, handleSelectedProduct}) {
  const marinaProductList = productList.filter(p => p.user_id === user.id).map(product => {
    return <article className="media" key={product.id}>
            <div className="media-content">
              <div className="content">
                <p>Marina: {marina.name}</p><br/>
                <p>Product Name: {product.name}</p><br/>
                <p>Product Description: {product.description}</p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item button is-info" onClick={() => {
                    handleSelectedProduct(product)
                    return history.push('/prices')}}>View Prices</a>
                  <a className="level-item button is-danger" onClick={() => {
                  }
                    }>Delete Product</a>
                </div>
              </nav>
            </div>
          </article>
  })
  return (
    <div className='column'>
      {marinaProductList}
    </div>
  )
}
