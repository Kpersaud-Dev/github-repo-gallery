// Profile Information Element
const overview = document.querySelector('.overview');

// GitHub Username
const username = 'kpersaud-dev';

// Fetch GitHub Profile

const fetchProfile = async () => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  console.log(data);

  // Call Display Info Function
  displayInfo(data);
}

fetchProfile();

// Display User Information

const displayInfo = async (jsonData) => {
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

