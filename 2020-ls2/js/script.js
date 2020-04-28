$(function(){

  var current_layer = 'two';
  // var response = true;

  // LAYERS
  $('.layer-one').click(function(){
    showLayerOne();
  });

  $('.layer-two').click(function(){
    showLayerTwo();
  });

  $('li#index').click(function(){
    backToIndex();
  })

  $('#peel').click(function(){
    // if(response == true){
    //   removeResponse();
    //   response = false;
    // }
    if(current_layer == 'one'){
      backToIndex();
    }
    else {
      showLayerOne();
    }
  });

  function backToIndex(){
    $('#background').show();
    $('#background').attr('class', '');
    $('body').attr('class', '');
    $('body').addClass('index');
    $('#one').hide();
    $('h1').show();
    $('.layer').show().addClass('active');
    $('.layer').removeClass('translucent');
    $('.layer').removeClass('opaque');
    $('#peel').hide();
    $('header li').attr('class', '');
    current_layer = 'index';
  }

  function showAnyLayer(){
    $('#background').hide();
    $('body').attr('class', '');
    $('body').addClass('scroll');
    $('#peel').show();
    $('.layer').hide();
    $('h1').hide();
    $('header li').attr('class', '');
  }

  function removeResponse(){
    $('.response').css('opacity', '0');
  }

  function showLayerOne(){
    showAnyLayer();
    $('body').addClass('one');
    $('#one').show();
    $('#one #two').hide();
    $('header li').addClass('color-one');
    $('#text-prompt').removeClass('translucent');
    $('.layer-one.layer').show().addClass('translucent');
    $('.layer-two.layer').removeClass('translucent');
    $('.layer-two.layer').show().addClass('opaque').removeClass('active');
    $('.layer-three.layer').hide();
    current_layer = 'one';
  }

  function showLayerTwo(){
    showAnyLayer();
    $('body').addClass('two');
    $('#one, #two').show();
    $('header li').addClass('color-two');
    $('#text-prompt').addClass('translucent');
    $('.layer-one.layer').show().addClass('translucent');
    $('.layer-two.layer').show().addClass('translucent');
    $('.layer-three.layer').show().addClass('opaque').removeClass('active');
    current_layer = 'two';
  }

});
