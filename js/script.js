// Profile Information Element
const overview = document.querySelector('.overview'),
      repoList = document.querySelector('.repo-list');

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
  displayRepos(repoData);
}

// Display Repo Information

const displayRepos = repos => {
  for(let repo of repos) {
    const li = document.createElement('li');
    li.classList.add('repo');
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
}

fetchRepos();

