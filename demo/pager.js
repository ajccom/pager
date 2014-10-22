'use strict'
;(function () {
  var Pager = {
    handle: function () {
      var that = this;
      $('.cmPager').each(function () {
        that._ini(this);
      });
    },
    _ini: function (dom) {
      var s = $(dom),
          /**
            1  2 ... 5  6  7  8  9 ... 12 13
            \  /     \  /  |  \  /     \  /
             f1       f2  当前 f3       f4
          **/
          f1 = s.data('f1') || 0,//如上注释，f1区域个数
          f2 = s.data('f2') || 2,
          f3 = s.data('f3') || 2,
          f4 = s.data('f4') || 0,
          param = s.data('param') || 'page',
          current = parseInt(s.data('current'), 10),
          total = parseInt(s.data('total'), 10),
          url = s.data('url') || '',
          html = '<ul class="cmPagerReady">',
          i = 0,
          l = 0,
          dot = {},
          pos = 0,
          t = f2 + f3 + 1,
          delta = 0;
          
      current = current <= total ? (current > 0 ? current : 1) : total;
      /////////////////////////////////////
      var pagerHTML = 
          '<div class="cmPagerReady">' +
						'<span class="total">共{{total}}个产品</span>' +
						'<ul>' +
              '<li class="prev"><a href="{{url}}">上一页</a></li>' +
              '{{pageList}}' +
              '<li class="next"><a href="{{url}}">下一页</a></li>' +
						'</ul>' +
					'</div>',
        listHTML = '<li><a href="{{url}}">{{index}}</a></li> ',
        pagerHtml = '',
        listHtml = '',
        t = f2 + f3 + 1, 
        l = total >= t ? t : total,
        i = current,
        str = '',
        start = 0,
        end = 0,
        f1Html = '',
        f4Html = '';
      if (i - (f2 + 1) <= 0 || l < t) {
        i = 1;
      } else if ((i - (f2 + 1) > 0) && (i + (f3 + 1)) <= total) {
        i = i - f2;
      } else {
        i = total - f2 - f3;
      }
      l = i + (l >= t ? t : l);
      start = i;
      end = l - 1;
      for (i; i < l; i++) {
        str = this.contact(url, param + '=' + i);
        if (i === current) {
          listHtml += '<li class="current"><a href="' + str + '">' + i + '</a></li>';
        } else {
          listHtml += listHTML.replace('{{index}}', i).replace('{{url}}', str);
        }
      }
      
      //f1 html
      if (f1 > 0) {
        if (start > f1) {
          i = 1;
          l = f1;
          while (i <= l) {
            str = this.contact(url, param + '=' + i);
            f1Html += '<li><a href="' + str + '">' + i + '</a></li>';
            i++;
          }
          if (start - f1 > 1) {f1Html += '<li class="dot">...</li>'}
        } else if (0 < start <= f1) {
          i = 1;
          l = start;
          while (i < l) {
            str = this.contact(url, param + '=' + i);
            f1Html += '<li><a href="' + str + '">' + i + '</a></li>';
            i++;
          }
        }
      }
      
      //f4 html
      if (f4 > 0) {
        if (end < total - f4) {
          i = total - f4 + 1;
          l = total;
          f4Html += '<li class="dot">...</li>';
          while (i <= l) {
            str = this.contact(url, param + '=' + i);
            f4Html += '<li><a href="' + str + '">' + i + '</a></li>';
            i++;
          }
        } else if (end >= total - f4) {
          i = end + 1;
          l = total;
          while (i <= l) {
            str = this.contact(url, param + '=' + i);
            f4Html += '<li><a href="' + str + '">' + i + '</a></li>';
            i++;
          }
        }
      }
      
      listHtml = f1Html + listHtml + f4Html;
      pagerHtml = pagerHTML.replace('{{total}}', total).replace('{{pageList}}', listHtml);
      
      var p = $(pagerHtml);
      p.find('.prev a').attr('href', this.contact(url, param + '=' + ((current - 1) > 0 ? (current - 1) : 1)));
      p.find('.next a').attr('href', this.contact(url, param + '=' + ((current + 1) < total ? (current + 1) : total)));
      if (current === 1) {
        p.find('.prev').addClass('hide');
      }
      if (current === total) {
        p.find('.next').addClass('hide');
      }
      s.replaceWith(p);
    },
    contact: function (url, str) {
      if (url.indexOf('?') > -1) {
        url = url + '&' + str;
      } else {
        url = url + '?' + str;
      }
      return url;
    },
    ini: function () {
      this.handle();
    }
  };
  
  var VL = window.VL || {};
  VL.pager = (function () {
    return Pager;
  }());
  window.VL = VL;
}());