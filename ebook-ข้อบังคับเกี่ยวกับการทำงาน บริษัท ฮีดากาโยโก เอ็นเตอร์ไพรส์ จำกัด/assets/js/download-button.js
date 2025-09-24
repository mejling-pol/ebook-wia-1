/**
 * download-button.js
 * Handles the download button functionality
 */
(function($) {
  'use strict';

  $(document).ready(function() {
    // Add click event for the download button
    $('#ui-icon-download').on('click', function(event) {
      // The download attribute on the <a> tag should handle the download
      // If additional functionality is needed, it can be added here
      console.log('Download button clicked');
      
      // Optional: Add analytics or tracking code here
    });
  });
})(jQuery);