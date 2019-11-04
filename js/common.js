$(function() {


    $(window).on('load resize', function () {
        $('.with-blur').each(function () {
            var blurElemWrap = $(this).find('.side');
            var blurElem = blurElemWrap.find('span');
            var sWidth = $(this).outerWidth();
            var sHeight = $(this).outerHeight();
            var offsetLeft = blurElemWrap.offset().left;
            blurElem.css('width', sWidth).css('height', sHeight + 50).css('left', - offsetLeft);
        });
    }).on('resize', function () {
        $('.doctors-item').removeClass('open');
        $('.buttons').removeClass('low');
        $('.modal-doctor').removeClass('open');
    });

	$('.menu-toggle').on('click', function () {
       $(this).toggleClass('active');
       $('.header').toggleClass('open');
       $('.menu-block').toggleClass('open');
       $('.section-in, .buttons').toggleClass('invisible');
    });

    $('#content').fullpage({
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        responsiveHeight: 620,
        responsiveWidth: 767,
        afterLoad: function(origin){
            let fordoctors = $('.fordoctors');
            let contacts = $('.contacts-s');
            if(fordoctors.hasClass('active')){
                $('.buttons').addClass('here');
                $('.fb-link').attr('href', 'https://www.facebook.com/ophthalmologists.page/');
            }else{
                $('.buttons').removeClass('here');
                $('.fb-link').attr('href', 'https://www.facebook.com/ZnamenskaMD/');
            }
            if(contacts.hasClass('active')){
                $('.buttons').addClass('last');
            }else{
                $('.buttons').removeClass('last');
            }
        },
        onLeave: function(section){
            $('.doctors-item').removeClass('open');
            $('.buttons').removeClass('low');
            $('.modal-doctor').removeClass('open');
        }
    });

    if (window.location.pathname == '/'){
        $('body').addClass('home');
        var redirected = localStorage.getItem('redirected');
        if(redirected === 'true'){
            var link = localStorage.getItem('link');
            if(link !== null){
                var menuTargetNum = parseInt(link);
                $.fn.fullpage.moveTo(menuTargetNum);
            }

            var fordoctors = localStorage.getItem('fordoctors');
            if(fordoctors === 'true'){
                $.fn.fullpage.moveTo(8);
            }

            localStorage.clear();
        }
    }else{
        var redirected = localStorage.setItem('redirected', 'true');
        $('.menu-in a:not(.link)').on('click', function (e) {
            var aId = $(this).attr('data-target');
            var link = localStorage.setItem('link', aId);
            window.location.href = "/";
            e.preventDefault();
        });

        $('.to-fordoctors').on('click', function () {
            var fordoctors = localStorage.setItem('fordoctors', 'true');
            window.location.href = "/";
        });
    }

    $('.home .menu-in a:not(.link)').on('click', function (e) {
        e.preventDefault();
        $('.menu-toggle.active').trigger('click');
        var menuTarget = $(this).attr('data-target');
        var menuTargetNum = parseInt(menuTarget);
        $.fn.fullpage.moveTo(menuTargetNum);
    });

    $('.to-team').on('click', function () {
        $.fn.fullpage.moveTo(3);
    });

    $('.home .to-fordoctors').on('click', function () {
        $.fn.fullpage.moveTo(8);
    });

    $('.faq-item-title').on('click', function () {
       $(this).toggleClass('active').next().slideToggle('fast').parent().siblings().find('.faq-item-title').removeClass('active').next().slideUp('fast');
    });

    $('.reviews-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: false,
        loop: true,
        responsive:{
            0:{
                margin: 30,
                dots: true
            },
            767:{
                margin: 16
            },
            1023:{
                margin: 20
            },
            1330:{
                margin: 125
            },
            1855:{
                margin: 180
            }
        }
    });

    $('.modal-open').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.modal-custom').removeClass('open');
       var modalTarget = $(this).attr('data-target');
       $(modalTarget).addClass('open');
    });

    $('.modal-custom-close, .modal-custom-back, .btn-custom-back').on('click', function () {
       $(this).closest('.modal-custom').removeClass('open');
    });

    $('.tabs-nav-item').on('click', function () {
       $(this).addClass('active').siblings().removeClass('active');
        var tabTarget = $(this).attr('data-target');
       $(tabTarget).addClass('active').siblings().removeClass('active');

       var packNum = $(this).attr('data-id');

       $('.to-pack').attr('data-target', packNum);
    });

    $('.to-pack').on('click', function () {
        var packNum = $(this).attr('data-target');
        var packSend = localStorage.setItem('pack', packNum);
    });

    if (window.location.pathname == '/services.html'){
        var packGet = localStorage.getItem('pack');
        if(packGet !== null){
            $('html, body').animate({
                scrollTop: $('.table[data-id=' + packGet +']').offset().top - 50
            }, 700);
            localStorage.removeItem('pack');
        }
    }

    $('.main-item').on('mouseover', function () {
        var date = new Date();
        var imgFirst = $(this).find('img');
        var imgSrc = imgFirst.attr('src');
        imgFirst.attr('src', imgSrc + '?' + date.getTime());
    });

    $(window).click(function() {
        $('.doctors-item').removeClass('open');
        $('.buttons').removeClass('low');
    });

    $('.doctors-item-overlay').on('click', function (e) {

        if($(this).hasClass('info-open')){
            $(this).closest('.doctors-item').addClass('open').siblings().removeClass('open');
            $('.buttons').addClass('low');
            e.stopPropagation();
        }else if($(this).hasClass('modal-open')){
            var modalDoctor = $(this).closest('.doctors-item').clone();
            $('.modal-doctor .modal-custom-wrap').html(modalDoctor);
        }
    });



});
