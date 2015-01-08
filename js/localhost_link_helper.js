var localhostLinkHelper = (function($){
    /// Replace the placeholder text your-port-number with the name stored in sessionStorage or create a text input if it is not in sessionStorage
    var portNumber = window.sessionStorage.getItem('portNumber');
    var links = $("a[href*='your-port-number']");
    if (portNumber) {
        // update all links
        links.replaceWith(function(){
            return '<a href="' + this.href.replace(/your-port-number/, portNumber) + '">' + this.text.replace(/your-port-number/, portNumber) + ' <a href="#" class="clear-portNumber">(<i class="fa fa-times"></i>)</a>';
        });
        $('.clear-portNumber').click(function(){
            window.sessionStorage.removeItem('portNumber');
            window.location = window.location;
        });
    } else {
        // update all links with localhostLinkHelper input
        for (var i = 0; i < links.length; ++i){
            (function(i){
            var div = document.createElement('div');
            div.id = 'portNumber-' + i;
            div.style.display='inline-block';
            var linkStart = links[i].text.substr(0, links[i].text.indexOf('your-port-number'));
            var linkEnd = links[i].text.substr(links[i].text.indexOf('your-port-number') + 'your-port-number'.length);
            div.innerHTML = linkStart + '<input type="text" placeholder="your-port-number"></input>' + linkEnd + ' <button>set</button>';
            links[i].parentElement.replaceChild(div, links[i]);
            $('button', div).click(function(){
                var portNumber = $('input', div).val();
                window.sessionStorage.setItem('portNumber', portNumber);
                //window.open(links[i].href.replace(/your-port-number/, portNumber));
                window.location = window.location;
            });
            }(i));
        }
    }
}(jQuery));
