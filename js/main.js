 var navtoggled = 'off';
 $(function () {
     $('catlist a').mouseenter(function () {
         $('catlist').find('a').removeClass('active');
         var curTopList = $(this).attr('rel');
         $(this).addClass('active');
         $('toplist').find('a').fadeOut('0', function () {
             $('toplist').empty();
             $('toplist').load(curTopList);
         });
     });
     $('topnav a').mouseenter(function () {
         $('#megadrop').hide();
     });
     $('#hasmega').hover(function () {
         $('#megadrop').slideDown(250);
         $('#megadrop').mouseleave(function () {
             $('#megadrop').hide();
         });
     });
 });
 loadtiles = function () {
     $("#bloglisting").imagesLoaded(function () {
         var a = {
             itemWidth: 340,
             autoResize: true,
             container: $("#bloglisting"),
             offset: 15,
             outerOffset: 15,
             flexibleWidth: "50%"
         };
         var b = $("#bloglisting artycard");
         var c = $(window);
         c.resize(function () {
             var d = c.width(),
                 e = {
                     flexibleWidth: "50%"
                 };
             if (d < 1024) {
                 e.flexibleWidth = "100%"
             }
             b.wookmark(e)
         });
         b.wookmark(a)
     })
 };
 $(function () {
     $('.menu-link').click(function () {
         console.log(navtoggled);
         if (navtoggled == 'off') {
             $('.menu-link').empty();
             $('.menu-link').html('<i class="fa fa-times"></i>');
             navtoggled = 'on';
         } else if (navtoggled == 'on') {
             $('.menu-link').empty();
             $('.menu-link').html('<i class="fa fa-bars"></i>');
             navtoggled = 'off';
         }
     });
 });

 $(document).ready(function () {
     $('.menu-link').bigSlide();
 });