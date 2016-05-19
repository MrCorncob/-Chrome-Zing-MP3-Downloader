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
    $('.fn-dlsong').unbind('click');
    $('.fn-dlsong').children().unbind('click');

    $('.fn-boxsong').unbind('click');
    $('.fn-boxsong').children().unbind('click');
}

$(document).ready(function() {
    // download();
    console.log('Document ready');
    unbindAllButtonEvent();
    bindDownloadButtonEvent();


});
