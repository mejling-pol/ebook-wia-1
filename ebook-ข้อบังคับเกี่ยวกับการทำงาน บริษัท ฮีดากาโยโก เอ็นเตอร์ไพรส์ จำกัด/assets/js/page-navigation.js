/**
 * page-navigation.js
 * Script to handle side page navigation buttons
 */

(function($) {
  'use strict';

  // Page Navigation View
  var PageNavigationView = Backbone.View.extend({
    el: '#viewer',

    events: {
      'click .page-nav-button.prev': '_goToPrevPage',
      'click .page-nav-button.next': '_goToNextPage'
    },

    initialize: function() {
      // Store reference to the flipbook
      this.$flipbook = $('#flipbook');
      
      // Show/hide navigation buttons on hover
      this._setupHoverEffect();
      
      // Handle keyboard navigation
      this._setupKeyboardNavigation();
    },
    
    _goToPrevPage: function(e) {
      if (e) e.preventDefault();
      this.$flipbook.turn('previous');
    },
    
    _goToNextPage: function(e) {
      if (e) e.preventDefault();
      this.$flipbook.turn('next');
    },
    
    _setupHoverEffect: function() {
      var $buttons = $('.page-nav-button');
      var $viewer = $('#viewer');
      
      // Initially hide buttons
      $buttons.css('opacity', '0');
      
      // Show on hover over viewer
      $viewer.hover(
        function() {
          $buttons.stop().animate({ opacity: 0.6 }, 300);
        },
        function() {
          $buttons.stop().animate({ opacity: 0 }, 300);
        }
      );
      
      // Additional hover effect on buttons is handled by CSS
    },
    
    _setupKeyboardNavigation: function() {
      var self = this;
      
      // Listen for arrow key presses
      $(document).keydown(function(e) {
        switch(e.which) {
          case 37: // left arrow
            self._goToPrevPage();
            break;
          
          case 39: // right arrow
            self._goToNextPage();
            break;
            
          default: 
            return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action
      });
    }
  });

  // Singleton pattern
  PageNavigationView.getInstance = function() {
    if (!PageNavigationView.instance) {
      PageNavigationView.instance = new PageNavigationView();
    }
    return PageNavigationView.instance;
  };

  // Initialize view when document is ready
  $(document).ready(function() {
    PageNavigationView.getInstance();
  });

})(jQuery);