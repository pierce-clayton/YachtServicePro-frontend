import React from 'react'

export default function YachtForm(props) {
  return (
    <div>
      <form onSubmit={handleNewYacht} >
        <div className="field">
          <label className="label">Yacht Name</label>
          <div className="control">
            <input type="text" className="input"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Length Overall</label>
          <div className="control">
            <input type="number" className="input"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Registration Number</label>
          <div className="control">
            <input type="text" className="input"/>
          </div>
        </div>
        <div className="field">
          <div className="control">
          <label className="checkbox">
            <input type="checkbox" >
              Sailboat?
            </input>
          </label>
          </div>
        </div>
        <div className="field">
          <label className="label">Select Marina</label>
          <div className="control">
            <div className="select">
              <select>
                <option>Oak Harbor</option>
                <option>Cap Sante</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>      
    </div>
  )
}
