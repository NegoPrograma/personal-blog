let textGrabber = document.getElementById("text");
let grabbedText = textGrabber.innerText;
grabbedText = grabbedText.replace(/\\n/g,"<br>");
textGrabber.innerHTML = grabbedText;

