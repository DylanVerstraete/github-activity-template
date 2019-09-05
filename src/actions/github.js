import axios from "axios"
import moment from 'moment'
const { CLIENT_ID, CLIENT_SECRET } = process.env
const RootGithubAPIurl = "https://api.github.com"

function GetAllRepos () {
  return axios.get(RootGithubAPIurl + `/orgs/threefoldtech/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`).then((res => {
    return res.data
  }))
}

function GetCommitsForRepo (repo) {
  const from = moment().startOf('year');
  const until = moment()
  return axios.get(RootGithubAPIurl + `/repos/threefoldtech/${repo}/commits?since=${from}&until=${until}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`).then((res => {
    return res.data
  }))
}

export {
  GetAllRepos,
  GetCommitsForRepo
}
