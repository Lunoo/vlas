$(function(){
    $('.callme').fancybox({
        maxWidth: 425,
        padding: [35, 40, 30, 40]
    });
    $('.cab').fancybox({
        wrapCSS: 'enter'
    });
    $('#callback .cancel').click(function(e){
        e.preventDefault();
        console.log($(this).parents('#callback').find('.close'));
        $(this).parents('.fancybox-skin').find('.fancybox-close').click();
    });
    $('#review .fancybox-close, #review .cancel').click(function(e){
        e.preventDefault();
        $(this).parents('#review').fadeOut(200);
    })

    // SLIDER

    $(".slider").each(function () { // обрабатываем каждый слайдер
        var obj = $(this);
        $(obj).append("<div class='nav'></div>");
        $(obj).find("li").each(function(){
            $(obj).find(".nav").append("<span rel='"+$(this).index()+"'></span>"); // добавляем блок навигации
            $(this).addClass("slider"+$(this).index());
        });
        $(obj).find("span").first().addClass("on"); // делаем активным первый элемент меню
    });

    function sliderJS (obj, sl) { // slider function
        var ul = $(sl).find("ul"); // находим блок
        var bl = $(sl).find("li.slider"+obj); // находим любой из элементов блока
        var step = $(bl).width(); // ширина объекта
        $(ul).animate({marginLeft: "-"+step*obj}, 500); // 500 это скорость перемотки
    }
    $('.slider').on("click", ".nav span", function() { // slider click navigate
        var sl = $(this).closest(".slider"); // находим, в каком блоке был клик
        $(sl).find("span").removeClass("on"); // убираем активный элемент
        $(this).addClass("on"); // делаем активным текущий
        var obj = $(this).attr("rel"); // узнаем его номер
        sliderJS(obj, sl); // слайдим
        return false;
    });

    //BLOG SLIDER

    //Обработка клика на стрелку вправо
    $(document).on('click', ".carousel-nav .next", function(){ 
        var carusel = $(this).parents('.carousel');
        right_carusel(carusel);
        return false;
    });
    //Обработка клика на стрелку влево
    $(document).on('click',".carousel-nav .prev", function(){ 
        var carusel = $(this).parents('.carousel');
        left_carusel(carusel);
        return false;
    });
    function left_carusel(carusel){
       var block_width = $(carusel).find('.carousel-block').outerWidth() + 17;
       console.log(block_width);
       $(carusel).find(".carousel-wrapper .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-wrapper")); 
       $(carusel).find(".carousel-wrapper").css({"left":"-"+block_width+"px"});
       $(carusel).find(".carousel-wrapper .carousel-block").eq(-1).remove();    
       $(carusel).find(".carousel-wrapper").animate({left: "0px"}, 200); 
       
    }
    function right_carusel(carusel){
       var block_width = $(carusel).find('.carousel-block').outerWidth() + 17;
       $(carusel).find(".carousel-wrapper").animate({left: "-"+ block_width+"px"}, 200, function(){
          $(carusel).find(".carousel-wrapper .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-wrapper")); 
          $(carusel).find(".carousel-wrapper .carousel-block").eq(0).remove(); 
          $(carusel).find(".carousel-wrapper").css({"left":"0px"}); 
       }); 
    }

    // RATING
    var oldRating = $('#review i.active').length; 
    $('#review i').on('mouseover', function(){
        console.log(oldRating);
        var index = $(this).index();
        $('.rating i').removeClass('active');
        $(this).prevAll().andSelf().addClass('hover');
    }).on('mouseleave', function(){
        $('.rating i').removeClass('hover');
        if(oldRating == 0){
            return;
        }
        $('#review i').eq(oldRating - 1).prevAll().andSelf().addClass('active');
    }).on('click', function(){
        var index = $(this).index();
        $('.rating i').removeClass('hover');
        $(this).prevAll().andSelf().addClass('active');
        oldRating = $('#review i.active').length;
    })
})
