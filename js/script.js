// Profile Information Element
const overview = document.querySelector('.overview'),
      repoList = document.querySelector('.repo-list'),
      repos = document.querySelector('.repos'),
      repoData = document.querySelector('.repo-data');

// GitHub Username
const username = 'kpersaud-dev';

// Fetch GitHub Profile

const fetchProfile = async () => {
  // Fetch username data
  const res = await fetch(`https://api.github.com/users/${username}`);
  //Convert to JSON
  const data = await res.json();
  console.log(data);

  // Call Display Info Function
  displayInfo(data);

}

fetchProfile();

// Display User Information

const displayInfo = async jsonData => {
  // Create div for user info
  const userInfo = document.createElement('div');
  //Populate user info div with data
  userInfo.innerHTML = `
    <figure>
      <img alt="user avatar" src=${jsonData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${jsonData.name}</p>
      <p><strong>Bio:</strong> ${jsonData.bio}</p>
      <p><strong>Location:</strong> ${jsonData.location}</p>
      <p><strong>Number of public repos:</strong> ${jsonData.public_repos}</p>
    </div>
  `;
  // Append Div
  overview.append(userInfo);
}

// Fetch Repos

const fetchRepos = async () => {
  // Sort by recently updated and display 100 per page
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  // Convert to JSON
  const repoData = await res.json();
  // Call Display Repos function
  displayRepos(repoData);
}

// Display Repo Information

const displayRepos = repos => {
  // For Each Repo, create list item and append
  for(let repo of repos) {
    const li = document.createElement('li');
    li.classList.add('repo');
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
}

fetchRepos();

// Event Listeners

// Target Repos

repoList.addEventListener('click', function(e) {
  if(e.target.matches('h3')) {
    let repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
})

// Get Specific Repo Information
const getRepoInfo = async repoName => {
  const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await res.json();
  console.log(repoInfo);
  // Fetch Language Data
  const fetchLanguages = await fetch(repoInfo.languages_url);
  //Convert to JSON
  const languageData = await fetchLanguages.json();
  // Add languages to empty array
  let languages = [];
  // Loop through languages
  for(let language in languageData) {
    languages.push(language);
  }
  // Call Display Repo Function
  displayRepoInfo(repoInfo, languages);
}

// Display Specific Repo Information
const displayRepoInfo = (repoInfo, languages) => {
  repoData.innerHTML = "";
  // Unhide repo-data element
  repoData.classList.remove('hide');
  // Hide repos element
  repos.classList.add('hide');
  //Create New Repo Div
  const newRepo = document.createElement('div');
  // Info to Display
  newRepo.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  // Append Repo Div
  repoData.append(newRepo);
  
}