# gd-song-proxy

Proxy server for non-Newgrounds songs for Geometry Dash, written in Node.js
Needs to be running every time the game is started.

## Usage
* Clone this repository, then run `npm i` to install required libraries
* Somehow patch the game to make requests to localhost instead of boomlings.com for getGJSongInfo.php
### Mod (the recommended method)
(thanks to GD Programming Discord, I had no idea what was I trying to do)
* Get a modloader, eg. quickldr, Mega Hack v6/v7, or anything that can load DLLs into GD
* Download `gd-song-redirector.dll` from releases and put into your modloader's mod directory, eg. `extensions` for Mega Hack v6/v7
* To stop redirecting to localhost, either remove the mod or disable it

### Patching manually (the non-modloader method, and not recommended)
* Open GeometryDash.exe in your hex editor of choice eg. HxD
* Change `http://www.boomlings.com/database/` to `http://localhost:3000/gd-song-prx/`

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

## Building gd-song-redirector.dll
* Install CMake and a C++ compiler, eg. MSVC
* Clone this repository with `--recursive` option
* Configure (add `-G "Visual Studio 17 2022"` if building with MSVC)
  ```
  cmake -B build -A win32
  ```
* Build
  ```
  cmake --build build --config Release
  ```