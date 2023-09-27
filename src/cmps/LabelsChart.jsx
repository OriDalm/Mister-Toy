import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Doughnut, PolarArea } from 'react-chartjs-2'
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function LabelsChart() {
  const data = {
    labels: ['Transactions', 'Payouts', 'Sales', 'Reports'],
    datasets: [
      {
        label: 'of Toys',
        data: [452, 412, 715, 128],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255',
          'rgba(255, 159, 64)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className='doughnut-chart-container flex'>
      <Doughnut data={data} />
      <p className='doughnut-text'>
        <span className='doughnut-profit'>+15%</span> Since last week
      </p>
    </div>
  )
}
