// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('content').innerText += 'script-2\r\n';
// });

(function () {
    var div = document.createElement('div');
    div.id = 'script-2';
    document.getElementById('content').appendChild(div);
})();
