from flask import Flask, jsonify, request
import requests
from collections import defaultdict

app = Flask(__name__)

SPOTIFY_CLIENT_ID = "aae53e8417b047308811890aab5b2cd4"
SPOTIFY_CLIENT_SECRET = "4329a41d79a846e58f57ebdfdd3d826c"

@app.route('/api/route') # use route to fetch result of execution
def predict():
    return jsonify({'variable': func1(),
                   'variable2': func2()})

def func1():
    return 0.9
def func2():
    return 0.7

@app.route('/api/callback', methods=["POST"]) # use callback to send result of execution
def callback():    
    try:
        code = request.json.get('code')
        # exchange code for token
        response = requests.post("https://accounts.spotify.com/api/token", {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "http://127.0.0.1:3000/api/callback",
            "client_id": SPOTIFY_CLIENT_ID,
            "client_secret": SPOTIFY_CLIENT_SECRET,
        }, headers={"Content-Type": "application/x-www-form-urlencoded"})
        if response.status_code != 200:
            return jsonify({"error": "Failed to get token"}), 400
        
        # return the token
        return jsonify(response.json())        
    except AttributeError:
        return jsonify({'error': 'No code provided'}), 400
    
    

@app.route('/api/user', methods=["POST"]) # use user to get user info
def user():
    token = request.json.get('access_token')
    if not token:
        return jsonify({'error': 'No token provided'}), 400    
    headers = {
        "Authorization": f"Bearer {token}"
    }    
    response = requests.get("https://api.spotify.com/v1/me", headers=headers)    
    if response.status_code != 200:
        return jsonify({"error": "Failed to get user info"}), 400    
    return jsonify(response.json())

@app.route('/api/artists', methods=["POST"]) # use artists to get top artists
def artists():
    data = request.json
    print("Incoming /api/artists data:", data)
    token = data.get('access_token')
    time_range = data.get('time_range', 'short_term')
    limit = data.get('limit', 3)
    offset = data.get('offset', 0)
    if not token:
        return jsonify({'error': 'No token provided'}), 400    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    print(f"Making request to Spotify: time_range={time_range}, limit={limit}, offset={offset}")
    response = requests.get(
        f"https://api.spotify.com/v1/me/top/artists?time_range={time_range}&limit={limit}&offset={offset}",
        headers=headers
    )
    if response.status_code != 200:
        return jsonify({"error": f"Failed to get top {limit} {time_range} artists"}), 400
    
    # print("Spotify response:", response.status_code, response.text)
    return jsonify(response.json())

@app.route('/api/tracks', methods=["POST"]) # use tracks to get top tracks
def tracks():
    data = request.json
    token = data.get('access_token')
    time_range = data.get('time_range', 'short_term')
    limit = data.get('limit', 50)
    offset = data.get('offset', 0)
    if not token:
        return jsonify({'error': 'No token provided'}), 400    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(
        f"https://api.spotify.com/v1/me/top/tracks?time_range={time_range}&limit={limit}&offset={offset}",
        headers=headers
    )
    if response.status_code != 200:
        return jsonify({"error": f"Failed to get top {limit} {time_range} tracks"}), 400
    return jsonify(response.json())

@app.route('/api/genres', methods=["POST"]) # use genres to get genres associated with top (long-term artists)
def genres():
    data = request.json
    print("Incoming /api/genres data:", data)
    token = data.get('access_token')
    if not token:
        return jsonify({'error': 'No token provided'}), 400    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(
        f"https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0",
        headers=headers
    )
    if response.status_code != 200:
        return jsonify({"error": "Failed to get top 50 long-term artists for genres"}), 400
    data = response.json()
    print("Spotify response for genres:", response.status_code, response.text)
    artists = data.get('items', [])

    # accumulate weighted genres from top artists
    genre_weights = defaultdict(float)
    total_weight = 0
    for i, artist in enumerate(artists):
        genres = artist.get('genres', [])
        if not genres:
            continue
        weight = len(artists) - i  # rank-based weight (rank 0 = 50, rank 49 = 1)
        weight_per_genre = weight / len(genres)
        for genre in genres:
            genre_weights[genre] += weight_per_genre
        total_weight += weight

    # create dictionary of genre percentages (genre_weights.items()  gives you a list of (genre, weight) pairs)
    genre_percentages = {
        genre: round((weight / total_weight) * 100, 2)
        for genre, weight in sorted(genre_weights.items(), key=lambda item: item[1], reverse=True)
    }

    return jsonify(genre_percentages)

if __name__ == '__main__':
    app.run(debug=True)