import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

const options = {
  animation: false,
  aspectRatio: 3,
}

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

function Chart({ chartData }) {
  return <Radar data={chartData} options={options} />
}

export default Chart
