// 1.) Register for the mobile
 
// 2.) Call this from browser console (it is existing function, but not available on console scope)
function getMyToken() {
    var cookies = " " + document.cookie,
        cookieName = "aid";
 
    var index = cookies.indexOf(" " + cookieName + "=");
    if (index == -1) {
        index = cookies.indexOf(";" + cookieName + "=");
    }
    if (index == -1 || cookieName == "") {
        return false;
    }
    var lastIndex = cookies.indexOf(";", index + 1);
    if (lastIndex == -1) {
        lastIndex = cookies.length;
    }
 
    return unescape(cookies.substring(index + cookieName.length + 2, lastIndex));
}
 
// 3.) Execute these two statements in console.
var aid = getMyToken();
var url = "http://api1.flipkart.com/xmi?aid=";
 
/* 4.) Call this when 5 sec is left, more that 500 req may sometimes block your ip (since flipkart uses NGINX,
 not for this request though), You can pre-run this to check if this runs with a smaller loop count.*/
for(var i = 0; i < 100; i++) {
    //POST is mandatory and don't worry about SOP
    $.ajax({"url": url + encodeURIComponent(aid), "dataType": "json", "type" : "POST"})
    .done(function (data) {
        //just to know the status and break loop on success.
        console.log(data.status);
        if(data.status === "SUCCESS") break;
    });
}
