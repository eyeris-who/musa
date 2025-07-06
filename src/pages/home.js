import axios from "axios";
import MusicNotes from '../components/MusicNotes';
import DrawingCanvas from "../components/DrawingCanvas";

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
      <MusicNotes />
      <div className="profile">
        <div className="z-10 grid grid-cols-2 gap-4 h-full rounded-lg w-fit aspect-square">
          <img className="pfp w-full h-full object-cover rounded-full" src="" alt="Profile" />
          <img className="pfp1 w-full h-full object-cover rounded-full" src="" alt="Profile1" />
          <img className="pfp2 w-full h-full object-cover rounded-full" src="" alt="Profile2" />
          <img className="pfp3 w-full h-full object-cover rounded-full" src="" alt="Profile3" />
        </div>
        <div className="z-10 text-left ml-8 w-1/2 h-full flex flex-col gap-4">
          <div className="w-full flex-shrink-0 text-left">
            <h1 className="font-bold text-9xl"></h1>
            <h2 className="font-bold text-xl">THIS MONTH:</h2>
            <p>Minutes Listened: </p>
            <p>Number of Songs: </p>
            <p>Number of Artists: </p>
          </div>
          <div className="w-full flex-1 text-left  h-full">
            {/* bg-[color:var(--color-primary)] */}
            <h2 className="font-bold text-xl">SHOW OFF YOUR CREATIVITY:</h2>
            <div className="flex flex-col gap-2">
              <p>Draw something on the canvas below!</p>
              <DrawingCanvas />
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
}