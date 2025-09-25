/**
 * home-button.js
 * สคริปต์สำหรับจัดการปุ่มกลับไปหน้าแรก
 */

(function($) {
    'use strict';
    
    function initHomeButton() {
        // ตรวจสอบว่า Turn.js โหลดเสร็จหรือยัง
        function checkFlipbookReady() {
            var flipbook = $('.ui-flipbook');
            
            if (flipbook.length > 0 && typeof flipbook.turn === 'function') {
                // เพิ่ม event listener สำหรับปุ่มกลับหน้าแรก
                $('#ui-icon-home').on('click', function(e) {
                    e.preventDefault();
                    
                    // ไปที่หน้าแรก (หน้า 1)
                    flipbook.turn('page', 1);
                    
                    // แสดงข้อความแจ้งเตือนว่าได้กลับไปหน้าแรกแล้ว
                    showNotification('กลับไปที่หน้าแรกแล้ว', 2000);
                });
                
                // เพิ่มปุ่มลอยสำหรับกลับหน้าแรก (เพิ่มเติม)
                // addFloatingHomeButton();
                
                return;
            }
            
            // ถ้ายังไม่พร้อม ลองอีกครั้งในอีก 500ms
            setTimeout(checkFlipbookReady, 500);
        }
        
        // สร้างปุ่มลอยสำหรับกลับหน้าแรก
        // function addFloatingHomeButton() {
        //     // ตรวจสอบว่ามีปุ่มอยู่แล้วหรือไม่
        //     if ($('#floating-home-button').length > 0) {
        //         return;
        //     }
            
        //     // สร้าง CSS สำหรับปุ่มลอย
        //     var style = $('<style>')
        //         .html(`
        //             #floating-home-button {
        //                 position: fixed;
        //                 bottom: 20px;
        //                 right: 20px;
        //                 width: 40px;
        //                 height: 40px;
        //                 background-color: #007bff;
        //                 color: white;
        //                 border-radius: 50%;
        //                 text-align: center;
        //                 line-height: 40px;
        //                 cursor: pointer;
        //                 box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        //                 z-index: 9999;
        //                 transition: all 0.3s ease;
        //                 opacity: 0.7;
        //             }
        //             #floating-home-button:hover {
        //                 transform: scale(1.1);
        //                 opacity: 1;
        //             }
        //             .notification {
        //                 position: fixed;
        //                 top: 20px;
        //                 left: 50%;
        //                 transform: translateX(-50%);
        //                 background-color: rgba(0,0,0,0.7);
        //                 color: white;
        //                 padding: 10px 20px;
        //                 border-radius: 5px;
        //                 z-index: 10000;
        //                 opacity: 0;
        //                 transition: opacity 0.3s ease;
        //             }
        //         `);
        //     $('head').append(style);
            
        //     // สร้างปุ่ม
        //     var $button = $('<div>')
        //         .attr('id', 'floating-home-button')
        //         .attr('title', 'กลับไปหน้าแรก')
        //         .html('<i class="fa fa-home"></i>')
        //         .appendTo('body');
            
        //     // เพิ่ม event listener
        //     $button.on('click', function() {
        //         var flipbook = $('.ui-flipbook');
        //         if (flipbook.turn) {
        //             flipbook.turn('page', 1);
        //             showNotification('กลับไปที่หน้าแรกแล้ว', 2000);
        //         }
        //     });
        // }
        
        // ฟังก์ชันสำหรับแสดงข้อความแจ้งเตือน
        function showNotification(message, duration) {
            // ลบการแจ้งเตือนเดิม (ถ้ามี)
            $('.notification').remove();
            
            // สร้างและแสดงการแจ้งเตือน
            var $notification = $('<div>')
                .addClass('notification')
                .text(message)
                .appendTo('body');
            
            // แสดงการแจ้งเตือน
            setTimeout(function() {
                $notification.css('opacity', '1');
            }, 10);
            
            // ซ่อนและลบการแจ้งเตือนหลังจากเวลาที่กำหนด
            setTimeout(function() {
                $notification.css('opacity', '0');
                setTimeout(function() {
                    $notification.remove();
                }, 300);
            }, duration);
        }
        
        // เริ่มการตรวจสอบ
        checkFlipbookReady();
    }
    
    // เริ่มต้นทำงานเมื่อ document พร้อม
    $(document).ready(function() {
        initHomeButton();
    });
    
})(jQuery);