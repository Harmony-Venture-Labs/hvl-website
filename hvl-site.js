// const fetch = require("node-fetch");
const jobs = {}

const addJob = (title, location, url, company) => {
  const job = document.createElement('div')
  const list = document.getElementById("grnhse_app")
  job.innerHTML = `<section class="list-item">
  <div>
    <a href="${url}">
      ${title}
    </a>
    <div>
      ${location}
    </div>
  </div>
  <div>
    ${company}
  </div>
</section>`
  list.appendChild(job);

}

const getJobs = async () => {
  jobs.copysmith = await fetch("https://boards-api.greenhouse.io/v1/boards/copysmith/jobs").then(re => re.json())
  jobs.hvl = await fetch("https://boards-api.greenhouse.io/v1/boards/harmonyventurelabs/jobs").then(re => re.json())
  jobs.copysmith.jobs.map(job => {
    addJob(job.title, job.location.name, job.absolute_url, 'Copysmith');
  })
}

getJobs()