(function($){
  'use strict';
  $(function(){
    if (window.innerWidth > 768) return;
    
    const $carousel = $('.process-carousel-v2');
    if (!$carousel.length) return;
    
    const $wrapper = $carousel.find('.pcv2-wrapper');
    const $track = $carousel.find('.pcv2-track');
    const $slides = $carousel.find('.pcv2-slide');
    const $dots = $carousel.find('.pcv2-dot');
    const $prev = $carousel.find('.pcv2-btn.prev');
    const $next = $carousel.find('.pcv2-btn.next');
    
    let current = 0;
    let slideW = 0;

    function measure(){ 
      slideW = Math.round($wrapper[0].getBoundingClientRect().width); 
      if (slideW > 0) {
        $slides.css({'width': slideW + 'px', 'min-width': slideW + 'px', 'max-width': slideW + 'px'}); 
        $track.css('width', (slideW * $slides.length) + 'px'); 
      }
    }
    
    function go(i){ 
      if ($slides.length === 0 || slideW === 0) return;
      current = ((i % $slides.length) + $slides.length) % $slides.length;
      const offset = -current * slideW;
      $track.css('transform', 'translateX(' + offset + 'px)'); 
      $dots.removeClass('active').eq(current).addClass('active'); 
    }

    $next.on('click', function(e){ 
      e.preventDefault(); 
      go(current + 1); 
    });
    
    $prev.on('click', function(e){ 
      e.preventDefault(); 
      go(current - 1); 
    });
    
    $dots.on('click', function(e){ 
      e.preventDefault(); 
      const index = parseInt($(this).data('slide'), 10);
      if (!isNaN(index)) go(index); 
    });

    let startX = 0; 
    $track.on('touchstart', function(e){ 
      startX = e.originalEvent.touches[0].clientX; 
    });
    
    $track.on('touchend', function(e){ 
      const endX = e.originalEvent.changedTouches[0].clientX; 
      const diff = startX - endX; 
      if (Math.abs(diff) > 50) { 
        go(current + (diff > 0 ? 1 : -1));
      }
    });

    setTimeout(function(){
      measure(); 
      go(0);
    }, 250);
    
    let resizeTimer; 
    $(window).on('resize.pcv2', function(){ 
      clearTimeout(resizeTimer); 
      resizeTimer = setTimeout(function(){ 
        measure(); 
        go(current); 
      }, 250); 
    });
  });
})(jQuery);
