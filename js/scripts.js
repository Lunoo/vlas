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
})
