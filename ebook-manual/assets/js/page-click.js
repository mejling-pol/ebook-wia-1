// JavaScript file to handle page click events and sound
document.addEventListener('DOMContentLoaded', function() {
    // Page flip sound function
    function playPageFlipSound() {
      // Check if sound is enabled in settings (default true)
      if (window.FlipbookSettings && window.FlipbookSettings.enableSound !== false) {
        // Create audio element if doesn't exist
        if (!window.pageFlipSound) {
          window.pageFlipSound = new Audio('assets/sounds/page-flip.mp3');
          window.pageFlipSound.volume = 0.7; // Set volume to 70%
        }
        
        // Reset and play sound
        window.pageFlipSound.currentTime = 0;
        window.pageFlipSound.play().catch(function(error) {
          // Silently fail if audio can't be played (common in some browsers without user interaction)
          console.log('Audio play failed:', error);
        });
      }
    }
    
    // Export the function to be accessible from other modules
    window.playPageFlipSound = playPageFlipSound;
});
