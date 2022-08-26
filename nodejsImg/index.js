const Fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https')

//5615039fc008ff1530efcac688082638

const IMG_LINK = 'https://image.tmdb.org/t/p/w500'

async function uploadToLocalFolder(imgLink, name) {
    const localPath = path.resolve(__dirname, 'img/poster_path', name + "_poster_path" + ".jpg")
    // var localPath = Fs.createWriteStream('./img/poster_path/img.jpg');
    var request = https.get(IMG_LINK + imgLink, function(res){
        console.log(res)
        // res.pipe(localPath)
        res.pipe(Fs.createWriteStream(localPath))
    })
}

async function downloadImg(url, name) {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=5615039fc008ff1530efcac688082638&language=en-US&page=1').then(res => {
        // console.log(res.data.results)

        for (let i = 0; i < res.data.results.length; i++) {
            // console.log(res.data.results[i].original_title.replace(/\s/g, ''))
            uploadToLocalFolder(res.data.results[i].poster_path, res.data.results[i].original_title.replace(/\s/g, ''));
        }
    })

    
}

downloadImg('https://api.themoviedb.org/3/movie/popular?api_key=5615039fc008ff1530efcac688082638&language=en-US&page=1', 'img')