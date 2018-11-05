'use strict';

jQuery(function($) {
	var $Body = $('body'),
		$Window = $(window),
		$BackgroundStack = $('#Stack'),
		$Sections = $('.Section');
		
	Preloader();
	Backgrounds();
	Owl();
	Menu();

	function Menu() {
		var $Element = $('#Menu');

		var $Ribbon = $Element.find('.Ribbon'),
			$Close = $Element.find('.Close'),
			$Nav = $Element.find('.Navlist'),
			$Links = $Element.find('.Navlist a');


		$Ribbon.on('click', function() { $Element.toggleClass('Active'); });
		$Close.on('click', function() { $Element.removeClass('Active'); });
		//$Window.on('resize scroll', function() { $Element.removeClass('Active'); });

		$Links.on('click', function(e) {
			e.preventDefault();
			
			var Href = $(this).attr('href');
			$Element.removeClass('Active'); 
			$('html, body').animate({
				scrollTop: $(Href).offset().top
			}, 1800, 'easeInOutCubic', function(){ 
				window.location.hash = Href.replace('#','');
			});

			return false;
		});
	}

	function Preloader() {
		var $Element = $("#Preloader");
		

		$(window).on('load',function() {	
			$Element.animate({opacity:0}, 600, function() { $Element.remove(); });
		});
		
	}

	function Owl() {
		var $Owl = $('.Intro .Steps .owl-carousel'),
			$Content = $('.Intro .Right .Content');

		var Owl = $Owl.owlCarousel({
			items: 1,
			nav: true,
			dots: false,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			freeDrag: false,
			loop: true
		});

		Owl.on('changed.owl.carousel', function(event) {
			if (event.item.index == 2 && event.property.name == 'position') { $('body,html').animate({scrollTop: $Window.height()}, '1500'); }
			if (event.item.index == 4 && event.property.name == 'position') { 
				$Content.addClass('Active');
			} else {
				$Content.removeClass('Active');
			}
		})
	}
	function Backgrounds() {
		_Prepare();
		_Animate();
		
		function _Prepare() {
			$('.Section[data-bg]').each(function() {
				var $Element = $(this);
				$BackgroundStack.append('<div data-section="' + $Element.attr('data-section') + '"> 								\
				<img class="Stack__Prev" data-src="' + $Element.attr('data-prev') + '" alt="" />				\
				<img class="Stack__Image" data-image="' + $Element.attr('data-image') + '"> alt="" /> 								\
				<img class="Stack__Loaded" data-image-loaded="' + $Element.attr('data-image-loaded') + '" alt="" />					\
				</div>');
			});
			
			$('.Stack__Prev').each(function() {
				var $This = $(this);
				$This.on('load', function() { $This.addClass('Preloaded'); });
				$This.attr('src', $This.attr('data-src'));
			});
		}
		
		function _Animate() {
			window.sr = ScrollReveal({viewFactor: 0.3, opacity:1, scale:1, distance:0,duration: 1000});
			
			sr.reveal(".Section", { 
				reset:true, 
				beforeReveal: _Show, 
				beforeReset: _Hide
			});
			
			sr.reveal(".StoryBoxes .Box, .ChapterBox", { 
				reset:false, 
				opacity:0,
				viewFactor: 0.2
			});
		}
		
		function _Show(El) {
			var $El = $(El);
			var $Stack = $BackgroundStack.find('[data-section=\'' + $El.attr('data-section') + '\']');
			
			$El.addClass('Visible');
			$Stack.addClass('Visible');
			if (!$Stack.hasClass('Seen')) { _Load(El); }
			$Stack.addClass('Seen');
		}
		
		
		function _Load(El) {
			var $El = $(El);
			var $Stack = $BackgroundStack.find('[data-section=\'' + $El.attr('data-section') + '\']');
			var $Prev = $Stack.find('.Stack__Image');
			var $Loaded = $Stack.find('.Stack__Loaded');
			
			$Prev.on('load', function() { $(this).addClass('Preloaded'); });
			$Loaded.on('load', function() { $(this).addClass('Preloaded'); });
			
			$Prev.attr('src', $Prev.attr('data-image'));
			$Loaded.attr('src', $Loaded.attr('data-image-loaded'));
			
		}
		function _Hide(El) {
			var $El = $(El);
			
			$El.removeClass('Visible');
			$BackgroundStack.find('[data-section=\'' + $El.attr('data-section') + '\']').removeClass('Visible');
		}
		
	}
	
});
