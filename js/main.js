jQuery(document).ready(function(){
    // Search
    //$('.form-field__enter').change(function(){
    //    if ($(this).val() != '') {
    //        $(this).addClass('_not-empty');
    //    } else {
    //        $(this).removeClass('_not-empty');
    //    }
    //});

    // Main Menu Mobile
    //$(function() {
    //    $('.header-menu__mobile').click(function() {
    //        $('.header-menu__list').toggleClass('_active');
    //        $(this).toggleClass('_active');
    //        $('.wrapper').toggleClass('_menu');
    //    });
    //    $('body').click(function (e) {
    //        if( !$(e.target).closest(".header-menu, .header-menu__mobile").length && $(".wrapper._menu").is(':visible')){
    //            $('.header-menu').toggleClass('_active');
    //            $(this).toggleClass('_active');
    //            $('.wrapper').toggleClass('_menu');
    //        }
    //    });
    //});

    // Fix Menu
    //var mainMENUTwo  = $('.header__inner'),
    //    mMoTTwo  = mainMENUTwo[0].offsetTop;
    //$(window).on('load scroll', function (e) {
    //    if ($(window).scrollTop() > mMoTTwo) {
    //        mainMENUTwo.addClass('_fix');
    //    } else {
    //        mainMENUTwo.removeClass('_fix');
    //    }
    //});


    // Tel Mask
    //if( "inputmask" in $.fn ) {
    //    $(".mask-number").inputmask("+7 (999) 999-99-99");
    //}

    // Popup
    //$(function() {
    //    $('.feedback-open').click(function () {
    //        $("#w-feedback").fadeIn();
    //        return false;
    //    });
    //    $('.popup__close').click(function (e) {
    //        if($("#w-feedback").is(':visible')){
    //            $("#w-feedback").fadeOut();
    //        }
    //    });
    //    $('body').click(function (e) {
    //        if( !$(e.target).closest(".popup__wrapper").length && $("#w-feedback").is(':visible')){
    //            $("#w-feedback").fadeOut();
    //        }
    //    });
    //});
	
    // Popup Video
    //$('.open-video').click(function () {
    //    $("#w-video").fadeIn();
    //    var srcFrame = $("#w-video iframe").attr("src");
    //    $("#w-video iframe").attr("data-srcframe", srcFrame);
    //    $("#w-video iframe").attr("src", srcFrame + "&autoplay=1");
    //    return false;
    //});
    //$('.popup__close._video').click(function (e) {
    //    if($("#w-video").is(':visible')){
    //        $("#w-video").fadeOut();
    //        $("#w-video iframe").attr("src", $("#w-video iframe").attr("data-srcframe"));
    //    }
    //});
    //$('#w-video').click(function (e) {
    //    if( !$(e.target).closest(".popup__wrapper").length && $("#w-video").is(':visible')){
    //        $("#w-video").fadeOut();
    //        $("#w-video iframe").attr("src", $("#w-video iframe").attr("data-srcframe"));
    //    }
    //});	

    // Slider Reviews
    //if( "slick" in $.fn ) {
    //    $('.big-slider__list').slick({
    //        arrows: false, //навигационные кнопоки
    //        dots: true, //точки навигации
    //        respondTo: 'window',
    //        draggable: true, //перелистывания мышью
    //        infinite: false, //Бесконечная прокрутка
    //        adaptiveHeight: true,
    //        speed: 300,
    //        slidesToShow: 1,
    //        slidesToScroll: 1
    //    });
    //    $('.product__ul').slick({
    //        arrows: true, //навигационные кнопоки
    //        dots: false, //точки навигации
    //        respondTo: 'window',
    //        draggable: true, //перелистывания мышью
    //        infinite: true, //Бесконечная прокрутка
    //        adaptiveHeight: true,
    //        speed: 300,
    //        slidesToShow: 5,
    //        slidesToScroll: 1,
    //        responsive: [
    //            {
    //                breakpoint: 1064,
    //                settings: {
    //                    slidesToShow: 4
    //                }
    //            },
    //            {
    //                breakpoint: 430,
    //                settings: {
    //                    slidesToShow: 1,
    //                    slidesToScroll: 1
    //
    //                }
    //            }
    //
    //        ]
    //    });
    //}


    // Show Big Photo
    //if( "fancybox" in $.fn ) {
    //    $(".show-photo").fancybox({
    //        openEffect: 'elastic',
    //        closeEffect: 'elastic',
    //        padding: 0,
    //        autoCenter: true,
    //        helpers 			: {
    //            title 			: {
    //                type 				: 'inside'
    //            }
    //        }
    //    });
    //}


    // Scroll Arrow
    //jQuery( document ).ready(function($){
    //    var $root = $('html, body');
    //    $('._arrow-scroll, .scrollTop').on("click", function(){
    //        var href = $(this).attr("href");
    //        $root.animate({
    //            scrollTop: $(href).offset().top
    //        }, 700, function () {
    //            window.location.hash = href;
    //        });
    //        return false;
    //    });
    //});

    // Scroll Button Up
    //jQuery( document ).ready(function($){
    //    var
    //        speed = 500,
    //        $scrollTop = $("<a/>")
    //            .addClass('scrollTop')
    //            .attr({href:'#top', style:'display:none;'})
    //            .appendTo('body');
    //
    //    $scrollTop.on("click", function(e){
    //        e.preventDefault();
    //
    //        $( 'html:not(:animated),body:not(:animated)' ).animate({ scrollTop: 0}, speed );
    //    });
    //
    //    function show_scrollTop(){
    //        ( $(window).scrollTop() > 300 ) ? $scrollTop.fadeIn(600) : $scrollTop.fadeOut(600);
    //    }
    //    $(window).on("scroll", function(){show_scrollTop()} );
    //    show_scrollTop();
    //});

});