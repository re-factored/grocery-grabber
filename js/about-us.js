const url = 'https://api.github.com/users/';
const apiKey = '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'
const teamMembers = ['donnaada', 'tbsharkey', 'MRGrant82', 'Coff23'];

//DOM Elements
const cards = document.getElementById('profileCards');


teamMembers.forEach(person => {
  async function getProfile() {

  let response = await fetch(url + person);
  let data = await response.json();
  let cardEl = document.createElement('div');
  cardEl.classList.add('teamCard');

  //badges from https://shields.io/#your-badge
  cardEl.innerHTML = `
    <img class="profilePic" src="${data.avatar_url}">

    <div class="profileInfo">
      <a  href="${data.html_url}" target="_blank" rel="noopener noreferrer">
        <h2 class="profileName">${data.name}</h2>
      </a>
     
      <p class="bio">${data.bio}</p>

      <div class="badges">
      <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">
        <img class="gitHub-Badge" src="https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white" alt="github badge">
      </a>

      <a href="https://github.com/${data.login}?tab=followers">
        <img class="gitHubFollowers" alt="GitHub followers" src="https://img.shields.io/github/followers/${data.login}?">
      </a>
      
      <a href="https://github.com/${data.login}?tab=repositories">
        <img class="pubRepoCount" src="https://img.shields.io/static/v1?label=Public%20Repos&message=${data.public_repos}&color=#e5e5e5">
      </a>
    </div>
      
    </div>
  `

  cards.appendChild(cardEl);
  }
  // console.log(data);
  // console.log(data.login);
  // console.log(data.avatar_url)
  
  // console.log(data.name);
  // console.log(data.bio);

  // cards.

      getProfile();
    });



