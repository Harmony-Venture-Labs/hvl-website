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
  job.innerHTML = `<a class="list-item"">
    <div style="display: grid;">
      <div class="item-title" style="font-weight: 600;">
        ${title}
      </div>
      <div style="text-decoration: none !important; display: inline-block; style="font-weight: normal;">
        ${location}
      </div>
    </div>
    <div style="text-decoration: none !important; display: inline-block; style="font-weight: normal;">
      ${company}
    </div>
  </a>`
  list.appendChild(job);
}

{/* <div id="grnhse_app" style="row-gap: 20px; display: grid; width: 100%; max-width: 800px;"></div>
<script src="https://harmony-venture-labs.github.io/hvl-website/hvl-site.js"></script> */}
window.onload = () => {
  const sel = document.createElement("select");
  sel.innerHTML = `
    <option>hvl</option>
    <option>trustspot</option>
    <option>copysmith</option>
  `;
  sel.style = `
    width: 200px;
  `
  sel.value = (new URLSearchParams(window.location.search)).get("c") || 'hvl'
  sel.onchange = (e) => {
    const url = (new URLSearchParams(window.location.search))
    url.set('c', (e.target.value));
    window.location.href = url === 'hvl' ? `?${url}` : ''
  }
  const list = document.getElementById("grnhse_app")
  list.appendChild(sel);
}

const getJobs = async () => {
  const loc = (new URLSearchParams(window.location.search)).get("c")

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
    default:
      jobs.copysmith = await fetch("https://boards-api.greenhouse.io/v1/boards/copysmith/jobs?content=true").then(re => re.json());
      jobs.hvl = await fetch("https://boards-api.greenhouse.io/v1/boards/harmonyventurelabs/jobs?content=true").then(re => re.json());
      jobs.trustspot = await fetch("https://boards-api.greenhouse.io/v1/boards/trustspot/jobs?content=true").then(re => re.json());
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
  const style = document.createElement('style');
  style.innerHTML = `
    .list-item {
      display: flex;
      justify-content: space-between;
      color: #292d2e !important;
      text-decoration: unset;
    }

    .list-item:hover .item-title {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style)
}

getJobs()