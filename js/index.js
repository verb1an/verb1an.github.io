$(document).ready(function () {
	const slider = () => {
		const control = $('.controlls a');

		control.click(function () {
			let ct = $(this).parent().siblings('.content').find('.item');
			let active = 0;

			let getActive = '';
			let margin = Number.parseInt(ct.css('margin-right').replace('px', ''));
			let switchWidth = (Math.round(ct.width()) + margin);
			let wrapWidth = ct.parent().width();
			let ctLength = ct.length;

			if( ct.css('transform') != 'none' ) {
				getActive = ct.css('transform').replace('matrix(', '').replace(')', '').split(', ')[4]/switchWidth;
				active = Math.round(getActive);
			}else{
				active = 0;
			}

			console.log(getActive)
			console.log(active)
			if( $(this).hasClass('right') ) {
				active--;
				if( Math.abs(active) < (ctLength-Math.round(wrapWidth/switchWidth)) ) {
					ct.css(`transform`, `translate(${active*(switchWidth)}px)`);
				}else if( Math.abs(active) == (ctLength-Math.round(wrapWidth/switchWidth)) ){
					if( Number.isInteger(wrapWidth/switchWidth) ) {
						ct.css(`transform`, `translate(${active*(switchWidth)}px)`);
					}else{
						let dopSwitch = margin + (wrapWidth - Math.round(wrapWidth/switchWidth)*switchWidth);
						ct.css(`transform`, `translate(${active*(switchWidth) + dopSwitch}px)`);
					}

					$(this).addClass('hidden');
				}

				/* Дабвляем противоположную стрелку если нужно */
				$(this).siblings('.left').removeClass('hidden');

			}else{
				if(active < 0) {
					active++;
					ct.css(`transform`, `translate(${active*(switchWidth)}px)`);

					if(active == 0) {
						$(this).addClass('hidden');
					}
				}else{
					$(this).addClass('hidden');
				}

				/* Дабвляем противоположную стрелку если нужно */
				$(this).siblings('.right').removeClass('hidden');
			}
		});
	}
	slider();

	$('.bar').click(function () {
		$('.header').toggleClass('active');
		$('html').toggleClass('hidden');
	});

	$('.nav .item').click(function (e) {
		e.preventDefault(false);
		$('.nav .item').removeClass('current');
		$(this).addClass('current');
		window.scrollTo(0, $(`#${$(this).attr('href')}`).position().top - $('.header').height() - 40  );

		$('.header').removeClass('active');
		$('html').removeClass('hidden');
	});
});