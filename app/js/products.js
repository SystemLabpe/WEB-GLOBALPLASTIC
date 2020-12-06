(function($) {

  "use strict";

  /*  =========================================================================
   Products gallery
  ========================================================================== */

  //Hide Loading Box (Preloader)
  function setupFilter() {
    var $container = $('.products-gallery');

    $container.isotope({
      // options
      itemSelector: '.product-item',
      layoutMode: 'fitRows',
      getSortData: {
        capacity: function(itemElem) {
          // console.log($(itemElem));
          // console.log($(itemElem).attr('data-category'));
          // if ($(itemElem).hasAttr('data-category')) {
          if (typeof $(itemElem) !== typeof undefined && $(itemElem) !== false) {
            var capacity = $(itemElem).attr('data-category');
            return parseInt(capacity);
          }
        }
      }
    });

    var filters = {};

    $('#products-filter li a').on('click', function() {

      var $filter = $( event.currentTarget );
      // get group key
      var $categoryGroup = $filter.parents('.categories-list');
      var filterGroup = $categoryGroup.attr('data-filter-group');

      filters[ filterGroup ] = $filter.attr('data-filter');

      var filterValue = concatValues(filters);

      $container.isotope({
        filter: filterValue,
        sortBy: 'capacity'
      });
    });

    // change is-checked class on buttons
    $('.categories-list').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'a', function( event ) {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        var $button = $( event.currentTarget );
        $button.addClass('is-checked');
      });
    });
  }

  function concatValues( obj ) {
    var value = '';
    for ( var prop in obj ) {
      value += obj[ prop ];
    }
    return value;
  }

  // $(window).on('load', function() {
  //   setupFilter();
  // });

  jQuery(document).on('ready', function () {
    (function ($) {
      setupFilter();
    })(jQuery);
  });


 })(window.jQuery);
