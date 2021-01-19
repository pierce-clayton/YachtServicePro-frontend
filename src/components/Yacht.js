import React from 'react'

export default function Yacht({yachts, marinas, handleEditYacht, handleSelectedYacht, history}) {
  const yachtMediaObjects = yachts.map(yacht => {
    return <article className="media" key={yacht.id}>
      <div className="media-content">
        <div className="content">
          <p>Yacht Name: {yacht.name}</p><br/>
          <p>Length: {yacht.length}</p><br/>
          <p>Sailboat: {yacht.sail ? "Yes": "No"}</p><br/>
          <p>Marina: {marinas.find(marina => marina.id === yacht.marina_id).name}</p><br/>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item button is-primary" onClick={() => {
              handleSelectedYacht(yacht)
              return history.push('/services')}}>Yacht Services</a>
            <a className="level-item button is-info" onClick={handleEditYacht}>Edit Yacht Details</a>
          </div>
        </nav>
      </div>
    </article>
  })
  return (
    <div>
      {yachtMediaObjects}
    </div>
  )
}
