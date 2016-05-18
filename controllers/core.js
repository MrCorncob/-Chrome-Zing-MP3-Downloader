var corncobExtensionId = $('#CorncobZingDownloaderExtension').attr('extension-id');
var corncob_currentChoosingSong = '';
var downloadBoxHtml = '\
  <span class="arr-top"></span>\
  <div class="ul fn-list">\
    <p class="li">\
      <a class="fn-128" href="/download/song/Buoc-Den-Ben-Em-Step-To-You-Trong-Hieu/LmcHtLnsWpLbigHyLDxyFnkm" target="_ifrTemp">128 kbps</a>\
    </p>\
    <p class="li">\
      <a class="fn-320" href="#">320 kbps</a>\
    </p>\
    <p class="li">\
      <a class="fn-lossless" href="#">Lossless</a>\
    </p>\
  </div>\
';
// $.getJSON('http://api.mp3.zing.vn/api/mobile/song/getsonginfo?requestdata={"id":"\''+songID+'\'"}', function( data ) {
//   var link = data.source["320"];
//   var fileName = getSlug(data.title + " - " + data.artist) + ".mp3";
//   //downloadByInvisibleIframe(link);
//   downloadByJS(link, fileName);
//   displayMessage("Đang tải " + fileName +", xin vui lòng đợi!");
// });
function helloWorld(data) {
    console.log(data);
}
var bindDownloadButtonEvent = function() {
    $('.fn-320').unbind('click');
    $('.fn-320').click(function(event) {
        event.preventDefault();
        var rootSongBox = $(this).parent().parent().parent();
        console.log($(this).parent());
        var songId = rootSongBox.attr('id').replace('dlboxsong', '');
        chrome.runtime.sendMessage(
            corncobExtensionId, {
                name: 'DownloadSong',
                data: {
                    quality: "320",
                    id: corncob_currentChoosingSong
                }

            },
            function(response) {

            });
    });

    $('.fn-128').unbind('click');
    $('.fn-128').click(function(event) {
        event.preventDefault();
        var rootSongBox = $(this).parent().parent().parent();
        console.log($(this).parent());
        var songId = rootSongBox.attr('id').replace('dlboxsong', '');
        chrome.runtime.sendMessage(
            corncobExtensionId, {
                name: 'DownloadSong',
                data: {
                    quality: "128",
                    id: corncob_currentChoosingSong
                }

            },
            function(response) {

            });
    });

    $('.fn-lossless').unbind('click');
    $('.fn-lossless').click(function(event) {
        event.preventDefault();
        chrome.runtime.sendMessage(
            corncobExtensionId, {
                name: 'DownloadSong',
                data: {
                    quality: "lossless",
                    id: corncob_currentChoosingSong
                }

            },
            function(response) {

            });
    });
}
var showDlBox = function(downloadButtonObject) {
    // item = $(b.data("item"));
    var dataType = downloadButtonObject.attr("data-type") || "song";
    var offset = downloadButtonObject.offset(),
        dataActive = downloadButtonObject.attr("data-active");
    var downloadBoxId = "dlbox" + dataType + downloadButtonObject.attr("data-id");
    var downloadBox = $("#" + downloadBox);
    $(".fn-" + dataType).removeClass(dataActive);
    downloadButtonObject.addClass(dataActive);
    $(".fn-box" + dataType).addClass("none");
    if (downloadBox.length > 0) {
        downloadBox.css({
            left: offset.left + 2 - (downloadBox.width() / 2) + "px",
            top: offset.top + 28 + "px"
        }).removeClass("none")
    } else {
        downloadBox = $(document.getElementById("dlbox" + dataType).cloneNode(true));
        downloadBox.attr("id", downloadBoxId);
        $("body").append(downloadBox);
        downloadBox.css({
            left: offset.left + 2 - (downloadBox.width() / 2) + "px",
            top: offset.top + 28 + "px"
        });
        downloadBox.removeClass("none");
        // this.buildDlBox(this.item, c, function(g) {
        //     // if (g.msg) {
        //     //     zmp3UI.showMsg(g.msg, 1)
        //     // }
        //     c.removeClass("none");
        //     onBlurBind(zmp3SongTool.item, function() {
        //         $(".fn-" + zmp3SongTool.item.data("type")).removeClass(zmp3SongTool.item.data("active"));
        //         c.addClass("none")
        //     })
        // })
    }
}
$(".fn-boxsong").blur(function() {
    $(this).addClass('none');
});
$('html').click(function(event) {
    var className = $(event.target).attr('class')
    if (className !== 'fn-boxsong' && className !== 'fn-dlsong') {
        $(".fn-boxsong").addClass('none');
        console.log(className);
    } else {
        //do something
    }
});

$(document).ready(function() {
    // download();
    console.log('Document ready');
    $('.fn-320').removeClass('fn-viprequire');
    $('.fn-dlsong').unbind('click');
    $('.fn-dlsong').click(function(event) {
        event.preventDefault();
        showDlBox($(this));
        var songId = $(this).attr('data-item').replace('#song', '');
        console.log(songId);
        corncob_currentChoosingSong = songId;
        var fn320Parents = $('.fn-320').parent();
        fn320Parents.html('');
        fn320Parents.html('<a class="fn-320" href="#">320 kbps</a>');
        bindDownloadButtonEvent();
        //$('.fn-boxsong').html(downloadBoxHtml);
        //console.log($('.fn-boxsong').html('<span class="arr-top"><i></i></span><ul><li><span>Thêm vào Playlist</span></li><div class="section-hidden"><div class="fn-list"><li class="fn-fav none"><a class="fn-add" data-type="song" data-id="0" title="Yêu Thích" href="#"><i class="icon-heart"></i>Yêu Thích</a></li><li class="fn-item none"><a class="fn-add" data-type="song" data-id="0" title="" href="#"><input type="checkbox"><label class="fn-name"></label></a></li></div><li class="line-top fn-btnnew"><a class="fn-showhide" data-show="#playlistBox .fn-new" data-hide="#playlistBox .fn-btnnew" href="#">Tạo Playlist mới</a></li><li class="line-top none fn-new"><form class="fn-playlist" action="/xhr/mydata/save-playlist" data-playlist-box="#playlistBox"><p><input name="name" type="text" placeholder="Tên Playlist"><input name="item_id" type="hidden" value=""><span class="close fn-showhide" data-show="#playlistBox .fn-btnnew" data-hide="#playlistBox .fn-new"></span></p><button type="submit" class="button btn-dark-blue small-button">Đồng ý</button></form></li></div></ul>'));
    });
});
