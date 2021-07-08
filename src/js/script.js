$(document).ready(function () {
    //Carousel

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
                    dots: true,
                    arrows: false,
                },
            },
        ],
    });

    // Tabs

    $("ul.catalog__tabs").on(
        "click",
        "li:not(.catalog__tab_active)",
        function () {
            $(this)
                .addClass("catalog__tab_active")
                .siblings()
                .removeClass("catalog__tab_active")
                .closest("div.container")
                .find("div.catalog__content")
                .removeClass("catalog__content_active")
                .eq($(this).index())
                .addClass("catalog__content_active");
        }
    );

    function toggleContent(item) {
        $(item).each(function (i) {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".catalog-item__content")
                    .eq(i)
                    .toggleClass("catalog-item__content_active");
                $(".catalog-item__list")
                    .eq(i)
                    .toggleClass("catalog-item__list_active");
            });
        });
    }

    toggleContent(".catalog-item__link");
    toggleContent(".catalog-item__back");

    // Modal

    $("[data-modal=consultation]").on("click", function () {
        $(".overlay, #consultation").fadeIn();
    });
    $(".modal__close").on("click", function () {
        $(".overlay, #consultation, #order, #thanks").fadeOut();
    });
    $(window).on("click", function (e) {
        if (e.target.classList.contains("overlay")) {
            $(".overlay, #consultation, #thanks, #order").fadeOut();
        }
    });
    $(".button_mini").each(function (i) {
        $(this).on("click", function () {
            $("#order .modal__descr").text(
                $(".catalog-item__subtitle").eq(i).text()
            );
            $(".overlay, #order").fadeIn();
        });
    });

    // Validate forms

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format(
                        "Имя должно содержать не менее {0} символов"
                    ),
                },
                phone: "Пожалуйста, введите номер телефона",
                email: {
                    required: "Пожалуйста, введите адрес электронной почты",
                    email: "Ваш адрес электронной почты должен быть в виде name@domain.ru",
                },
            },
        });
    }

    validateForm("#consultation-form");
    validateForm("#consultation form");
    validateForm("#order form");

    // Masked inputs

    $("input[name=phone]").mask("+7 (999) 999-99-99");

    // Mailer

    $("form").submit(function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize(),
            }).done(function () {
                $(this).find("input").val("");
                $("#consultation, #order").fadeOut();
                $(".overlay, #thanks").fadeIn();
                $("form").trigger("reset");
            });
        }
        return false;
    });

    // Scroll

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $(".pageup").fadeIn();
        } else {
            $(".pageup").fadeOut();
        }
    });

    //Animations

    new WOW().init();
});
