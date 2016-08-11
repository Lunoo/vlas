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
    $(document).on('click', ".news-nav .next", function(){ 
        var carusel = $(this).parents('.news');
        right_carusel(carusel);
        return false;
    });
    //Обработка клика на стрелку влево
    $(document).on('click',".news-nav .prev", function(){ 
        var carusel = $(this).parents('.news');
        left_carusel(carusel);
        return false;
    });
    function left_carusel(carusel){
       var block_width = $(carusel).find('.news-single').outerWidth() + 17;
       console.log(block_width);
       $(carusel).find(".news-wrapper .news-single").eq(-1).clone().prependTo($(carusel).find(".news-wrapper")); 
       $(carusel).find(".news-wrapper").css({"left":"-"+block_width+"px"});
       $(carusel).find(".news-wrapper .news-single").eq(-1).remove();    
       $(carusel).find(".news-wrapper").animate({left: "0px"}, 200); 
       
    }
    function right_carusel(carusel){
       var block_width = $(carusel).find('.news-single').outerWidth() + 17;
       $(carusel).find(".news-wrapper").animate({left: "-"+ block_width+"px"}, 200, function(){
          $(carusel).find(".news-wrapper .news-single").eq(0).clone().appendTo($(carusel).find(".news-wrapper")); 
          $(carusel).find(".news-wrapper .news-single").eq(0).remove(); 
          $(carusel).find(".news-wrapper").css({"left":"0px"}); 
       }); 
    }
})
