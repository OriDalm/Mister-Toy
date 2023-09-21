import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Doughnut, PolarArea } from 'react-chartjs-2'
import { toyService } from '../services/toy.service'
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function LabelsChart() {
  const [labelCounts, setLabelCounts] = useState([])

  useEffect(() => {
    const fetchLabelCounts = async () => {
      const labelCounts = await toyService.getLabelCounts()
      setLabelCounts(labelCounts)
    }

    fetchLabelCounts()
  }, [])

  const data = {
    labels: labelCounts.map((labelCount) => labelCount.label),
    datasets: [
      {
        label: '# of Toys',
        data: labelCounts.map((labelCount) => labelCount.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <section style={{ margin: 'auto', position: 'relative', height: '40vh', width: '80vw' }}>
      <Doughnut data={data} />
    </section>
  )
}
