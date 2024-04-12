// Write your code here
import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {cowinVaccinationAgeDetails} = props

  return (
    <div className="vaccination-by-age-container">
      <h1 className="vaccination-by-age-heading">Vaccination by age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={cowinVaccinationAgeDetails}
          cx="50%"
          cy="40%"
          outerRadius="80%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fintSize: 12, fontFamily: 'Roboto', paddingTop: 20}}
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByAge
