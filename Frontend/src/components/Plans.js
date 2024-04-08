import React, { useContext, useEffect } from 'react'
import planContext from '../context/plans/planContext';
import Planitem from './Planitem';

const Plans = (props) => {

  const { allPlans, getPlans } = useContext(planContext);
  useEffect(() => {
    getPlans()
  }, [])

  return (
    <div className='container' style={{overflowY: 'hidden'}}>
      <div className='' style={{ display: 'flex', flexDirection: 'row' ,paddingTop: '50px'}}>
        {allPlans.map((plan) => {
          return <Planitem key={plan._id} plan={plan} />
        })}
      </div>
    </div>
  )
}

export default Plans
