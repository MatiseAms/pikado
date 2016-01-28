angular.module('Pikado')
	.controller('ScoreHeaderController', [function() {
		'use strict';

		var self = this;
		self.hello = 'hello';

		self.canvasSize = function canvasSize(canvas,ratio){
      ratio = ratio || '16-9';
      ratio = ratio.split("-");

      var padding = 20,
      canvasSizes = {'width':0,'height':0},
      wsize = {'width':($(window).outerWidth() - padding),'height':($(window).outerHeight() - padding) };

      console.log(((wsize.width/ratio[0])*ratio[1]) + ' - ' + wsize.height);
      if(((wsize.width/ratio[0])*ratio[1])>wsize.height){
        canvasSizes.height = wsize.height;
        canvasSizes.width = ((wsize.height/ratio[1])*ratio[0]);
      } else if(((wsize.height/ratio[1])*ratio[0])>wsize.width){
      canvasSizes.width = wsize.width;
      canvasSizes.height = ((wsize.width/ratio[0])*ratio[1]);
      }

      //SetSizes
      canvas.css({'width': canvasSizes.width, 'height': canvasSizes.height});
      $('body,html').css({'font-size': Math.round(wsize.width/100)});
		};

    setTimeout(function(){
      self.canvasSize($('section.canvas'));
    },100);
		$(window).resize(function(){
			self.canvasSize($('section.canvas'));
		});
	}]);
