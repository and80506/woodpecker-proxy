// document.getElementById('content').innerText += 'script-on-need-2\r\n';

(function () {
    var div = document.createElement('div');
    div.id = 'script-on-need-2';
    document.getElementById('content').appendChild(div);
})();
