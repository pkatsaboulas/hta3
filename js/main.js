$(function(){
	
	// Variables   
    var $window = $(window),    
        fsImg = $('.img-fs'),
        startwidth= 640, 
        startheight= 360,
        ratio = startheight/startwidth,
        imagewidth = $(this).width(),
        imageheight = $(this).height(),
        browserwidth = $(window).width(),
        browserheight = $(window).height();

    $window.on('beforeunload', function(){
        $window.scrollTop(0);
    });

    //Window load
    $window.on('load', function(){

        setTimeout(function(){

            $('.loader').fadeOut(function(){

                $('#hta-bg').fadeIn();
                $('.hero, .page-hero, header, .logo, .scrolling-mouse, #video').addClass('active'); 

                if( $('body').hasClass('page') ){

                    setTimeout(function(){

                        $('.page-hero .border').addClass('start'); 
                        TweenMax.to($('.page-hero'), 0.8, {
                            height: 0,   
                            ease: Power3.easeOut,
                            delay: 0.4,
                            overwrite: 5,
                            onComplete:function(){
                                $('body').removeClass('lock');
                            }                    
                        });

                    }, 1500);

                }

            });

        }, 1000);

    });

                
    // Window resize handler
    $window.on('resize', function(){ 
        
        imagewidth = $(this).width();
        imageheight = $(this).height();
        browserwidth = $(window).width();
        browserheight = $(window).height();
               
        fsImage(); 
                        
    });

    // Fullscreen image/video
    function fsImage(){
     
        if ((browserheight/browserwidth) > ratio){
            fsImg.height(browserheight);
            fsImg.width(browserheight / ratio);
        } else {
            fsImg.width(browserwidth);
            fsImg.height(browserwidth * ratio);
        };
        fsImg.css('left', (browserwidth - fsImg.width())/2);
        fsImg.css('top', (browserheight - fsImg.height())/2);

    };
    fsImage();


    // Scrolling animation stuff
    var scrollTime = 1.5;
    var scrollDistance = 250;

    $window.on("mousewheel", function(event){

        event.preventDefault();

        var delta       = event.originalEvent.wheelDelta/120;
        var scrollTop   = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta*scrollDistance) * 3;
        var plax        = $('.plax');
        var imgBox      = $('.img-box');
        var slideText   = $('.slide h2');


        if( !$('body').hasClass('lock') ){

            TweenMax.to($window, scrollTime, {
                scrollTo : { y: finalScroll, autoKill:true },
                ease: Power3.easeOut,
                overwrite: 5                         
            }); 

        }

        plax.each(function(){

            var offset     = $(this).offset().top;
            var plaxScroll = -Math.round(offset - scrollTop)*0.08
           
            
            TweenMax.to($(this), scrollTime, {
                y: plaxScroll,
                ease: Power3.easeOut                      
            }); 

        });     

        imgBox.each(function(){

            var offset     = $(this).offset().top;
            var plaxScroll = -Math.round(offset - scrollTop)*0.05
           
            
            TweenMax.to($(this), scrollTime, {
                y: plaxScroll,
                ease: Power3.easeOut                      
            }); 

        });     

        slideText.each(function(){

            var offset     = $(this).offset().top;
            var plaxScroll = Math.round(offset - scrollTop)*0.05
           
            
            TweenMax.to($(this), scrollTime, {
                y: plaxScroll,
                ease: Power3.easeOut                      
            }); 

        });     

    });

    var throttle = setInterval(function(){

        var top    = $window.scrollTop();
         
        if( top > 0 ){
            $('.scrolling-mouse').addClass('hide');
            $('.hero .border').addClass('start');          
        } else{
            $('.hero .border').removeClass('start');
            $('.scrolling-mouse').removeClass('hide');
        }

        $('.show').each(function(){

            var offset = $(this).offset().top - top;
            if( offset <= $window.height()/2.5 ){
                $(this).addClass('active');
            }

        });

    },100);

    //Slick slider
    $('.slider').slick({
          infinite:false,
          dots:true,
          customPaging : function(slider, i) { 
            return '<a></a>';
          },
          arrows:false,
          slidesToShow:1,
          slidesToScroll:1
    });

    //Custom content slider
    var count = 0;
 
    function moveSlides(){

        $('.content-slider-slide').eq(count).addClass('active').siblings().removeClass('active');

        var dist  = $('.content-slider-slide.active').offset().left - $('.slider-track').offset().left;

        TweenMax.to($('.slider-track'), 1.6, {
            x: -dist,   
            ease: Power3.easeInOut,
            overwrite: 5,
            onComplete:function(){
                
            }                    
        });
        TweenMax.to($('.content-slider-slide'), 1.2, {
            opacity: 0,   
            ease: Power3.easeInOut
        });
        TweenMax.to($('.content-slider-slide.active'), 1.2, {
            opacity: 1,   
            ease: Power3.easeInOut    
        });

    }

    $('.content-slider-nav li').on('click', function(){

        var index = $(this).index();

        $(this).addClass('active').siblings().removeClass('active');
        count = index;
        moveSlides();

    });


	
});


