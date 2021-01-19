import React, { Component } from 'react'

export default class YachtForm extends Component {

    
  render() {
    const { name, length, reg_num, sailboat, marina, marinas, handleNewYacht, handleChange } = this.props
    const marinaItems = marinas.map((marina) => {
      console.log(marina)
      return <option value={marina.name} name={marina.name} key={marina.id}>{marina.name}</option>
    })
    return (
      <div>
      <form>
        <div className="field">
          <label className="label">Yacht Name</label>
          <div className="control">
            <input type="text" className="input" value={name} name="name" onChange={handleChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">Length Overall</label>
          <div className="control">
            <input type="number" className="input" value={length} name="length" onChange={handleChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">Registration Number</label>
          <div className="control">
            <input type="text" className="input" value={reg_num} name="reg_num" onChange={handleChange}/>
          </div>
        </div>
        <div className="field">
          <div className="control">
          <label className="checkbox">
             Sailboat?
            <input type="checkbox" value={sailboat} name="sailboat" onChange={handleChange}/> 
          </label>
          </div>
        </div>
        <div className="field">
          <label className="label">Select Marina</label>
          <div className="control">
            <div className="select">
              <select value={marina} name="marina" onChange={handleChange}>
                {marinaItems}
              </select>
            </div>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type='button' className="button is-link" onClick={handleNewYacht} value="submit">Submit</button>
          </div>
          <div className="control">
            <button type='button' className="button is-link is-light" onClick={handleNewYacht} value="cancel">Cancel</button>
          </div>
        </div>
      </form>      
    </div>
    )
  }
}

