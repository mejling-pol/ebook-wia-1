/**
 * sound-toggle.js
 * ฟังก์ชันสำหรับเปิด/ปิดเสียง
 */
(function($) {
  'use strict';

  $(document).ready(function() {
    // กำหนดค่าเริ่มต้นสำหรับเสียง
    if (typeof window.FlipbookSettings === 'undefined') {
      window.FlipbookSettings = {};
    }
    
    // เสียงเปิดตามค่าเริ่มต้น (true)
    if (typeof window.FlipbookSettings.enableSound === 'undefined') {
      window.FlipbookSettings.enableSound = true;
    }

    // อัปเดตไอคอนตามสถานะเสียง
    function updateSoundIcon() {
      var $soundIcon = $('#ui-icon-sound i');
      if (window.FlipbookSettings.enableSound) {
        $soundIcon.removeClass('fa-volume-off').addClass('fa-volume-up');
        $('#ui-icon-sound').attr('title', 'ปิดเสียง');
      } else {
        $soundIcon.removeClass('fa-volume-up').addClass('fa-volume-off');
        $('#ui-icon-sound').attr('title', 'เปิดเสียง');
      }
    }

    // ตั้งค่าไอคอนเริ่มต้น
    updateSoundIcon();

    // เพิ่ม event listener สำหรับปุ่มเสียง
    $('#ui-icon-sound').on('click', function(e) {
      e.preventDefault();
      
      // สลับสถานะเสียง
      window.FlipbookSettings.enableSound = !window.FlipbookSettings.enableSound;
      
      // อัปเดตไอคอน
      updateSoundIcon();
      
      // บันทึกการตั้งค่าใน localStorage
      try {
        localStorage.setItem('flipbook-sound-enabled', window.FlipbookSettings.enableSound);
      } catch (error) {
        console.log('ไม่สามารถบันทึกการตั้งค่าเสียงได้:', error);
      }
      
      console.log('เสียง:', window.FlipbookSettings.enableSound ? 'เปิด' : 'ปิด');
    });

    // โหลดการตั้งค่าจาก localStorage
    try {
      var savedSetting = localStorage.getItem('flipbook-sound-enabled');
      if (savedSetting !== null) {
        window.FlipbookSettings.enableSound = savedSetting === 'true';
        updateSoundIcon();
      }
    } catch (error) {
      console.log('ไม่สามารถโหลดการตั้งค่าเสียงได้:', error);
    }
  });

})(jQuery);