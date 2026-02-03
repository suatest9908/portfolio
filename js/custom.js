// JavaScript Document; 도형컬러 수정

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });


    //skill - easyPieChart
    $(window).scroll( function(){

        /* Check the location of each desired element */
        $('.chart').each( function(i){
    
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
    
            /* If the object is completely visible in the window, fade it in */
            if( bottom_of_window > bottom_of_object ){

                $('.chart').easyPieChart({
                    barColor: '#4f76af',  /*원형 color변경하는곳*/
                    trackColor: '#adceff',/*track color변경하는곳*/
                    scaleColor: '#fff',
                    lineCap: 'round',
                    lineWidth: 15,
                    size: 200,
                    animate: 2000,
                    onStep: function(from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent)); }
                });
             }
        }); 
    });
    

});

// popup
    // $('.art1').click(function () {
    //     $('.pop1').fadeIn();
    // });
    // $('.art2').click(function () {
    //     $('.pop2').fadeIn();
    // });
    // $('.art3').click(function () {
    //     $('.pop3').fadeIn();
    // });


    // $('.art4').click(function () {
    //     $('.pop4').fadeIn();
    // });
    // $('.art5').click(function () {
    //     $('.pop5').fadeIn();
    // });
    // $('.art6').click(function () {
    //     $('.pop6').fadeIn();
    // });
    // $('.popup i').click(function () {
    //     $('.popup').fadeOut();
    // });

    // ✅ 1. 닫기 함수 정의
function closePopup($popup) {
    $popup.removeClass('active'); 
    setTimeout(function() {
        $popup.hide();
    }, 300);
}

// ✅ 2. 이벤트 연결 (기존 art1, art2 클릭 이벤트들을 이걸로 대체)
$('.art1').on('click', function(e) { 
    e.preventDefault(); 
    $('.pop1').show().addClass('active'); 
});
$('.art2').on('click', function(e) { e.preventDefault(); $('.pop2').show().addClass('active'); });
$('.art3').on('click', function(e) { e.preventDefault(); $('.pop3').show().addClass('active'); });

// ✅ 3. 닫기 버튼 및 배경 클릭 이벤트 (중복 방지를 위해 하나로 통합)
$('.popup .ion-close-round, .popup').on('click', function (e) {
    if ($(e.target).is('.popup') || $(e.target).is('.ion-close-round')) {
        e.preventDefault();
        closePopup($(this).closest('.popup'));
    }
});

swiperInstance = new Swiper('.cardnews', {
    slidesPerView: 2,       // ✅ 추가
    spaceBetween: 10,       // ✅ 슬라이드 간 간격
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    grabCursor: true,
    threshold: 10,
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        0: {
            slidesPerView: 1
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // const popup = document.querySelector('.popup.pop1');
    const openButtons = document.querySelectorAll('.artbox .art1');
    const closeBtn = popup.querySelector('.ion-close-round');

    let swiperInstance;

    function openPopup() {
        popup.classList.add('active');
        popup.style.display = 'flex';

        // if (!swiperInstance) {
        //     swiperInstance = new Swiper('.cardnews', {
        //         pagination: {
        //             el: '.swiper-pagination',
        //             clickable: true
        //         },
        //         grabCursor: true,
        //         threshold: 10
        //     });
        // }
    }

    function closePopup() {
        popup.classList.remove('active');
        popup.style.display = 'none';
    }

    openButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            openPopup();
        });
    });

    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', function (e) {
        if (e.target === popup) closePopup();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
});



			$(function() {
				$('a[href*="#"]:not([href="#"])').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
				$('html, body').animate({
				scrollTop: target.offset().top
				}, 500);//움직이는 시간 조정
				return false;
				}
				}
				});
				});

// ✅ custom.js (수정된 팝업 관련 코드)

// $(document).ready(function () {
//   function closePopup($popup) {
//     $popup.removeClass('active').fadeOut();
//   }

//   // 닫기 버튼 클릭 시 팝업 닫기
//   $('.popup .ion-close-round').click(function () {
//     closePopup($(this).closest('.popup'));
//   });

//   // 외부 클릭 시 팝업 닫기
//   $('.popup').on('click', function (e) {
//     const $content = $(this).children('div');
//     if (!$(e.target).closest($content).length) {
//       closePopup($(this));
//     }
//   });

  // ESC 키로 팝업 닫기
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.popup.active').each(function () {
        closePopup($(this));
      });
    }
  });

//   // 아트워크 클릭 시 팝업 열기
//   $('.art1').click(() => $('.pop1').addClass('active').fadeIn());
//   $('.art2').click(() => $('.pop2').addClass('active').fadeIn());
//   $('.art3').click(() => $('.pop3').addClass('active').fadeIn());
//   $('.art4').click(() => $('.pop4').addClass('active').fadeIn());
//   $('.art5').click(() => $('.pop5').addClass('active').fadeIn());
//   $('.art6').click(() => $('.pop6').addClass('active').fadeIn());
// });

// $(document).ready(function () {
//   function closePopup($popup) {
//     $popup.removeClass('active').fadeOut();
//   }

//   // 공통 닫기 버튼
//   $('.popup .ion-close-round').click(function () {
//     closePopup($(this).closest('.popup'));
//   });

//   // ✅ 팝업 외부 클릭 시 닫기 (모든 팝업, including pop1 + 모바일)
//   $('.popup').each(function () {
//     const $popup = $(this);
//     $popup.on('click', function (e) {
//       // 팝업 내부의 콘텐츠 div를 제외한 부분만 닫힘
//       if ($(e.target).closest('.swiper-container, .card_slide, .popup > div').length === 0) {
//         closePopup($popup);
//       }
//     });
//   });

//   // ESC 키
//   $(document).on('keydown', function (e) {
//     if (e.key === 'Escape') {
//       $('.popup.active').each(function () {
//         closePopup($(this));
//       });
//     }
//   });

//   // 각각의 팝업 열기
//   $('.art1').click(() => $('.pop1').addClass('active').fadeIn());
//   $('.art2').click(() => $('.pop2').addClass('active').fadeIn());
//   $('.art3').click(() => $('.pop3').addClass('active').fadeIn());
//   $('.art4').click(() => $('.pop4').addClass('active').fadeIn());
//   $('.art5').click(() => $('.pop5').addClass('active').fadeIn());
//   $('.art6').click(() => $('.pop6').addClass('active').fadeIn());
// });

// $(document).ready(function () {
//   function closePopup($popup) {
//     $popup.removeClass('active').fadeOut();
//   }

//   // 닫기 버튼 클릭 시
//   $('.popup .ion-close-round').on('click', function () {
//     closePopup($(this).closest('.popup'));
//   });

//   // 외부 클릭 시 (팝업 내부 콘텐츠 제외)
//   $('.popup').on('click', function (e) {
//     if ($(e.target).is('.popup')) {
//       closePopup($(this));
//     }
//   });

//   // ESC 키
//   $(document).on('keydown', function (e) {
//     if (e.key === 'Escape') {
//       $('.popup.active').each(function () {
//         closePopup($(this));
//       });
//     }
//   });

//   // 팝업 열기 (아트워크 클릭 시)
//   $('.art1').on('click', () => $('.pop1').addClass('active').fadeIn());
//   $('.art2').on('click', () => $('.pop2').addClass('active').fadeIn());
//   $('.art3').on('click', () => $('.pop3').addClass('active').fadeIn());
//   $('.art4').on('click', () => $('.pop4').addClass('active').fadeIn());
//   $('.art5').on('click', () => $('.pop5').addClass('active').fadeIn());
//   $('.art6').on('click', () => $('.pop6').addClass('active').fadeIn());
// });

// Top 버튼 사라졌다가 나타나기
$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    $('.top_button').addClass('show');
  } else {
    $('.top_button').removeClass('show');
  }
});

// about 구간에서 nav li a 색 변경하기
$(window).scroll(function() {    
    // 현재 스크롤 위치 파악
    var scroll = $(window).scrollTop();
    // 효과를 적용할 지점 (메인 배너의 높이 정도, 약 100~500px 사이로 조정 가능)
    var bannerHeight = $('#home').height() - 70; 

    if (scroll >= bannerHeight) {
        // 배너를 벗어나면 클래스 추가
        $("header").addClass("header-scrolled");
    } else {
        // 다시 상단으로 올라오면 클래스 제거
        $("header").removeClass("header-scrolled");
    }
});


$(document).ready(function () {
    // 1. 팝업 열기
    $('.art1, .art2, .art3').on('click', function (e) {
        e.preventDefault();
        var target = $(this).hasClass('art1') ? '.pop1' : ($(this).hasClass('art2') ? '.pop2' : '.pop3');
        // ✅ 열 때 0.4초 동안 스르륵 (fadeIn)
        $(target).css('display', 'flex').hide().fadeIn(400).addClass('active');
    });

    // 2. 팝업 닫기
    $('.popup').on('click', function (e) {
        if ($(e.target).is('.popup') || $(e.target).is('.ion-close-round') || $(e.target).is('.popup i')) {
            e.stopPropagation(); 
            
            var $thisPopup = $(this);
            // ✅ 닫을 때도 0.4초 동안 스르륵 (fadeOut)
            $thisPopup.removeClass('active').fadeOut(400); 
            
            // 애니메이션이 완전히 끝난 후 숨기기
            setTimeout(function(){
                $thisPopup.hide();
            }, 400);
        }
    });
});