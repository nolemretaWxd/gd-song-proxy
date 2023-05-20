# gd-song-proxy

Proxy server for non-Newgrounds songs for Geometry Dash, written in Node.js
Needs to be running every time the game is started.

## Usage
* Clone this repository, then run `npm i` to install required libraries
* Change 2 strings in GeometryDash.exe
    * Change `http://www.boomlings.com/database/` to `http://localhost:3000/gd-song-prx/`
    * Change `http://www.newgrounds.com/` to `http://localhost:3000/prx/`
    * Both strings aren't Base64 encoded
* Put your .mp3 songs in songs directory
* Add songs to songInfo.json

## songInfo.json syntax
```
{
    "2": {
        "name": "Song name",
        "author": "Song author",
        "filename": "Filename in songs directory"
    }
}
```
Object key is the song ID used in Geometry Dash. Can be any song ID that the game will accept and isn't downloaded, but using an nonexistent song ID is recommended.