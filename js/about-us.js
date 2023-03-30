document.addEventListener("DOMContentLoaded", function() {
  const url = 'https://api.github.com/users/';
  const apiKey = 'SECRET_GROCERYGRABBER';
  const teamMembers = ['donnaada', 'tbsharkey', 'MRGrant82', 'Coff23'];
  const cards = document.getElementById('profileCards');

  teamMembers.forEach(async member => {
    let response = await fetch(url + member);
    let data = await response.json();
    let cardEl = document.createElement('div');
    cardEl.classList.add('teamCard');

    //badges from https://shields.io/#your-badge
    cardEl.innerHTML = `
      <img class="profilePic mb-2" src="${data.avatar_url}">
      <div class="profileInfo">
        <a class="link" href="${data.html_url}" target="_blank" rel="noopener noreferrer">
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
    `;
    cards.appendChild(cardEl);
  });
});