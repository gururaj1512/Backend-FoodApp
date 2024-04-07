import React from 'react'
import Logo from '../images/logo.jpg'

const Planitem = (props) => {
  
  const { plan } = props;
  return (
    <div>
      <div className="card" style={{width: '17rem', margin: '30px 30px'}}>
        <img src={Logo} className="card-img-top" alt="Image" />
        <div className="card-body">
          <h5 className="card-title">{plan.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Avg Rating : {Math.round(plan.avgRating*100)/100}</li>
          <li className="list-group-item">Discount : {plan.discount}</li>
          <li className="list-group-item">Price : {plan.price}</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    </div>
  )
}

export default Planitem
