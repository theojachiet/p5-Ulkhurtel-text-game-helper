console.log('helo');
fetch('./minutes.json')
    .then(response => response.json())
    .then(data => console.log(data));