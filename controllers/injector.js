(function() {
    var extensionId = chrome.runtime.id;
    var extensionIdElement = document.createElement('div');
    var s = document.createElement('script');
    // TODO: add "script.js" to web_accessible_resources in manifest.json
    s.src = chrome.extension.getURL('controllers/core.js');
    s.onload = function() {
        this.parentNode.removeChild(this);
    };
    $(extensionIdElement).css('display:none');
    $(extensionIdElement).attr('id', 'CorncobZingDownloaderExtension');
    $(extensionIdElement).attr('extension-id', 'jbndjjdhphalahkmdhbkcfnnllaoklle');
    (document.head || document.documentElement).appendChild(extensionIdElement);
    (document.head || document.documentElement).appendChild(s);

})();
