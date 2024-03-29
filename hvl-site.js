// const fetch = require("node-fetch");
const jobs = {}

const container = document.getElementById("grnhse_app");
const inner = document.createElement("div");

inner.id = "grnhse_app_content";
inner.style = "row-gap: 20px; display: grid; width: 100%; max-width: 800px;";

const addJob = (title, location, url, company) => {
  const job = document.createElement('div');
  job.onclick = () => {
    window.location.href = url
  }

  job.style = `
    cursor: pointer;
  `
  job.innerHTML = `<a class="list-item"">
    <div class="job-details-container">
      <div class="item-title">
        ${title}
      </div>
      <div class="job-board-location-item">
        ${location}
      </div>
    </div>
    <div class="job-board-company-item">
      ${company}
    </div>
  </a>`
  inner.appendChild(job);

}

{/* <div id="grnhse_app" style="row-gap: 20px; display: grid; width: 100%; max-width: 800px;"></div>
<script src="https://harmony-venture-labs.github.io/hvl-website/hvl-site.js"></script> */}
window.onload = () => {
  const sel = document.createElement("select");
  sel.className = "portfolio-companies-job-board-filter"
  sel.innerHTML = `
    <option>all</option>
    <option>hvl</option>
    <option>trustspot</option>
    <option>copysmith</option>
    <option>prelaunchhvl</option>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    
   
  `;
  document.head.appendChild(style);
  sel.value = (new URLSearchParams(window.location.search)).get("c");
  sel.onchange = (e) => {
    const url = (new URLSearchParams(window.location.search));
    url.set('c', (e.target.value));
    window.history.pushState({}, '', `?${url}`);
    getJobs();
  }
  container.appendChild(sel);
  container.appendChild(inner);
}

const getJobs = async () => {
  const loc = (new URLSearchParams(window.location.search)).get("c");
  inner.innerHTML = "";
  jobs.copysmith = [];
  jobs.trustspot = [];
  jobs.hvl = [];
  jobs.prelaunchhvl = [];

  switch (loc) {
    case 'copysmith':
      jobs.copysmith = await fetch("https://boards-api.greenhouse.io/v1/boards/copysmith/jobs?content=true").then(re => re.json());
      break;
    case 'hvl':
      jobs.hvl = await fetch("https://boards-api.greenhouse.io/v1/boards/harmonyventurelabs/jobs?content=true").then(re => re.json());
      break;
    case 'trustspot':
      jobs.trustspot = await fetch("https://boards-api.greenhouse.io/v1/boards/trustspot/jobs?content=true").then(re => re.json());
      break;
    case 'prelaunchhvl':
      jobs.prelaunchhvl = await fetch("https://boards-api.greenhouse.io/v1/boards/prelaunchhvl/jobs?content=true").then(re => re.json());
      break;
    default:
      jobs.copysmith = await fetch("https://boards-api.greenhouse.io/v1/boards/copysmith/jobs?content=true").then(re => re.json());
      jobs.hvl = await fetch("https://boards-api.greenhouse.io/v1/boards/harmonyventurelabs/jobs?content=true").then(re => re.json());
      jobs.trustspot = await fetch("https://boards-api.greenhouse.io/v1/boards/trustspot/jobs?content=true").then(re => re.json());
      jobs.prelaunchhvl = await fetch("https://boards-api.greenhouse.io/v1/boards/prelaunchhvl/jobs?content=true").then(re => re.json());
  }

  jobs.hvl?.jobs?.map(job => {
    addJob(job.title, job.location.name, job.absolute_url, 'Harmony Venture Labs');
  });
  jobs.copysmith?.jobs?.map(job => {
    addJob(job.title, job.location.name, job.absolute_url, 'Copysmith');
  });
  jobs.trustspot?.jobs?.map(job => {
    addJob(job.title, job.location.name, job.absolute_url, 'TrustSpot');
  });
  jobs.prelaunchhvl?.jobs?.map(job => {
    addJob(job.title, job.location.name, job.absolute_url, 'Pre Launch HVL');
  });

}

getJobs()
