document.addEventListener("DOMContentLoaded", function() {

    const body = document.body;
    const mainHeader = document.querySelector('.main-header');
    const mainHeaderLogo = document.querySelector('.main-header__site-title');
    const mainHeaderMainBar = document.querySelector('.main-header__main-bar');
    const mainSearchButton = document.querySelector('.main-search-button');
    const mainHeaderSearch = document.querySelector('.main-header-search');
    const mainSearchInput = mainHeaderSearch.querySelector('#fulltext-search-input');
    const mainBanner = document.querySelector('.main-banner');
    const mainBannerContent = document.querySelector('.main-banner__content');
    const userBar = document.getElementById('user-bar');
    const menuDrawer = document.getElementById('menu-drawer');
    const menuToggle = document.querySelector( '.main-navigation__toggle' );
    const mainContent = document.getElementById('content');
    const mainFooter = document.querySelector('.main-footer');

    // Resize Events

    let userBarHeight = 0;
    let timeout = false;
    const delay = 150;

    onResize();

    function onResize() {
        getUserBarHeight();
        refreshBodyPaddingTop();
        setImageHoverTextInitialPosition();
        setMainContentMinHeight();

        if(window.scrollY > 60) {
            menuDrawer.style.top = (mainHeader.offsetHeight - userBarHeight) + 'px';
        } else {
            menuDrawer.style.top = mainHeader.offsetHeight + 'px';
        }

        if (window.innerWidth >= 1200 && menuToggle.getAttribute('aria-expanded') === 'true') {
            menuToggle.click();
        }
    }

    window.addEventListener('resize', function() {
        clearTimeout(timeout);
        timeout = setTimeout(onResize, delay);
    });

    function refreshBodyPaddingTop() {
        if (mainBanner) {
            body.style.paddingTop = userBarHeight;
            //document.documentElement.style.scrollPaddingTop = (userBarHeight + 20) + 'px';
        } else {
            body.style.paddingTop = mainHeader.offsetHeight + 'px';
            //document.documentElement.style.scrollPaddingTop = (mainHeaderMainBar.offsetHeight + 20) + 'px';
        }
    }

    function getUserBarHeight() {
        if (userBar) {
            userBarHeight = userBar.offsetHeight;
        }
    }

    // Scrolling Events

    let lastKnownScrollPosition = 0;
    let ticking = false;
    let scrollDirection = 'up';

    onScroll();

    function onScroll(scrollPos) {
        scrollPos = scrollPos ?? window.scrollY;
        if(scrollPos > 10) {
            if (mainBanner) {
                mainHeaderLogo.style.opacity = 1;
                mainBannerContent.style.opacity = 0;
            }
            mainHeader.classList.add('solid-bg');
        } else {
            if (mainBanner) {
                mainHeaderLogo.style.opacity = 0;
                mainBannerContent.style.opacity = 1;
            }
            mainHeader.classList.remove('solid-bg');
        }

        if(scrollPos > 60 && scrollDirection == 'down') {
            mainHeader.style.top = - (userBarHeight) + 'px';
            menuDrawer.style.top = (mainHeader.offsetHeight - userBarHeight) + 'px';
        } else {
            mainHeader.style.top = 0;
            menuDrawer.style.top = mainHeader.offsetHeight + 'px';
        }
    }

    document.addEventListener('scroll', (event) => {
        scrollDirection = Math.max(lastKnownScrollPosition, window.scrollY) == lastKnownScrollPosition ? 'up': 'down';
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll(lastKnownScrollPosition);
                ticking = false;
            });

            ticking = true;
        }
    });

    // Annotations tooltip position

    const annotationBtns = document.querySelectorAll('.annotation-btn');

    annotationBtns.forEach((annotationBtn) => {
        const annotationTooltip = annotationBtn.querySelector('.annotation-tooltip');
        const annotationTooltipWrapper = annotationTooltip.querySelector('.annotation-tooltip__wrapper');

        const eventList = ['click', 'mouseover'];
        eventList.forEach((event) => {
            annotationBtn.addEventListener(event, setAnnotationTooltipPos);
        });

        function setAnnotationTooltipPos() {
            const annotationBtnOffset = annotationBtn.getBoundingClientRect();
            const { top, left } = annotationBtnOffset;
            const distanceToRightEdge = window.innerWidth - (left + annotationBtn.offsetWidth);
            
            if (distanceToRightEdge < (annotationTooltipWrapper.offsetWidth + 15)) {
                annotationTooltip.style.left = (distanceToRightEdge - annotationTooltipWrapper.offsetWidth - 15) + 'px';
            } else {
                annotationTooltip.style.left = '0px';
            }

            if ((top - mainHeader.offsetHeight - mainHeader.offsetTop) < (annotationTooltipWrapper.offsetHeight + 15)) {
                annotationTooltip.style.bottom = (- annotationTooltipWrapper.offsetHeight - 20) + 'px';
                annotationTooltipWrapper.classList.add('below-button');
            } else {
                annotationTooltip.style.bottom = '10px';
                annotationTooltipWrapper.classList.remove('below-button');

                if (annotationTooltip.style.left == '0px') {
                    annotationTooltip.style.bottom = '5px';
                }
            }
        }
    });
    
    // Main Header Search
    document.addEventListener('click', onDocumentClick, true);

    function onDocumentClick(e) {
        if (e.target == mainSearchButton){
            mainHeaderSearch.classList.toggle('visible');
            if (mainHeaderSearch.classList.contains('visible')) {
                mainSearchInput.focus();
            }
        } else if (!mainHeaderSearch.contains(e.target)){
            mainHeaderSearch.classList.remove('visible');
        }
    }

    // Forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.parentElement.classList.contains('inputs')) {
                const previousElementSibling = checkbox.parentElement.previousElementSibling;
                if (previousElementSibling && previousElementSibling.classList.contains('field-meta')) {
                    checkbox.parentElement.append(previousElementSibling);
                    checkbox.style.float = 'left';
                    checkbox.style.marginRight = '10px';
                }
            }
        });
    });

    // Image Hover Text
    function setImageHoverTextInitialPosition() {
        document.querySelectorAll('.image-hover-text').forEach(function(imageHoverTextBlock) {
            const blockHtml = imageHoverTextBlock.querySelector('.block-html');

            if (!blockHtml) {
                return;
            }

            const blockHtmlTitle = blockHtml.querySelector('h4');

            if (blockHtmlTitle) {
                const blockHtmlTitleStyles = window.getComputedStyle(blockHtmlTitle);
                const blockHtmlTitleMarginBottom = parseFloat(blockHtmlTitleStyles.marginBottom);
                const blockHtmlInitialBottom = blockHtml.offsetHeight - blockHtmlTitle.offsetTop - blockHtmlTitle.offsetHeight - blockHtmlTitleMarginBottom;
                blockHtml.style.setProperty('--block-html-offset', blockHtmlInitialBottom + 'px');
            }

        });
    }

    // Image Hover Text Read More links
    document.querySelectorAll('.image-hover-text .read-more a').forEach(function(imageHoverTextViewMore) {
        imageHoverTextViewMore.textContent = '';
    });

    // Prevent browser scroll-into-view when tabbing into .image-hover-text elements.
    // Browsers use visual position (after transforms) for focus scroll, so without this
    // the page jumps when the off-screen panel receives keyboard focus.
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;

        const focusables = Array.from(document.querySelectorAll(
            'a[href], button, input, select, textarea, [tabindex]'
        )).filter(function(el) {
            return el.tabIndex >= 0
                && !el.disabled
                && window.getComputedStyle(el).display !== 'none'
                && window.getComputedStyle(el).visibility !== 'hidden';
        });

        let currentIndex = focusables.indexOf(document.activeElement);
        // activeElement not in list (e.g. document.body) — treat as before/after the sequence
        if (currentIndex === -1) currentIndex = e.shiftKey ? focusables.length : -1;

        const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
        if (nextIndex < 0 || nextIndex >= focusables.length) return;

        const nextEl = focusables[nextIndex];
        if (nextEl.closest('.image-hover-text')) {
            e.preventDefault();
            nextEl.focus({ preventScroll: true });
            nextEl.closest('.image-hover-text').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, true);

    // Set Main-content min-height
    function setMainContentMinHeight() {
        mainContent.style.minHeight = `calc(100vh - ${mainHeader.offsetHeight + mainFooter.offsetHeight}px)`;
    }
});
