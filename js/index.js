!(function(){
    'use strict';

    var file_num = 43;
    var photo_row = 6;
    var photo_col = 10;
    var photo_num = photo_row * photo_col;
    var gallery = $('#gallery');
    var photos = [];

    for (var i=1; i<=photo_num; i++){
        photos.push('img/'+Math.ceil(Math.random()*file_num)+'.jpg');
    }

    var loadedIndex = 1;

    $.each(photos, function(index, photo){
        var img = document.createElement('img');
        var link = document.createElement('a');
        var li = document.createElement('li');

        link.href = 'javascript:;';
        link.appendChild(img);
        li.appendChild(link);

        gallery[0].appendChild(li);

        img.onload = function(e){
            img.onload = null;
            setTimeout( function(){
                $(li).addClass('loaded');
            }, 10*loadedIndex++);
        };

        img.src = photo;

        /* 此方式会将重复图片连在一起输出
        var img = document.createElement('img');

        img.onload = function(e){
            img.onload = null;
            var link = document.createElement('a');
            var li = document.createElement('li');

            link.href = '#';
            link.appendChild(this);
            li.appendChild(link);

            gallery[0].appendChild(li);

            setTimeout(function(){
                $(li).addClass('loaded');
            }, 25*loadedIndex++);
        };
        img.src = photo;
        */
    });

    var timer_big, timer_small;
    var timer_small_slow = setInterval(function(){
        $('#gallery li:eq('+Math.ceil(Math.random()*photo_num)+')')
            .addClass('animated bounce')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this)
                    .removeClass('animated bounce')
                    .find('img')
                    .attr('src','img/'+Math.ceil(Math.random()*file_num)+'.jpg')

            });
    },100);

    $(document).keypress(function(event){
        if(event.which == 13 || event.which == 32) {
            $('#action').click();
        }
    });

    $('#action').click(function(){
        if (timer_small_slow){
            clearInterval(timer_small_slow);
        }
        if ($(this).data('action') == 'start'){
            $(this).data('action','stop').html('Stop');
            timer_big = setInterval(function(){
                $('#gallery li.focus').removeClass('focus hover');
                $('#gallery li:eq('+Math.ceil(Math.random()*photo_num)+')').addClass('focus');
            },100);
            timer_small = setInterval(function(){
                $('#gallery li:eq('+Math.ceil(Math.random()*photo_num)+') img').attr('src','img/'+Math.ceil(Math.random()*file_num)+'.jpg');
            },1);
        }else{
            $(this).data('action','start').html('Go');
            $('#gallery li.focus').addClass('hover');
            clearInterval(timer_big);
            clearInterval(timer_small);
        }
    });
})();
