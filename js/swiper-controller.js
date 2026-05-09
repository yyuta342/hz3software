const swiper = new Swiper('.headlines-swiper', 
{
	// Optional parameters
	loop: true,
	autoplay: true,
	
	pagination: 
	{
		el: ".swiper-pagination",
		clickable: true,
		/*
		renderBullet: function (index, className) 
		{
			return '<span class="' + className + '">' + (index) + "</span>";
		},
		*/
	},
	
	navigation: 
	{
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	
	scrollbar: 
	{
		el: '.swiper-scrollbar',
	},
});