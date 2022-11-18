import { useState } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

function Chart({ chartData }) {
  const [data, setData] = useState({
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        backgroundColor: 'rgba(255, 70, 109, 0.2)',
      },
    ],
  })

  const [options, setOptions] = useState({
    animation: false,
    aspectRatio: 3,
  })

  return <Radar data={data} options={options} />
}

export default Chart
