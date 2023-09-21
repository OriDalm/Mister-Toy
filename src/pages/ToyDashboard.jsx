import React from 'react'
import { PriceChart } from '../cmps/PriceChart'
import { LabelsChart } from '../cmps/LabelsChart'

export function ToyDashboard() {
  return (
    <div className='charts-container flex'>
      <PriceChart />
      <LabelsChart />
    </div>
  )
}
