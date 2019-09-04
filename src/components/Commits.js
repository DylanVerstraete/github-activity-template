import React, { Component } from 'react'
import { BarChart, CartesianGrid, XAxis, Tooltip, Bar, Legend, YAxis } from 'recharts'
import { GetAllRepos, GetCommitsForRepo } from '../actions/github'
import { groupBy, merge, flatten, map } from 'lodash'
import moment from 'moment'

export default class Commits extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  async componentDidMount () {
    const repos = await GetAllRepos()
    const x = repos.map(d => {
      return GetCommitsForRepo(d.name).then(res => {
        console.log(res)
        return groupBy(res, (result) => moment(result.commit.author.date).month() + 1)
      })
    })
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    const allCommitsPerMonth = [[], [], [], [], [], [], [], [], [], [], [], [], []]
    const allCommitsTheseMonth = []
    const currentMonth = moment().month()
    const values = await Promise.all(x)
    console.log(values)

    values.map(v => {
      months.map(month => {
        if (v[month]) {
          allCommitsPerMonth[month].push(v[month])
        }
      })
      if (v[currentMonth]) {
        allCommitsTheseMonth.push(v[currentMonth])
      }
    })

    const flattened = allCommitsPerMonth.map((x, idx) => {
      return {
        commits: flatten(x).length,
        name: `month ${idx}`
      }
    })

    this.setState({ data: flattened })
  }

  render () {
    const { data } = this.state
    if (data) {
      return (
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="commits" fill="#8884d8" />
        </BarChart>
      )
    }
  }
}