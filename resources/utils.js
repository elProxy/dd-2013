Element.prototype.hasClass = function(className) {
  return this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}


Element.prototype.removeClass = function(className) {
  this.className = this.className.replace(new RegExp('(\\s+|^)' + className + '(\\s+|$)'), ' ').trim();
}

Element.prototype.addClass = function(className) {
  className = className.trim();
  if (className && !this.hasClass(className))
    this.className += (" " + className);
}

function iFrameForTarget(element) {
    var browser = element;
    while (!browser.hasClass("browser") && !!browser.parentElement)
        browser = browser.parentElement;
    return browser.querySelector("iframe");
}

function addressBarKeyListener(e) {
    console.log("addressBar Key toggled" + e.target)
    if (e.keyCode != 13)
        return;
    var element = e.target;
    var iframe = iFrameForTarget(element);
    iframe.contentWindow.location = element.innerText;
    e.preventDefault();
}

function browserReload(e) {
    console.log(e.target + " ->  " + iFrameForTarget(e.target) );
    var iframe = iFrameForTarget(e.target);
    // and another pretty ugly hack
    iframe.contentWindow.location = iframe.src;
}

function onKeyDownEventHandler(event) {
    // Don't mess with contenteditable divs
    if (event.target.isContentEditable)
      return;

    if (event.keyCode == 27 || event.keyCode == 79) { // ESC or o -> overview
        location.hash = "#overview";
        event.preventDefault();
    } else if (event.keyCode == 70) { // f -> requestFullscreen
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}
