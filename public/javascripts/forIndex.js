$(document).ready(function () {
  $("#carousel").rcarousel({
    visible: 1,
    step: 1,
    speed: 500,
    height: 200,
    width: 200
    //auto: {enabled:true}
  });
  
  var value = $('#pictureUrl').html();

  $('#pictureUrl').remove();
  $('#picture').append('<img class ="display" src="null">')
  $('.display').attr("src", value);
  var bg = $('#bg').val();
  var font = $('#font').val();
  var border = $('#border').val();
  
  $('body').css({"background-color": bg});
  $('body').css({"color": font});
  $('body').css({"border-color": border});
  $('#header').css({"border-color":border});
  $('tag').css({"color":font});
  $('a').css({"color": font});
  $('#userSet').submit(function (event) {
  	var bg = $('#bg').val();
    var font = $('#font').val();
    var border = $('#border').val();
    event.preventDefault();
    $.post("/submitted", $('#userSet').serialize());
    
    $('body').css({"background-color": bg});
    $('body').css({"color": font});
    $('body').css({"border-color": border});
    $('#header').css({"border-color":border});
    $('a').css({"color": font});
    $('tag').css({"color":font});
    return false;
  })

  $('.picComment').submit(function (event) {

    //finished this section with the help of Shane Skikne
    var id = $('.comment').attr("id");
    var comment = $('.comment').val();
    console.log(id, comment);
    event.preventDefault();
    $.post('/picSubmit', {"id":id, "message":comment});
    return false;
  })
})

