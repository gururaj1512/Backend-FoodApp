import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import homepageImage from '../images/Homepage.jpg';
import planContext from '../context/plans/planContext'
import Planitem from './Planitem';

const Home = (props) => {

  let navigate = useNavigate()
  const { top3Plans, getTopThreePlans } = useContext(planContext);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getTopThreePlans()
    } else {
      navigate("/login");
    }
  }, [])

  return (
    <div>
      <div style={{paddingTop: '65px'}}>
        <img src={homepageImage} alt="" />
      </div>
      <div id='top3Plans' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', margin:'50px'}}>
        {top3Plans.map((plan) => {
          return <Planitem key={plan._id} plan={plan} />
        })}
      </div>
    </div>
  )
}

export default Home