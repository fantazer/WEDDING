$(document).ready(function () {

	// nice select
	//$('.select-beauty').niceSelect();
	// nice select === end

	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	var scrollWidth = window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%',
				paddingRight: scrollWidth
			});

		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos,
			paddingRight: 0
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function () {
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('modal__show');
		}, 600);
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();

		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-close, .modal-hide').click(function () {
		closeModal();
	});
	//modals===end

	// fix top-menu
	var shrinkHeader = 450;
	var head = $('.header');
	var heightHeader = head.height();
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		if (scroll >= shrinkHeader) {
			$('body').css('paddingTop', heightHeader);
			head.addClass('shrink');
		} else {
			$('body').css('paddingTop', 0);
			head.removeClass('shrink');
		}
	});

	$(window).resize(function () {
		heightHeader = head.height();
	});
	// fix top-menu === end

	// porfolio slider
	$('.portfolio-slider').slick({
		slidesToShow: 1,
		speed: 500,
		dots: true,
		arrows: false,
		rows: 0,// убирает вложенный пустой div
		//autoplay: true,
		//fade: true
		//autoplaySpeed: 8000, time between
		customPaging: function (slider, i) {
			return '<span class="dot"></span>';
		}
	});
	// porfolio slider === end

	// === custom arrow el ===
	$('.portfolio-nav__el--right').click(function () {
		$(".portfolio-slider").slick('slickNext');
	});

	$('.portfolio-nav__el--left').click(function () {
		$(".portfolio-slider").slick('slickPrev');
	});
	// custom arrow el === end



	//validate
	jQuery.validator.addMethod("getPhone", function (value, element) {
		// allow any non-whitespace characters as the host part
		return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){5,18}(\s*)?$/.test(value);
	}, 'Введите правильный номер телефона');
	$('.validate-form').each(function () {
		var curentForm = $(this);
		$(this).validate({
			highlight: function (element) { //даем родителю класс если есть ошибка
				$(element).parent().addClass("input-row--error");
			},
			unhighlight: function (element) {
				$(element).parent().removeClass("input-row--error");
			},
			rules: { //правила для полей
				name: {
					required: true,
				},
				phone: {
					required: true,
					minlength: 5,
					getPhone: true
				},
				mail: {
					required: true,
				},
				comment: {
					required: true,
					minlength: 5,
				},
				agree: {
					required: true
				}
			},
			messages: {
				name: {
					required: 'Обязательное поле',
				},
				phone: {
					required: 'Обязательное поле',
					number: 'Введите правильный номер',
					minlength: 'Номер должен быть длиннее',
				},
				mail: {
					required: 'Обязательное поле',
				},
				comment: {
					required: 'Обязательное поле',
					minlength: 'Сообщение должно быть длиннее',
				},
				agree: {
					required: false,
				}
			},
			submitHandler: function (form) {
				$.ajax({ //отправка ajax
					type: "POST",
					url: "sender.php",
					data: $(form).serialize(),
					timeout: 3000,
				});
				initModal("trueMsg");
				setTimeout(function () {
					window.condition.closeModal();
					$(':input', '.validate-form') //очитска формы от данных
						.not(':button, :submit, :reset, :hidden')
						.val('')
						.removeAttr('checked')
						.removeAttr('selected')
				}, 80500)

			}
		});
	});

	// scroll to id
	$("a[rel='m_PageScroll2id']").mPageScroll2id({
		highlightClass: "nav__el--active",
		onComplete:function(){
			$('.slide-menu').removeClass('slide-menu--open');
		}
	});
	// scroll to id === end
	//mobile menu

	//Фиксируем скрол
	$('.head-toggle--open').click(function () {

	});

	$('.head-toggle').click(function (event) {
		$('.slide-menu').toggleClass('slide-menu--open');
	});

	$('.slide-menu').on("click", function (event) {
		//event.stopPropagation();
	});

	$('.slide-menu-close').on("click", function () {
		$('.slide-menu').removeClass('slide-menu--open');
	});
	//mobile menu===end

	// onepage-scroll
	$('.main').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true,
		sectionSelector:".cell"
	});
	// onepage-scroll === end

	// animate on scroll
	/*AOS.init({
		offset: 140,
		mirror: "true",
		delay: 100
	});*/
	// animate on scroll === end

});
