// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, cowinVaccinationData: {}}

  componentDidMount() {
    this.getCowinVaccinationData()
  }

  getCowinVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
   

    const response = await fetch(apiUrl)
    if (response.ok) {
      const responseData = await response.json()
      const updatedData = {
        last7DaysVaccintion: responseData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: responseData.vaccination_by_age.map(
          eachDateRange => ({
            age: eachDateRange.age,
            count: eachDateRange.count,
          }),
        ),
        vaccinationByGender: responseData.vaccination_by_gender.map(
          eachGender => ({
            count: eachGender.count,
            gender: eachGender.gender,
          }),
        ),
      }
      this.setState({
        cowinVaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInProgressView = () => (
    <div data-testid="loader" className="loader-spinner-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {cowinVaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          cowinVaccinationCoverageDetails={
            cowinVaccinationData.last7DaysVaccintion
          }
        />
        <VaccinationByGender
          cowinVaccinationGenderDetails={
            cowinVaccinationData.vaccinationByGender
          }
        />
        <VaccinationByAge
          cowinVaccinationAgeDetails={cowinVaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderApiStatusesViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-vaccination-app-container">
        <div className="cowin-vaccination-content">
          <div className="logo-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          {this.renderApiStatusesViews()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
