import axios from "axios"
import moment from 'moment'

const RootGithubAPIurl = "https://api.github.com"

function GetAllRepos () {
  return axios.get(RootGithubAPIurl + `/orgs/threefoldtech/repos`).then((res => {
    return res.data
  }))
}

function GetCommitsForRepo (repo) {
  const from = moment().startOf('year');
  const until = moment()
  return axios.get(RootGithubAPIurl + `/repos/threefoldtech/${repo}/commits?since=${from}&until=${until}&per_page=150`).then((res => {
    return res.data
  }))
}

export {
  GetAllRepos,
  GetCommitsForRepo
}
