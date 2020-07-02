/**************************************************************
* Smooth Scroll Polyfill
***************************************************************/
!function(){"use strict";function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset))},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){var l,e,r,i;do{l=(o=o.parentNode)===t.body}while(!1===l&&!1===(r=p(e=o,"Y")&&a(e,"Y"),i=p(e,"X")&&a(e,"X"),r||i));return l=null,o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function n(o,t){this.scrollLeft=o,this.scrollTop=t}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return"Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return"auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t))}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o()}();


/**************************************************************
* Initialize
***************************************************************/
$(document).ready(function() {

  // set current section
  var allSections = document.querySelectorAll('section');
  var currentSectionIndex = 1;

  document.querySelectorAll('button.peel-button').forEach(button => {
    button.addEventListener('click', () => {
      goDown();
      button.blur();
    });
  });

  /* HEADER NAV */
  $('nav ul li#header-nav-link_index').click(function() {
    goToSection(0);
  });
  $('nav ul li#header-nav-link_about').click(function(event) {
    event.preventDefault(); // prevent hyperlink default behavior
    getSection(0).find('#about')[0].scrollIntoView({behavior: 'smooth'});
    playRubbingSound();
  });
  $('nav ul li#header-nav-link_contributors').click(function(event) {
    event.preventDefault(); // prevent hyperlink default behavior
    getSection(0).find('#contributors')[0].scrollIntoView({behavior: 'smooth'});
    playRubbingSound();
  });

  /* ONION NAV */
  function setupOnionNav() {
    // add click event for onion
    $('.onion .layer').each(function(index, element) {
      $(element).click(function(event) {
        var index = parseInt($(this).attr('id').split('-')[1]);
        goToSection(index);
        event.stopPropagation();
        playRandomChoppingSound();
        $('.onion .layer').removeClass('hover');
        $(this).off('mouseenter').off('touchstart').off('mouseleave').off('touchend');
      }).bind('mouseenter touchstart', function() {
        $(this).addClass('hover');
      }).bind('mouseleave touchend', function() {
        $(this).removeClass('hover');
      });
    });
  }

  /*******************
   * CONTRIBUTORS DIRECTORY
   *******************/
  function setupContributorsDirectory() {
    $('#section-0 .section-content #contributors ol li')
    .click(function() {
      var index = $(this).attr('id').split('-')[1];
      goToSection(index);
      playRandomChoppingSound();
      $('.onion-container').css('mix-blend-mode', '');
      getOnionLayer(index).removeClass('hover');
      $(this).off('mouseleave').off('touchend');
    })
    .bind('mouseenter touchstart', function() {
      var index = $(this).attr('id').split('-')[1];
      var section = getSection(index);
      var sectionColor = $(section).find('.section-color-backdrop').css('background');
      var sectionTextColor = $(section).find('.section-content').css('color');
      var contributorTitle = $(this).find('span.contributor-title');
      contributorTitle.css('background', sectionColor);
      contributorTitle.css('color', sectionTextColor);
    })
    .bind('mouseleave touchend', function() {
      $(this).find('span.contributor-title').css('background', '');
      $(this).find('span.contributor-title').css('color', '');
    });
  }



  /**
   * Change current section
   * @param {Number} newSectionIndex : the index of the new section
   * @param {String} divID : a div ID to scroll to
   */
  function goToSection(newSectionIndex) {

    newSectionIndex = parseInt(newSectionIndex);

    // scroll to top
    window.scrollTo(0,0);

    // sections
    $('section').removeClass('current'); // unhide all sections
    var newSection = getSection(newSectionIndex);
    newSection.addClass('current'); // set new section to current

    // onion
    $('.onion .layer').removeClass('current'); // unhide all onion layers
    if (newSectionIndex > 0) {
      var newOnionLayer = getOnionLayer(newSectionIndex);
      newOnionLayer.addClass('current');
    }

    // update current section index
    currentSectionIndex = newSectionIndex;

    // INDEX
    if (newSectionIndex == 0) {
      $('.onion-container').removeClass('floating');
      $('.peel-button').addClass('hidden');
      background.measure(); // re-calculate sky background
      $('header h1').css('color', 'white'); // make LOVE IN THE CLOUD h1 white
      $('header nav ul').addClass('show-all'); // show ABOUT and CONTRIBUTORS links in header nav
      $('header nav ul li#header-nav-link_index').addClass('current');
      setupOnionNav();
      setupContributorsDirectory();
    } else {
      $('.onion-container').addClass('floating');
      $('.peel-button').removeClass('hidden');
      $('header h1').css('color', $('section.current > .section-content').css('color')); // make LOVE IN THE CLOUD h1 match the section's text color
      $('header nav ul').removeClass('show-all'); // hide ABOUT and CONTRIBUTORS links in header nav
      $('header nav ul li#header-nav-link_index').removeClass('current');

      if (currentSectionIndex < allSections.length - 1) {
        $('.peel-button').css('background', $('section.current + section > .section-color-backdrop').css('background'));
        $('.peel-button').css('color', $('section.current + section > .section-content').css('color'));
      } else {
        $('.peel-button').css('background', 'white');
        $('.peel-button').css('color', 'black');
      }
    }
  }

  /**
   * Go up one section
   */
  function goUp() {
    if (currentSectionIndex > 0) {
      goToSection(currentSectionIndex - 1);
    }
  }

  /**
   * Go down one section
   */
  function goDown() {
    if (currentSectionIndex + 1 <= allSections.length - 1) {
      goToSection(currentSectionIndex + 1);
    } else {
      goToSection(0);
    }
    playRandomPeelingSound();
  }


  // ARROW KEYS
  $(document).on('keydown', function(event) {
    event = event || window.event;

    // up arrow
    if (event.keyCode == '38') {
      goUp();
      event.preventDefault();
    }

    // down arrow
    if (event.keyCode == '40') {
      goDown();
      event.preventDefault();
    }
  });


  /**
   * Get section by index
   * @param {Number} index : index of section
   * @returns Section as jQuery object
   */
  function getSection(index) {
    return $('section#section-' + index);
  }

  /**
   * Get onion layer by index
   * @param {Number} index : index of onion layer
   * @returns Onion Layer as jQuery object
   */
  function getOnionLayer(index) {
    return $('.onion .layer#layer-' + index);
  }

  /**
   * Get index of a section
   * @param {jQuery object} section
   * @returns Index as an integer
   */
  function getIndex(section) {
    return parseInt(section.id.split('-')[1]);
  }

  // ONION SOUNDS
  function playRandomPeelingSound() {
    var audioPlayers = document.querySelectorAll('.sounds.peeling audio');
    var randomIndex = Math.floor( Math.random() * audioPlayers.length );
    var randomAudioPlayer = audioPlayers[randomIndex];
    randomAudioPlayer.play();
  }

  function playRandomChoppingSound() {
    var audioPlayers = document.querySelectorAll('.sounds.chopping audio');
    var randomIndex = Math.floor( Math.random() * audioPlayers.length );
    var randomAudioPlayer = audioPlayers[randomIndex];
    randomAudioPlayer.play();
  }

  function playRubbingSound() {
    var audioPlayer = document.querySelector('.sounds.rubbing audio');
    audioPlayer.play();
  }




  /*******************
   * SKY BACKGROUND
   *******************/
  var background = {
    load : function() {
      this.img = $('#sky-backdrop img')[0];
      if (this.img.complete) {
        console.log('Background image loaded before script. Fade in background.');
        $('#sky-backdrop').addClass('shown'); // show background image container
        this.initialize();
      } else {
        var that = this;
        this.img.addEventListener('load', function() {
          console.log('Background image loaded after script. Fade in background.');
          $('#sky-backdrop').addClass('shown'); // show background image container
          that.initialize();
        });
      }
    },
    initialize : function() {
      this.measure();
      this.start(20);
    },
    measure : function() {
      this.imgWidth = this.img.clientWidth;
      this.windowWidth = $(window).width();
    },
    start : function(fps) {
      this.t = 0;
      this.fpsInterval = 1000 / fps;
      this.now;
      this.then = Date.now();
      this.elapsed;
      this.animate();
    },
    animate : function() {
      requestAnimationFrame(this.animate.bind(this)); // request another frame
      this.now = Date.now(); // calc elapsed time since last loop
      this.elapsed = this.now - this.then;
      if (this.elapsed > this.fpsInterval) { // if enough time has elapsed, draw the next frame
          this.then = this.now - (this.elapsed % this.fpsInterval); // Get ready for next frame by setting then=now, but also adjust for your specified fpsInterval not being a multiple of RAF's interval (16.7ms)

          // sky background animation
          var p = Math.abs((this.t-0.5)*2); // turn t into a periodic zigzag so the animation loops back and forth
          var offset = p * (this.imgWidth - this.windowWidth); // offset is some portion of the extra width that the background image has over the window
          // offset = Math.round(offset*2)/2; // round to nearest half-pixel
          this.img.style.transform = 'translateX(-'+offset+'px)'; // apply transform
          this.t += 0.0001; // increment animation loop parameter
          if (this.t > 1) this.t -= 1;
      }
    }
  }
  background.load();
  background.measure();

  /*************************
   * RESIZE
   *************************/
  var windowWidth = $(window).width();
  function adjust() {
    background.measure(); // update background sky image width
    windowWidth = $(window).width(); // update window width
  }
  $(window).resize(_.throttle(adjust, 250)); // throttle resize event and adjust content position
});