// const fetch = require("node-fetch");
const jobs = {}

const addJob = (title, location, url, company) => {
  const job = document.createElement('div')
  const list = document.getElementById("grnhse_app")
  job.onclick = () => {
    window.location.href = url
  }

  job.style = `
    cursor: pointer;
  `
  job.innerHTML = `<a class="list-item">
    <div style="display: grid;">
      <div class="item-title" style="font-weight: 600;">
        ${title}
      </div>
      <div style="text-decoration: none !important; display: inline-block;">
        ${location}
      </div>
    </div>
    <div style="text-decoration: none !important; display: inline-block;">
      ${company}
    </div>
  </a>`
  list.appendChild(job);
}

const getJobs = async () => {
  jobs.copysmith = await fetch("https://boards-api.greenhouse.io/v1/boards/copysmith/jobs?content=true").then(re => re.json())
  jobs.hvl = await fetch("https://boards-api.greenhouse.io/v1/boards/harmonyventurelabs/jobs?content=true").then(re => re.json())
  jobs.trustspot = await fetch("https://boards-api.greenhouse.io/v1/boards/trustspot/jobs?content=true").then(re => re.json())
  jobs.copysmith.jobs.map(job => {
    addJob(job.title, job.location.name, job.absolute_url, 'Copysmith');
  });
  jobs.hvl.jobs.map(job => {
    addJob(job.title, job.location.name, job.absolute_url, 'Harmony Venture Labs');
  });
  jobs.trustspot.jobs.map(job => {
    addJob(job.title, job.location.name, job.absolute_url, 'TrustSpot');
  });
  const style = document.createElement('style');
  style.innerHTML = `
    .list-item:hover .item-title {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style)
  console.log(jobs)
}

getJobs()