// Nav links underline effect
$('.nav-item').hover(
  function () {
    $(this)
      .find('hr')
      .css({ opacity: '1', width: '30%' });
  },
  function () {
    $(this)
      .find('hr')
      .css({ opacity: '0', width: '10%' });
  }
);

// Check device for product tab on nav menu

if (window.innerWidth > 1024) {
  // if pc: open products menu on hover
  $('.dropdown').hover(
    function () {
      $('.dropdown-menu').show(200, 'swing');
    },
    function () {
      $('.dropdown-menu')
        .clearQueue()
        .css('display', 'none');
    }
  );
} else {
  // else products menu not displaying
  $('.dropdown-menu').css('display', 'none');
}

// Check device for category products menu

if (window.innerWidth > 1024) {
  // if pc: open products tab on hover
  $('.category-title').hover(
    function (e) {
      $('.each-menu').css('display', 'none');
      $(this)
        .find('.each-menu')
        .show(400, 'swing');
    },
    function () {
      $('.each-menu')
        .clearQueue()
        .css('display', 'none');
    }
  );
} else {
  // else: products tab not displaying
  var menuTarget;
  $('.category-title').click(function (e) {
    if (e.target.localName === 'li') {
      menuTarget = $(e.target);
    } else if (e.target.localName === 'a') {
      menuTarget = $(e.target.parentElement);
    }
    // close menu when clicking on another category
    let clicked = $(this);
    if (clicked.find('.each-menu').css('display') === 'none') {
      jQuery.grep($('.each-menu'), function (menu) {
        if ($(menu).css('display') !== 'none') {
          $(menu).slideUp(200, 'swing');
        }
      });
      clicked.find('.each-menu').slideDown(200, 'swing');
    } else {
      $(this)
        .find('.each-menu')
        .slideUp(200, 'swing');
    }
    // close menu when clicking outside of it
    $(document).click(function (event) {
      if (
        !menuTarget.is(event.target) &&
        menuTarget.has(event.target).length === 0
      ) {
        jQuery.grep($('.each-menu'), function (menu) {
          if ($(menu).css('display') !== 'none') {
            $(menu).slideUp(200, 'swing');
          }
        });
      }
    });
  });
}

let showCategory;

// Show choose category title

if (!showCategory) {
  $('#products-grid').append(
    '<h3 id="remove" class="mt-4 ml-4">Elige un producto</h3>'
  );
}

// Choose what category to display

$('.data').click(function () {
  $('#remove').remove();
  showCategory = $(this).data('key');
  console.log(showCategory);
  console.log($('.card'));
  $('.card')
    .addClass('d-none')
    .css('opacity', '0');
  setTimeout(function () {
    $('.card').each(function () {
      console.log($(this));
      if (showCategory === $(this).data('key')) {
        $(this).removeClass('d-none');
        setTimeout(
          function () {
            $(this).css('opacity', '1');
          }.bind(this),
          200
        );
        console.log($(this));
      }
    });
  }, 100);
});

// Show Card Widget

$('.card').click(function () {
  $(this)
    .next('.card-widget')
    .removeClass('d-none');
  setTimeout(
    function () {
      $(this)
        .next('.card-widget')
        .css({ opacity: '1', 'background-color': '#00000085' });
    }.bind(this),
    100
  );
});
$('.widget-close').click(function () {
  $(this)
    .closest('.card-widget')
    .css({ opacity: '0', 'background-color': 'transparent' });
  setTimeout(
    function () {
      $(this)
        .closest('.card-widget')
        .addClass('d-none');
    }.bind(this),
    300
  );
});

// Uploading Product: Show Image

function readURL (input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#product-image').removeClass('d-none');
      $('#product-image').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$('#image').change(function () {
  readURL(this);
});

// if cellphone, wspp social icon leads to wspp api

if (window.innerWidth <= 480) {
  $('#wspp-icon').attr(
    'href',
    'https://api.whatsapp.com/send?phone=5493534239028&text=Hola%2C%20quisiera%20hacerte%20una%20consulta'
  );
}
