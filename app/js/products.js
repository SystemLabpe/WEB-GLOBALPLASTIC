(function($) {

  "use strict";

  /*  =========================================================================
   Products gallery
  ========================================================================== */
  var $container = $('.products-gallery');

  $container.isotope({
    // options
    itemSelector: '.product-item',
    layoutMode: 'fitRows'
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
      filter: filterValue
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

  function concatValues( obj ) {
    var value = '';
    for ( var prop in obj ) {
      value += obj[ prop ];
    }
    return value;
  }

 })(window.jQuery);
