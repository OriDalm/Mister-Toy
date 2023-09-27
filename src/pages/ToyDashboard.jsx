import React from 'react'
import { PriceChart } from '../cmps/PriceChart'
import { LabelsChart } from '../cmps/LabelsChart'
import { VerticalChart } from '../cmps/VerticalChart'
import { Profit } from '../cmps/Profit'
import { Invoices } from '../cmps/Invoices'

export function ToyDashboard() {
  return (
    <div className='charts-container'>
      <Profit />
      <VerticalChart />
      <PriceChart />
      <LabelsChart />
      <Invoices />
    </div>
  )
}
