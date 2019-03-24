function checkCookie() {
  if(document.cookie.indexOf("commuter")<0) {
    return false;
  } else {
    return true;
  }
}

if(checkCookie()) {
  $(window).on('load',function(){
    $("#myModal").hide();
    $("button.btn").show();
    $("#bodyWrap").show();
    $("nav").show();
  });
} else {
  $(window).on('load',function(){
    $('#myModal').modal('show');
    $("button.btn").hide();
    $("#bodyWrap").hide();
    $("nav").hide();
  });
}