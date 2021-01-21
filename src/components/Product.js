import React from 'react'

export default function Product({customer, yacht, marinas, products}) {
  const productList = products.map(product => {
    return <article className="media" key={yacht.id}>
    <div className="media-content">
      <div className="content">
        <p>Product Name: {product.name}</p><br/>
        <p>Description: {product.description}</p><br/>
        <p>Marina: {marinas.find(marina => marina.id === yacht.marina_id).name}</p><br/>
      </div>
      <nav className="level is-mobile">
        <div className="level-left">
          <a className="level-item button is-primary" onClick={() => {}}>Buy One Time</a>
          <a className="level-item button is-info" onClick={() => {}}>Subscribe for regular service</a>
        </div>
      </nav>
    </div>
  </article>
  })
  return (
    <div>
      {productList}
    </div>
  )
}
