import React, { useState } from 'react'
import PlanContext from './planContext'

const PlanState = (props) => { 
    const host = "http://localhost:5000"
    const plansInitial = []
    const [allPlans, setAllPlans] = useState(plansInitial)
    const [top3Plans, setTop3Plans] = useState(plansInitial)
    // const [userPlan, setUserPlan] = useState(plansInitial)

    const getPlans = async () => {
        // API Call 
        const response = await fetch(`${host}/plans/allPlans`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json()
        setAllPlans(json)
    }

    const getTopThreePlans = async () => {
        // API Call 
        const response = await fetch(`${host}/plans/topPlans`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json()
        setTop3Plans(json)
    }

    // const getUserPlan = async () => {
    //   const response = await fetch(`${host}/plans/plan/${id}`, {
    //     method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //   })
    //   const json = await response.json()
    //   setUserPlan(json)
    // }

    return (
        <PlanContext.Provider value={{ allPlans, getPlans, top3Plans, getTopThreePlans}}>
            {props.children}
        </PlanContext.Provider>
    )
}

export default PlanState
