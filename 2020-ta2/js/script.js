// initialize
$(document).ready(function() {

  // set current section
  var allSections = document.querySelectorAll('section');
  var currentSectionIndex = 1;
  // var introSection = allSections[currentSectionIndex];
  // introSection.classList.add('current');
  $('.onion .layer#layer-1').find('.layer').addClass('hide');

  document.querySelectorAll('button.peel-button').forEach(button => {
    button.addEventListener('click', () => {
      goDown();
      button.blur();
      if ( $(button).css('background') != $('section.current > .section-color-backdrop')) {
        $(button).css('background', $('section.current > .section-color-backdrop').css('background'));
      }
    });
    button.addEventListener('mouseenter', () => {
      if (currentSectionIndex < allSections.length - 1) {
        $(button).css('background', $('section.current > section > .section-color-backdrop').css('background'));
      } else {
        $(button).css('background', $('section.current > .section-color-backdrop').css('background'));
      }
    });
    button.addEventListener('mouseleave', () => {
      $(button).css('background', 'white');
    });
  });

  /* HEADER NAV */
  $('nav ul li#header-nav-link_index').click(function() {
    goToSection(0);
    getSection(0).find('#index')[0].scrollIntoView();
  });
  $('nav ul li#header-nav-link_about').click(function() {
    goToSection(0, '#about');
    getSection(0).find('#about')[0].scrollIntoView();
  });
  $('nav ul li#header-nav-link_contributors').click(function() {
    goToSection(0, '#contributors');
    getSection(0).find('#contributors')[0].scrollIntoView();
  });

  /* ONION NAV */
  // add click event for onion
  document.querySelectorAll('.onion .layer').forEach(onionLayer => {
    onionLayer.addEventListener('click', (event) => {
      var index = parseInt(onionLayer.id.split('-')[1]);
      goToSection(index);
      event.stopPropagation();
    });
  });



  /**
   * Change current section
   * @param {Number} newSectionIndex : the index of the new section
   * @param {String} divID : a div ID to scroll to
   */
  function goToSection(newSectionIndex) {
    // sections
    $('section').removeClass('current'); // unhide all sections
    $('section').removeClass('hide'); // unset current sections
    var newSection = getSection(newSectionIndex);
    newSection.addClass('current'); // set new section to current
    newSection.parents('section').addClass('hide'); // hide all higher sections

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
      $('.onion-container').addClass('active');
      $('header nav ul li#header-nav-link_index').addClass('current');
    } else {
      $('.onion-container').removeClass('active');
      $('header nav ul li#header-nav-link_index').removeClass('current');
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
  }

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