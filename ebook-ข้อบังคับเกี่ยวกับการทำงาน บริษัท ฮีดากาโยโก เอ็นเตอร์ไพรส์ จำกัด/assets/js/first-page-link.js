/**
 * first-page-link.js
 * ฟังก์ชันสำหรับเพิ่มลิงก์บนหน้าแรกไปยังเว็บไซต์
 */

(function($) {
  'use strict';

  // ฟังก์ชันเพิ่มลิงก์ไปยังเว็บไซต์บนหน้าแรก
  function addWebsiteLink() {
    // หน้าแรกคือหน้า 1
    var firstPage = 1;

    // เพิ่มลิงก์หลังจาก flipbook โหลดเสร็จ
    function createWebsiteLink() {
      // ตรวจสอบว่ามีหน้าแรกหรือไม่
      var $firstPageElement = $('.page-wrapper[page="' + firstPage + '"]');
      
      if ($firstPageElement.length === 0) {
        console.log('ไม่พบหน้าแรก จะลองอีกครั้งภายหลัง');
        setTimeout(createWebsiteLink, 500);
        return;
      }
      
      // ลบลิงก์เก่า (ถ้ามี)
      $('.website-link').remove();
      
      // URL ที่ต้องการลิงก์ไป
      var websiteUrl = 'https://www.hidakayookoo.co.th';
      
      // สร้างลิงก์บนหน้าแรก - ปรับตำแหน่งตามต้องการ
      var $linkArea = $('<div>')
        .addClass('website-link ui-region ui-region-link')
        .css({
          bottom: '0%',  // ขยับขึ้นไปเพื่อให้เหลือที่ว่างข้างล่าง
          left: '50%',   // กึ่งกลางหน้า
          zIndex: 100,
          position: 'absolute',
          cursor: 'pointer',
          backgroundColor: 'rgba(0,0,0,0.0)', // โปร่งใส
          // border: '1px solid rgba(0,0,0,1)', // เส้นขอบบางๆ ช่วยให้เห็นพื้นที่
          borderRadius: '4px'
        })
        .attr('title', 'ไปที่เว็บไซต์ ' + websiteUrl);
      
      // เพิ่มข้อความในลิงก์
      var $linkText = $('<div>')
        .html('')
        .css({
          color: '#0066cc',
          fontSize: '16px',
          fontWeight: 'bold',
          textDecoration: 'underline'
        });
      
      $linkArea.append($linkText);
      
      // เพิ่ม hover effect
      $linkArea.hover(
        function() {
          $(this).css('backgroundColor', 'rgba(0,102,204,0.1)');
          $linkText.css('color', '#004499');
        },
        function() {
          $(this).css('backgroundColor', 'rgba(0,0,0,0.02)');
          $linkText.css('color', '#0066cc');
        }
      );
      
      // เพิ่ม click event
      $linkArea.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // เปิดเว็บไซต์ในแท็บใหม่
        window.open(websiteUrl, '_blank');
        
        return false;
      });
      
      // เพิ่มลงในหน้าแรก
      $firstPageElement.find('.page').append($linkArea);
      
      console.log('เพิ่มลิงก์ไปยังเว็บไซต์บนหน้าแรกเรียบร้อย');
    }
    
    // ตรวจสอบว่า Turn.js โหลดเสร็จแล้วหรือไม่
    function checkFlipbookReady() {
      var flipbook = $('.ui-flipbook');
      
      if (flipbook.length > 0 && typeof flipbook.turn === 'function') {
        // รับฟังเหตุการณ์ turned
        flipbook.bind('turned', function(event, page, view) {
          // ถ้าเปลี่ยนมาที่หน้าแรก ให้สร้างลิงก์
          if (page === firstPage || (view && view.indexOf(firstPage) !== -1)) {
            setTimeout(createWebsiteLink, 100);
          }
        });
        
        // เพิ่มลิงก์ตั้งแต่เริ่มต้น หากเริ่มจากหน้าแรก
        setTimeout(createWebsiteLink, 500);
        
        return;
      }
      
      // ถ้ายังไม่พร้อม ลองอีกครั้งในอีก 500ms
      setTimeout(checkFlipbookReady, 500);
    }
    
    // เริ่มการตรวจสอบ
    checkFlipbookReady();
  }
  
  // เริ่มต้นทำงานเมื่อ document พร้อม
  $(document).ready(function() {
    addWebsiteLink();
  });
  
})(jQuery);