// document.getElementById('content').innerText += 'script-on-need-1.log\r\n';

(function () {
    var div = document.createElement('div');
    div.id = 'script-on-need-1.log';
    document.getElementById('content').appendChild(div);
})();
