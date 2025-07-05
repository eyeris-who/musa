import axios from "axios";

export default function Home() {
  axios.post('api/user', {
    access_token: localStorage.getItem('access_token'),
  })
    .then(response => {
      // get user data and display it
      const user = response.data;
      console.log('User data:', user);
      document.querySelector('.pfp').src = user.images[0].url;
      document.querySelector('.profile h1').textContent = user.display_name;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      // Handle error, e.g., redirect to login
    });
  
  axios.post('api/artists', {
    access_token: localStorage.getItem('access_token'),
    time_range: 'short_term',
    limit: 3,
    offset: 0
  })
    .then(response => {
      // get artists data and display it
      const artists = response.data.items;
      console.log('Artists data:', artists);

      if (artists[0]?.images[0]?.url) {
        document.querySelector('.pfp1').src = artists[0].images[0].url;
      }
      if (artists[1]?.images[0]?.url) {
        document.querySelector('.pfp2').src = artists[1].images[0].url;
      }
      if (artists[2]?.images[0]?.url) {
        document.querySelector('.pfp3').src = artists[2].images[0].url;
      }
    })
    .catch(error => {
      console.error('Error fetching artists data:', error);
      // Handle error, e.g., redirect to login
    }
  )

  return (
    <div className="home">
      <div className="profile">
        <div className="pfp-container">
          <img className="pfp" src="" alt="Profile" />
          <img className="pfp1" />
          <img className="pfp2" />
          <img className="pfp3" />
        </div>
        <div className="profile-info">
          <h1></h1>
          <h2>THIS MONTH:</h2>
          <p>Minutes Listened: </p>
          <p>Number of Songs: </p>
          <p>Number of Artists: </p>
        </div>
      </div>
      <div className="tracks">
        <div className="tracklist">
          <div className="header">
            <h2>top tracks this month</h2>
            <div className="tracklist-actions">
              <div className="play-button"></div>
              <span className="arrow">↗</span>
            </div>
          </div>
          <ul>
            {/* List of top tracks will be populated here */}
          </ul>
        </div>
        <div className="tracklist">
          <div className="header">
            <h2>top tracks of all time</h2>
            <div className="tracklist-actions">
              <div className="play-button"></div>
              <span className="arrow">↗</span>
            </div>
          </div>
          <ul>
            {/* List of all-time top tracks will be populated here */}
          </ul>
        </div>
      </div>
      
    </div>
  );
}