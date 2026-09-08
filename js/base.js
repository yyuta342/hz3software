/*
 * YouTube 埋め込みのスクロール対策
 *
 * iframe 上ではホイールイベントが YouTube 側（クロスオリジン）に配送され、
 * 親ページへスクロールが伝播しない。透明なオーバーレイを重ねてホイールを
 * 親ページ側で受け取り、クリックされた時点でオーバーレイを外して再生する。
 */
(function () {
	'use strict';

	function setupOverlay(iframe) {
		var parent = iframe.parentNode;
		if (!parent || parent.querySelector('.video-scroll-guard')) return;

		// .ratio 以外の親でも重ねられるようにしておく
		if (getComputedStyle(parent).position === 'static') {
			parent.style.position = 'relative';
		}

		var overlay = document.createElement('div');
		overlay.className = 'video-scroll-guard';
		overlay.setAttribute('aria-hidden', 'true');

		overlay.addEventListener('click', function () {
			// 1クリックで再生できるよう autoplay を付けて読み直す
			var src = iframe.getAttribute('src');
			if (src && src.indexOf('autoplay=') === -1) {
				iframe.setAttribute('src', src + (src.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1');
			}
			overlay.parentNode.removeChild(overlay);
		});

		parent.appendChild(overlay);
	}

	function init() {
		var iframes = document.querySelectorAll('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]');
		for (var i = 0; i < iframes.length; i++) {
			setupOverlay(iframes[i]);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
