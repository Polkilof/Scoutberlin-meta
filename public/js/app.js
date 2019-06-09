function createSticky(sticky) {
  if (typeof sticky !== 'undefined') {
    var pos = sticky.offset().top;
    $('body').on('scroll', function() {
      $('body').scrollTop() >= pos ? sticky.addClass('sticky') : sticky.removeClass('sticky');
    });
  }
}

createSticky($('.navbar'));

$('[data-carousel=viewed]').owlCarousel({
  autoWidth: true,
  dots: false,
  navs: false,
  responsiveRefreshRate: 0,
  responsive: {
    0: { items: 1 },
    769: { items: 2 },
    961: { items: 3 },
    1241: { items: 4 }
  }
});

$('[data-carousel=gallery]')
  .owlCarousel({
    nav: true,
    dots: false,
    responsiveRefreshRate: 0,
    mouseDrag: false,
    navText: [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 11H7.4l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-7 7-.2.3c-.1.2-.1.5 0 .8l.2.3 7 7c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1z"/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13H5c-.6 0-1-.4-1-1s.4-1 1-1h14c.6 0 1 .4 1 1s-.4 1-1 1z"/><path d="M12 20a1 1 0 0 1-.7-.3 1 1 0 0 1 0-1.4l6.3-6.3-6.3-6.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l7 7c.4.4.4 1 0 1.4l-7 7a1 1 0 0 1-.7.3z"/></svg>'
    ],
    responsive: {
      0: { items: 1 },
      769: { items: 2 },
      1241: { items: 3 }
    }
  })
  .magnificPopup({
    delegate: 'a',
    fixedContentPos: true,
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
      //titleSrc: function(item) {
      //  return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
      //}
    }
  });

if ($('[data-carousel=preview]').length) {
  $('[data-carousel=preview]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '[data-carousel=nav]',
    arrows: false,
    fade: true,
    prevArrow:
      '<button class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 11H7.4l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-7 7-.2.3c-.1.2-.1.5 0 .8l.2.3 7 7c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1z"/></svg></button>',
    nextArrow:
      '<button class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13H5c-.6 0-1-.4-1-1s.4-1 1-1h14c.6 0 1 .4 1 1s-.4 1-1 1z"/><path d="M12 20a1 1 0 0 1-.7-.3 1 1 0 0 1 0-1.4l6.3-6.3-6.3-6.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l7 7c.4.4.4 1 0 1.4l-7 7a1 1 0 0 1-.7.3z"/></svg></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          fade: false
        }
      }
    ]
  });
  $('[data-carousel=nav]').slick({
    infinite: true,
    vertical: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '[data-carousel=preview]',
    centerMode: true,
    focusOnSelect: true,
    prevArrow:
      '<button class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.7 11.3l-7-7-.3-.2c-.2-.1-.5-.1-.8 0l-.3.2-7 7c-.4.4-.4 1 0 1.4s1 .4 1.4 0L11 7.4V19c0 .6.4 1 1 1s1-.4 1-1V7.4l5.3 5.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4z"/></svg></button>',
    nextArrow:
      '<button class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.7 11.3a1 1 0 0 0-1.4 0L13 16.6V5c0-.6-.4-1-1-1s-1 .4-1 1v11.6l-5.3-5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l7 7 .3.2.4.1.4-.1.3-.2 7-7c.4-.4.4-1 0-1.4z"/></svg></button>'
  });

  var $initSliderPopup = function() {
    var $container = $('[data-carousel=preview]');
    var $imageLinks = $container.find('.item');
    var items = [];

    $imageLinks.each(function() {
      var $item = $(this);
      var type = 'image';
      if ($item.hasClass('item__video')) {
        type = 'iframe';
      }
      var magItem = {
        src: $item.attr('data-mfp-src'),
        type: type
      };
      magItem.title = $item.data('title');
      items.push(magItem);
    });

    $imageLinks.magnificPopup({
      mainClass: 'mfp-fade',
      disabledOn: 0,
      items: items,
      gallery: {
        enabled: true
      },
      type: 'image',
      callbacks: {
        beforeOpen: function() {
          var index = $imageLinks.index(this.st.el);
          if (-1 !== index) {
            this.goTo(index);
          }
        }
      }
    });
  };

  $(document).ready(function() {
    $initSliderPopup();
  });
  $(window).resize(function() {
    $initSliderPopup();
  });
}

$('[data-mfp-type=inline]').magnificPopup({
  type: 'inline',
  midClick: true,
  fixedContentPos: true,
  closeBtnInside: true,
  closeMarkup:
    '<button type="button" title="%title%" class="mfp-close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>'
});

$('[data-mfp-type=image]').magnificPopup({
  type: 'image',
  fixedContentPos: true
});
$('[data-mfp-close]').click(function() {
  $.magnificPopup.close();
});

$('[data-filters=catalog]').click(function() {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).text('показать фильтры');
    $('.catalog__filter').removeClass('show');
  } else {
    $(this).addClass('active');
    $(this).text('скрыть фильтры');
    $('.catalog__filter').addClass('show');
  }
});

var map_location = [48.8956712, 9.1656214];

if ($('#small_map').length) {
  var small_map = new google.maps.Map(document.getElementById('small_map'), {
    zoom: 16,
    center: new google.maps.LatLng(map_location[0], map_location[1]),
    disableDefaultUI: true
  });
  small_map_marker = new google.maps.Marker({
    position: new google.maps.LatLng(map_location[0], map_location[1]),
    map: small_map,
    icon: {
      url: 'img/marker.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  });
  small_map_marker.addListener('click', function() {
    var $viewmap = document.querySelector('div.map__container');
    $viewmap.classList.toggle('view');
  });
  small_map.addListener('center_changed', function() {
    window.setTimeout(function() {
      small_map.panTo(small_map_marker.getPosition());
    }, 100);
  });
}

if ($('#big_map').length) {
  var big_map = new google.maps.Map(document.getElementById('big_map'), {
    zoom: 16,
    center: new google.maps.LatLng(map_location[0], map_location[1]),
    disableDefaultUI: true
  });
  big_map_marker = new google.maps.Marker({
    position: new google.maps.LatLng(map_location[0], map_location[1]),
    map: big_map,
    icon: {
      url: 'img/marker.png',
      scaledSize: new google.maps.Size(60, 60)
    }
  });
  big_map.addListener('center_changed', function() {
    window.setTimeout(function() {
      big_map.panTo(big_map_marker.getPosition());
    }, 250);
  });
}

if ($('#company_map').length) {
  var company_map = new google.maps.Map(document.getElementById('company_map'), {
    zoom: 16,
    center: new google.maps.LatLng(map_location[0], map_location[1]),
    disableDefaultUI: true
  });
  company_map_marker = new google.maps.Marker({
    position: new google.maps.LatLng(map_location[0], map_location[1]),
    map: company_map,
    icon: {
      url: 'img/marker.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  });
  company_map.addListener('center_changed', function() {
    window.setTimeout(function() {
      company_map.panTo(company_map_marker.getPosition());
    }, 250);
  });
}

if ($('#profile_map').length) {
  var profile_map = new google.maps.Map(document.getElementById('profile_map'), {
    zoom: 16,
    center: new google.maps.LatLng(map_location[0], map_location[1]),
    disableDefaultUI: true
  });
  profile_map_marker = new google.maps.Marker({
    position: new google.maps.LatLng(map_location[0], map_location[1]),
    map: profile_map,
    icon: {
      url: 'img/marker.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  });
  profile_map.addListener('center_changed', function() {
    window.setTimeout(function() {
      profile_map.panTo(profile_map_marker.getPosition());
    }, 250);
  });
}

if ($('#new_map').length) {
  var new_map = new google.maps.Map(document.getElementById('new_map'), {
    zoom: 16,
    center: new google.maps.LatLng(map_location[0], map_location[1]),
    disableDefaultUI: true
  });
  new_map_marker = new google.maps.Marker({
    position: new google.maps.LatLng(map_location[0], map_location[1]),
    map: new_map,
    icon: {
      url: 'img/marker.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  });
  new_map.addListener('center_changed', function() {
    window.setTimeout(function() {
      new_map.panTo(new_map_marker.getPosition());
    }, 250);
  });
}

if ($('#contact_map').length) {
  var contact_map = new google.maps.Map(document.getElementById('contact_map'), {
    zoom: 16,
    center: new google.maps.LatLng(map_location[0], map_location[1]),
    disableDefaultUI: true
  });
  contact_map_marker = new google.maps.Marker({
    position: new google.maps.LatLng(map_location[0], map_location[1]),
    map: contact_map,
    icon: {
      url: 'img/marker2.png',
      scaledSize: new google.maps.Size(45, 43)
    }
  });
  contact_map.addListener('center_changed', function() {
    window.setTimeout(function() {
      contact_map.panTo(contact_map_marker.getPosition());
    }, 250);
  });
}

$('.show__password').click(function() {
  var $inp = $(this)
    .parent('.password')
    .find('input');

  if ($inp.attr('type') == 'password') {
    $(this).addClass('active');
    $inp.attr('type', 'text');
  } else {
    $(this).removeClass('active');
    $inp.attr('type', 'password');
  }
});

$('.multiselect select').fastselect();

$('[data-img=to-bg]').each(function() {
  var el = $(this);
  var imageSrc = el.find('img').attr('src');
  var cssValues = {
    background: 'url(' + imageSrc + ') no-repeat center center',
    'background-size': 'cover'
  };
  el.css(cssValues);
});

$('[data-sort]').click(function(e) {
  $(this).toggleClass('invert');
});

$('[data-scrollbar]').mCustomScrollbar();

if ($('[data-sidebar]').length) {
  function fixSidebar(sidebar) {
    if (typeof sidebar !== 'undefined') {
      $(window).on('scroll', function() {
        var pos = sidebar.offset().top;
        var doc = $(window).scrollTop();
        var scroller = $('[data-scrollbar]');
        var diff = doc - pos + 90 + 'px';
        if (doc >= pos) {
          scroller.css('top', diff);
        } else {
          scroller.css('top', 0);
        }
      });
    }
  }
  fixSidebar($('[data-sidebar]'));
}

if ($('[data-autoheight]').length) {
  var textarea = document.querySelector('[data-autoheight]');
  textarea.addEventListener('keydown', autosize);
  function autosize() {
    var el = this;
    setTimeout(function() {
      el.style.cssText = 'height:auto;';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
  }
}

$('[data-kostyli]').click(function() {
  $(this).hide();
  $('.about__site .kostyli').addClass('show');
});

$('.cookies__alert--button .btn.blue').click(function() {
  $('.cookies__alert').hide();
});

if ($('#map_view').length) {
  var locations = [{ x: 48.8936712, y: 9.1726214 }, { x: 48.8956712, y: 9.1636214 }, { x: 48.8976712, y: 9.1666214 }, { x: 48.8996712, y: 9.1696214 }, { x: 48.9016712, y: 9.1606214 }];

  var map_view = new google.maps.Map(document.getElementById('map_view'), {
    zoom: 16,
    center: new google.maps.LatLng(48.8976712, 9.1656214),
    disableDefaultUI: true
  });

  for (i = 0; i < locations.length; i++) {
    map_view_marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].x, locations[i].y),
      map: map_view,
      icon: {
        url: 'img/marker.png',
        scaledSize: new google.maps.Size(40, 40)
      }
    });
  }
}

$(document).ready(function() {
  $('[data-toggle="submenu"]').click(function(e) {
    var opn = $(this)
      .parent('.parent')
      .hasClass('open');
    if (opn) {
      $('.catalog__filter--block .parent').removeClass('open');
    } else {
      $('.catalog__filter--block .parent').removeClass('open');
      $(this)
        .parent('.parent')
        .addClass('open');
    }
  });
  $('[data-add]').click(function(e) {
    $(this).toggleClass('added');
  });
});





/* change 90.06.2019 */

$('[data-carousel=banner]').owlCarousel({
    items: 1,
    nav: true,
    dots: false,
    responsiveRefreshRate: 0,
    mouseDrag: false,
    navText: [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 11H7.4l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-7 7-.2.3c-.1.2-.1.5 0 .8l.2.3 7 7c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L7.4 13H19c.6 0 1-.4 1-1s-.4-1-1-1z"/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13H5c-.6 0-1-.4-1-1s.4-1 1-1h14c.6 0 1 .4 1 1s-.4 1-1 1z"/><path d="M12 20a1 1 0 0 1-.7-.3 1 1 0 0 1 0-1.4l6.3-6.3-6.3-6.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l7 7c.4.4.4 1 0 1.4l-7 7a1 1 0 0 1-.7.3z"/></svg>'
    ],
});

/* end change 90.06.2019 */