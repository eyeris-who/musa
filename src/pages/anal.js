import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Anal() {
  const [genresData, setGenresData] = useState([]);

  useEffect(() => {
    axios.post('api/artists', {
      access_token: localStorage.getItem('access_token'),
      time_range: 'short_term',
      limit: 10,
      offset: 0,
    })
      .then(response => {
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
      });

    axios.post('api/genres', {
      access_token: localStorage.getItem('access_token'),
    })
      .then(response => {
        const genreData = response.data;
        console.log('Genre data:', genreData);
        const formatted = formatGenresForPieChart(genreData);
        setGenresData(formatted);
      })
      .catch(error => {
        console.error('Error fetching genre data:', error);
      });
  }, []);

  const formatGenresForPieChart = (genreData) => {
    const entries = Object.entries(genreData)
      .map(([genre, value]) => ({ label: genre, value }))
      .sort((a, b) => b.value - a.value);

    const topGenres = entries.slice(0, 9); // take top 9 genres
    const others = entries.slice(9); // everything else
    const otherTotal = others.reduce((sum, genre) => sum + genre.value, 0);

    if (otherTotal > 0) {
      topGenres.push({ label: 'Other', value: Math.round(otherTotal * 100) / 100 });
    }

    return topGenres;
  };

  const valueFormatter = (item) => `${item.value}%`;

  return (
    <div className="anal">
      <div className="tophalf">
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
        <div className="topartists">
          <div className="header">
            <h2>top artists</h2>
          </div>
        </div>
      </div>
      <div className="bottomhalf">
        <div className="topgenres">
          <div className="header">
            <h2>top genres</h2>
          </div></div>
        <div className="musicplayer"></div>
      </div>
      <div className="piechart">
        <PieChart
          series={[
            {
              data: genresData,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 10, additionalRadius: -10, color: 'gray' },
              valueFormatter,
            },
          ]}
          slotProps={{ legend: { hidden: true } }} // Hides the legend
        />
      </div>
    </div>
  );
}