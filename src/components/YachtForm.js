import React, { Component } from 'react'

export default class YachtForm extends Component {

    
  render() {
    const { name, length, reg_num, sailboat, marina, marinas, handleNewYacht, handleChange, editForm } = this.props
    const marinaItems = marinas.map((marina) => {
      return <option value={marina.name} name={marina.name} key={marina.id}>{marina.name}</option>
    })
    return (
      <div className='column'>
      <form className='form'>
        <div className="field">
          <label className="label">Yacht Name</label>
          <div className="control">
            <input type="text" className="input" value={name} name="name" onChange={handleChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">Length Overall</label>
          <div className="control">
            {editForm ? <input type="number" className="input" value={length} name="length" onChange={handleChange} readOnly/> : <input type="number" className="input" value={length} name="length" onChange={handleChange} />}
          </div>
        </div>
        <div className="field">
          <label className="label">Registration Number</label>
          <div className="control">
            {editForm ? <input type="text" className="input" value={reg_num} name="reg_num" onChange={handleChange} readOnly/> : <input type="text" className="input" value={reg_num} name="reg_num" onChange={handleChange}/>}
          </div>
        </div>
        <div className="field">
          <div className="control">
          <label className="checkbox">
             Sailboat?
            {editForm ? <input type="checkbox" value={sailboat} name="sailboat" onChange={handleChange} readOnly/> : <input type="checkbox" value={sailboat} name="sailboat" onChange={handleChange}/>} 
          </label>
          </div>
        </div>
        <div className="field">
          <label className="label">Select Marina</label>
          <div className="control">
            <div className="select">
              <select value={marina} name="marina" onChange={handleChange}>
                <option value=''></option>
                {marinaItems}
              </select>
            </div>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type='button' className="button is-link" onClick={handleNewYacht} value={editForm ? "edit":"submit"}>{editForm ? "Edit":"Submit"}</button>
          </div>
          <div className="control">
            <button type='button' className="button is-link is-light" onClick={handleNewYacht} value={editForm ? "delete":"cancel"}>{editForm ? "Delete":"Cancel"}</button>
          </div>
        </div>
      </form>      
    </div>
    )
  }
}

