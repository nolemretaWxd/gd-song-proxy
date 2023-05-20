//express server
const express = require('express');
const songInfo = require("./songInfo.json");
const fs = require('fs');
const app = express();
const port = 3000;
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/gd-song-prx/getGJSongInfo.php', (req, res) => {
    console.log("Responding for song ID " + req.body.songID);
    if(songInfo[req.body.songID] != undefined)
    {
        console.log("Song found in proxy");
        let filesize = (fs.statSync("./songs/" + songInfo[req.body.songID].filename).size / (1024 * 1024));
        res.send("1~|~" + req.body.songID + "~|~2~|~" + songInfo[req.body.songID].name + "~|~3~|~2159~|~4~|~" + songInfo[req.body.songID].author +"~|~5~|~" + filesize.toString().slice(0, 5));
    } else {
        console.log("Forwarding request to boomlings.com");
        var postData = 'songID=' + req.body.songID + "&secret=Wmfd2893gb7";
        var options = {
            hostname: 'boomlings.com',
            port: 80,
            path: '/database/getGJSongInfo.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData),
                'Accept': '*/*',
                'Host': 'www.boomlings.com',
            }
        };
        
        let request = http.request(options, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                res.send(data);
                console.log(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
        request.write(postData);
        request.end();
    } 
});

app.get('/prx/audio/download/*', (req, res) => {
    let songID = req.url.split("/")[4];
    console.log("Downloading song ID " + songID);
    if(songInfo[songID] != undefined)
    {
        res.download("./songs/" + songInfo[songID].filename);
    } else {
        let request = https.request("https://www.newgrounds.com/audio/download/" + songID, (res) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                res.send(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    } 
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));