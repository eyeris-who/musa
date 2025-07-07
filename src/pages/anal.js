import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import MusicNotes from '../components/MusicNotes';

export default function Anal() {
  const [genresData, setGenresData] = useState([]);
  const [topShortTracks, setShortTracks] = useState([]);
  const [topLongTracks, setLongTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    axios.post('api/artists', {
      access_token: localStorage.getItem('access_token'),
      time_range: 'long_term',
      limit: 10,
      offset: 0,
    })
      .then(response => {
        const artists = response.data.items;
        console.log('Artists data:', artists);

        const topArtistsData = artists.map(artist => ({
          Name: artist.name,
          Image: artist.images[0]?.url,
        }));
        setTopArtists(topArtistsData);
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

    axios.post('api/tracks', {
      access_token: localStorage.getItem('access_token'),
      time_range: 'short_term',
      limit: 50,
      offset: 0,
    })
      .then(response => {
        const tracks = response.data.items;
        console.log('1-month data:', tracks);
        const topShort = getTracksData(tracks);
        setShortTracks(topShort);
      })
      .catch(error => {
        console.error('Error fetching tracks data:', error);
      });

    axios.post('api/tracks', {
      access_token: localStorage.getItem('access_token'),
      time_range: 'long_term',
      limit: 50,
      offset: 0,
    })
      .then(response => {
        const tracks = response.data.items;
        console.log('All-time tracks data:', tracks);
        const topAllTime = getTracksData(tracks);
        setLongTracks(topAllTime);
      })
      .catch(error => {
        console.error('Error fetching all-time tracks data:', error);
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

  const getTracksData = (trackData) => {
    return trackData.map(track => ({
      Song: track.name,
      Artist: track.artists.map(artist => artist.name).join(', '),
      Image: track.album.images[0]?.url,
      // Uri: track.uri,
    }));
  };

  const valueFormatter = (item) => `${item.value}%`;

  return (
    <div className="anal">
      <MusicNotes />
      <div className="tophalf">
        <div className="tracks">
          <div className="tracklist z-10 bg-[color:var(--color-primary)]">
            <div className="header">
              <h2>top tracks this month</h2>
              <span className="arrow">↗</span>
            </div>
            <ul>
              {/* List of top short-term tracks will be populated here */}
              {topShortTracks.map((track, index) => (
                <li key={index}>
                  <img src={track.Image} alt={track.Song} />
                  <div className="track-info">
                    <h3>{track.Song}</h3>
                    <p>{track.Artist}</p>
                  </div>
                  {/* <a href={track.Uri} target="_blank" rel="noopener noreferrer">Listen</a> */}
                </li>
              ))}
            </ul>
          </div>
          <div className="tracklist z-10 bg-[color:var(--color-primary)]">
            <div className="header">
              <h2>top tracks of all time</h2>
              <span className="arrow">↗</span>
            </div>
            <ul>
              {/* List of long-term top tracks will be populated here */}
              {topLongTracks.map((track, index) => (
                <li key={index}>
                  <img src={track.Image} alt={track.Song} />
                  <div className="track-info">
                    <h3>{track.Song}</h3>
                    <p>{track.Artist}</p>
                  </div>
                  {/* <a href={track.Uri} target="_blank" rel="noopener noreferrer">Listen</a> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="topartists z-10 bg-[color:var(--color-primary)]">
          <div className="header">
            <h2>top artists</h2>
          </div>
          <ul>
            {/* List of top long-term artists will be populated here */}
            {topArtists.map((artist, index) => (
              <li key={index}>
                <img src={artist.Image} alt={artist.Name} />
                <div className="artist-info">
                  <h3>{artist.Name}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bottomhalf">
        <div className="topgenres z-10 bg-[color:var(--color-primary)]">
          <div className="header">
            <h2>top genres</h2>
          </div></div>
        <div className="musicplayer z-10 bg-[color:var(--color-primary)]"></div>
      </div>
      <div className="piechart z-10">
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