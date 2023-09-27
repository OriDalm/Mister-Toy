import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function VerticalChart() {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Report',
      },
    },
  }

  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const data = {
    labels,
    datasets: [
      {
        label: 'Earnings',
        data: [1557, 830, 450, 1820, 2057, 5013, 4753],
        backgroundColor: 'rgba(65, 65, 209)',
      },
    ],
  }

  return (
    <section className='vertical-chart-container'>
      <Bar options={options} data={data} />
    </section>
  )
}
