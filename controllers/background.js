function downloadZingMp3Song(songID, quality) {

    $.ajax({
        url: 'http://api.mp3.zing.vn/api/mobile/song/getsonginfo',
        data: {
            requestdata: '{"id":"\'' + songID + '\'"}'
        },
        dataType: 'json',
        success: function(data) {
            console.log(data);
            var url = data.source[quality] || data.source["320"] || data.source["128"];
            var fileName = getSlug(data.title + " - " + data.artist) + ".mp3";
            sendToChromeDownloadQueue(url, fileName);
        }
    });
}

function downloadZingMp3Album(albumID, quality) {

    $.ajax({
        url: 'http://api.mp3.zing.vn/api/mobile/song/getsonginfo',
        data: {
            requestdata: '{"id":"\'' + songID + '\'"}'
        },
        dataType: 'json',
        success: function(data) {
            console.log(data);
            var url = data.source[quality] || data.source["320"] || data.source["128"];
            var fileName = getSlug(data.title + " - " + data.artist) + ".mp3";
            sendToChromeDownloadQueue(url, fileName);
        }
    });
}

// Get ASCII slug from Vietnamese string
function getSlug(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ồ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "i");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/,/g, "-");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    //str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
}

function sendToChromeDownloadQueue(url, filename) {
    var downloadOption = {
        filename: filename,
        saveAs: true,
        url: url
    }
    chrome.downloads.download(downloadOption, function(e) {
        console.log('Finished download!');
    });
}

/**
 * receiveMessage event listener
 * receive requested and handle, return the
 * result if needed
 */
var receiveMessage = function(request, sender, callback) {
    console.log('receive message');
    // If-else only, switch case with break asynchronus task
    if (request.name == 'DownloadSong') {
        var quality = request.data.quality;
        var songId = request.data.id;
        if (quality === 'lossless'){
            alert('Lossless song download is not supported!');
            quality = '320';
        }
        downloadZingMp3Song(songId, quality);
    }
    else if (request.name == 'DownloadAlbum') {
        var quality = request.data.quality;
        var albumID = request.data.id;
        if (quality === 'lossless'){
            alert('Lossless song download is not supported!');
            quality = '320';
        }
        downloadZingMp3Album(albumID, quality);
    }
    // return true;
    console.log(request);
}

//Add handle message event listener
chrome.runtime.onMessageExternal.addListener(receiveMessage);
