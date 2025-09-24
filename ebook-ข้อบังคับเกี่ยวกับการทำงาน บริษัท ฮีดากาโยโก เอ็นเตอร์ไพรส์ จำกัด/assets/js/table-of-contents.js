/**
 * table-of-contents.js
 * ฟังก์ชันสำหรับเพิ่มลิงก์ในหน้าสารบัญ
 */

(function ($) {
  'use strict';

  // ฟังก์ชันสำหรับเพิ่มลิงก์ในหน้าสารบัญ
  function initTableOfContents() {
    // สมมติว่าหน้าสารบัญอยู่ที่หน้า 2-3 (อาจต้องปรับตามเอกสารจริง)
    var tocPages = [1,4,5,25]; // หมายเลขหน้าสารบัญ (สามารถปรับเปลี่ยนได้)

    // กำหนด clickable areas บนหน้าสารบัญ
    var tocLinks = [
      // ตัวอย่างการกำหนดพื้นที่คลิก: [หน้าที่มีสารบัญ, บทความที่จะไป, พิกัด x เริ่มต้น, พิกัด y เริ่มต้น, ความกว้าง, ความสูง]
      // [หน้าสารบัญ, หน้าปลายทาง, x, y, width, height]
      [1, 'https://www.hidakayookoo.co.th', 30, 94, 40, 5.5],   // บทที่ 1 ไปยังหน้า 5

      [4, 1, 10, 32, 80, 3.5],   // บทที่ 1 ไปยังหน้า 5
      [4, 3, 10, 35.5, 80, 3.5],   // บทที่ 1 ไปยังหน้า 5
      [4, 5, 10, 39, 80, 3.3],   // บทที่ 1 ไปยังหน้า 5
      [4, 7, 10, 42.5, 80, 3.3],   // บทที่ 1 ไปยังหน้า 5
      [4, 9, 10, 46, 80, 3.3],   // บทที่ 1 ไปยังหน้า 5
      [4, 19, 10, 49.5, 80, 3.3],   // บทที่ 1 ไปยังหน้า 5
      [4, 21, 10, 53, 80, 3.1],   // บทที่ 1 ไปยังหน้า 5
      [4, 23, 10, 56.3, 80, 9.5],   // บทที่ 1 ไปยังหน้า 5
      [4, 27, 10, 66, 80, 5],   // บทที่ 1 ไปยังหน้า 5
      [4, 33, 10, 71, 80, 7.5],   // บทที่ 1 ไปยังหน้า 5
      [4, 39, 10, 78.5, 80, 14],   // บทที่ 1 ไปยังหน้า 5
      
      [5, 57, 10, 32, 80, 17.2],   // บทที่ 1 ไปยังหน้า 5
      [5, 63, 10, 49.5, 80, 19.7],   // บทที่ 1 ไปยังหน้า 5
      [5, 77, 10, 69.3, 80, 15],   // บทที่ 1 ไปยังหน้า 5

      [25, 'https://drive.google.com/file/d/1uRBQbNaVxKXdiRXdP5RhwQBK2l6hPgFF/view?usp=sharing', 56, 64, 40, 5],   // บทที่ 1 ไปยังหน้า 5

      // เพิ่มรายการเพิ่มเติมตามต้องการ
    ];

    // สไตล์สำหรับพื้นที่คลิก
    var linkStyle = {
      'position': 'absolute',
      'cursor': 'pointer',
      'z-index': 10,
      'background-color': 'rgba(0,0,0,0.0)', // โปร่งใส
      'border': '1px solid rgba(0,0,0,1)', // เส้นขอบบางๆ ช่วยให้เห็นพื้นที่
      'border-radius': '4px'
    };

    // เพิ่มพื้นที่คลิกไปยังหน้าสารบัญ
    function createTocLinks() {
      // ลบลิงก์เก่าทั้งหมด (ถ้ามี)
      $('.toc-link-area').remove();

      // สร้างลิงก์ใหม่
      tocLinks.forEach(function (link) {
        var tocPage = link[0];
        var targetPage = link[1];
        var x = link[2];
        var y = link[3];
        var width = link[4];
        var height = link[5];

        // ตรวจสอบว่าหน้าสารบัญมีอยู่จริงหรือไม่
        var $pageWrapper = $('.page-wrapper[page="' + tocPage + '"]');
        if ($pageWrapper.length === 0) {
          return; // ข้ามหากไม่พบหน้า
        }

        // สร้างพื้นที่คลิก
        var $linkArea = $('<div>')
          .addClass('toc-link-area') // เพิ่มคลาสเพื่อให้ง่ายต่อการลบ
          .css(Object.assign({}, linkStyle, {
            'left': x + '%',
            'top': y + '%',
            'width': width + '%',
            'height': height + '%'
          }))
          .attr('title', 'ไปที่หน้า ' + (+link[1] + 5));

        // เพิ่ม hover effect เมื่อเมาส์ชี้
        $linkArea.hover(
          function () {
            $(this).css('background-color', 'rgba(0,0,255,0.1)'); // เมื่อ hover จะเห็นสีน้ำเงินอ่อนๆ
          },
          function () {
            $(this).css('background-color', 'rgba(0,0,0,0.0)'); // กลับเป็นโปร่งใส
          }
        );

        // ฟังก์ชันจัดการการคลิก/แตะ
        function handleLinkClick(e) {
          e.preventDefault();
          e.stopPropagation();

          if (typeof targetPage === 'string' && targetPage.startsWith('http')) {
            // open external link in new tab
            window.open(targetPage, '_blank');
            return false;
          }

          var flipbook = $('.ui-flipbook');
          if (flipbook.turn) {
            flipbook.turn('page', +targetPage + 5);
            // เล่นเสียงเปลี่ยนหน้า
            if (window.playPageFlipSound) {
              window.playPageFlipSound();
            }
          }

          return false;
        }

        // เพิ่ม event listeners สำหรับทั้ง desktop และ mobile
        $linkArea.on('click tap touchend', handleLinkClick);
        
        // เพิ่ม touch events สำหรับมือถือโดยเฉพาะ
        $linkArea[0].addEventListener('touchstart', function(e) {
          e.preventDefault();
          handleLinkClick(e);
        }, { passive: false });
        
        // $linkArea[0].addEventListener('touchend', function(e) {
        //   // e.preventDefault();
        //   // handleLinkClick(e);
        // }, { passive: false });

        // เพิ่มพื้นที่คลิกไปยังหน้าสารบัญ
        $pageWrapper.find('.page').append($linkArea);
      });

      console.log('Created TOC links');
    }

    // ตรวจสอบว่า Turn.js โหลดเสร็จหรือยัง
    function checkFlipbookReady() {
      var flipbook = $('.ui-flipbook');

      if (flipbook.length > 0 && typeof flipbook.turn === 'function') {
        // รับฟังเหตุการณ์ turned
        flipbook.bind('turned', function (event, page, view) {
          // ตรวจสอบว่าหน้าปัจจุบันเป็นหน้าสารบัญหรือไม่
          if (tocPages.indexOf(page) !== -1 ||
            (view && (tocPages.indexOf(view[0]) !== -1 || tocPages.indexOf(view[1]) !== -1))) {
            // เพิ่มลิงก์สำหรับหน้าสารบัญ
            setTimeout(createTocLinks, 100);
          }
        });

        // ใส่ลิงก์ตั้งแต่เริ่มต้น
        setTimeout(createTocLinks, 500);

        return;
      }

      // ถ้ายังไม่พร้อม ลองอีกครั้งในอีก 500ms
      setTimeout(checkFlipbookReady, 500);
    }

    // เริ่มการตรวจสอบ
    checkFlipbookReady();
  }

  // เริ่มต้นทำงานเมื่อ document พร้อม
  $(document).ready(function () {
    initTableOfContents();
  });

})(jQuery);