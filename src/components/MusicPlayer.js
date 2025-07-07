import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MusicPlayer() {
    // fetch track data from API
    const [topShortTracks, setShortTracks] = useState([]);
    useEffect(() => {
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
    }, []);

    const getTracksData = (trackData) => {
        return trackData.map(track => ({
            Song: track.name,
            Artist: track.artists.map(artist => artist.name).join(', '),
            Image: track.album.images[0]?.url,
            Url: "https://open.spotify.com/embed/track/" + track.id + "?utm_source=generator",
            Duration: track.duration_ms,
        }));
    };

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const currentTrack = topShortTracks[currentTrackIndex] || {};

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    const handleNext = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % topShortTracks.length);
        setProgress(0);
        setIsPlaying(true);
    }

    const handlePrev = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + topShortTracks.length) % topShortTracks.length);
        setProgress(0);
        setIsPlaying(true);
    }

    // simulate progress bar update
    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 1000; // increment by 1 second
                    if (newProgress >= currentTrack.Duration) {
                        handleNext(); // go to next track when current ends
                        return 0;
                    }
                    return newProgress;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying, currentTrack.Duration]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="music-player">      
            <div className="track-info">
                <img src={currentTrack.Image} alt="Track Cover"/>
                <h2 className="text-xl font-bold">{currentTrack.Song}</h2>
                <p className="text-gray-600">{currentTrack.Artist}</p>
                <div className="relative w-full h-2 bg-gray-300 rounded">
                    <div className="absolute top-0 left-0 h-2 bg-black rounded" style={{ width: `${(progress / currentTrack.Duration) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(currentTrack.Duration)}</span>
                </div>
            </div>
            <div className="controls flex justify-center space-x-4 mt-4">
                <button onClick={handlePrev}>⏮️</button>
                <button className="w-12 h-12 text-white text-xl" onClick={handlePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
                <button onClick={handleNext}>⏭️</button>
            </div>

            {isPlaying && (
                <iframe
                    title="Spotify Player"
                    src={currentTrack.Url}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
}