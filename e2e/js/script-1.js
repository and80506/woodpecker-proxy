// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('content').innerText += 'script-1\r\n';
// });

(function () {
    var div = document.createElement('div');
    div.id = 'script-1';
    document.getElementById('content').appendChild(div);
})();
