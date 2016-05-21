var corncobExtensionId = $('#CorncobZingDownloaderExtension').attr('extension-id');
var corncob_currentChoosingSong = '';

// Bind download button event handler
var bindDownloadBoxEvent = function() {
    $('.fn-320').click(function(event) {
        event.preventDefault();
        sendZingDownloadRequest("320");
    });

    $('.fn-128').click(function(event) {
        event.preventDefault();
        sendZingDownloadRequest("128");
    });

    $('.fn-lossless').click(function(event) {
        event.preventDefault();
        sendZingDownloadRequest("lossless");
    });
}

// Bind event to download button
var bindDownloadButtonEvent = function(){
    $('.fn-dlsong').click(function(event) {
        event.preventDefault();
        showDlBox($(this));
        corncob_currentChoosingSong = $(this).attr('data-item').replace('#song', '');
        bindDownloadBoxEvent();
    });
}

// Show download box when download button clicked
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
    }
}

// Bind single song download button event handler
var bindSingleSongDownloadBoxEvent = function() {
    var currentUrl = $('meta[property="og:url"]').attr('content');
    if (!currentUrl){
        return;
    }
    else{
        try{
            var reg = /http:\/\/mp3\.zing\.vn\/link\/song\/(\w+)/;
            corncob_currentChoosingSong = reg.exec(currentUrl)[1];
            console.log('Song ID:', corncob_currentChoosingSong);
        }
        catch (err){
            console.log('Error getting song ID');
            return;
        }
    }
    changeDownloadButtonClass();
    bindDownloadBoxEvent();
}

// Send download song request to chrome extension
function sendZingDownloadRequest(quality) {
    chrome.runtime.sendMessage(
        corncobExtensionId, {
            name: 'DownloadSong',
            data: {
                quality: quality,
                id: corncob_currentChoosingSong
            }

        },
        function(response) {

        }
    );
}

// Hide download box when not active
$('html').click(function(event) {
    var className = $(event.target).attr('class')
    if (className !== 'fn-boxsong' && className !== 'fn-dlsong') {
        $(".fn-boxsong").addClass('none');
    }
});


// Unbind all click events bound to download buttons and boxes
function unbindAllButtonEvent() {
    try{
        $('.fn-dlsong').unbind('click');
        $('.fn-dlsong').children().unbind('click');

        $('.fn-boxsong').unbind('click');
        $('.fn-boxsong').children().unbind('click');
    }
    catch (err){
        console.log('Unbind .fn-boxsong failed');
    }


    //Unbind event on single song page
    try{
        $('ul.dl-service.fn-list').unbind('click');
        $('ul.dl-service.fn-list').children().unbind('click');
        $('ul.dl-service.fn-list').children().children().unbind('click');
    }
    catch (err){
        console.log('Unbind ul.dl-service.fn-list failed');
    }
}

function changeDownloadButtonClass(){
    $('.fn-128').removeClass('ghost-button');
    $('.fn-320').removeClass('ghost-button');
    $('.fn-lossless').addClass('ghost-button');

    var sFn320Parent = $('.fn-size-320').parent();
    sFn320Parent.find('a').remove();
    sFn320Parent.append(' miễn phí');

    $('.fn-download-off').addClass('none');
    $('.dl-service.fn-list').removeClass('none');
    // $('.dl-service.fn-list').children().removeClass('none');
    $('.dl-service.fn-list').find('.none').removeClass('none');
}
$(document).ready(function() {
    // download();
    console.log('Document ready');
    unbindAllButtonEvent();
    bindDownloadButtonEvent();
    bindSingleSongDownloadBoxEvent();

});
