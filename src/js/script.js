$(document).ready(function () {
    $(".carousel__wrapper").slick({
        speed: 1200,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow:
            '<button type="button" class="slick-prev"><img src="icons/slider_left.png"></button>',
        nextArrow:
            '<button type="button" class="slick-next"><img src="icons/slider_right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    // dots: true,
                    arrows: false,
                },
            },
        ],
    });
});
