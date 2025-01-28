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
    const mainContent = document.getElementById('main-content');
    const mainFooter = document.querySelector('.main-footer');

    // Resize Events

    let userBarHeight = 0;
    let timeout = false;
    const delay = 250;

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
                blockHtml.style.bottom = - blockHtmlInitialBottom + 'px';
            }

        });
    }

    // Image Hover Text Read More links
    document.querySelectorAll('.image-hover-text .read-more a').forEach(function(imageHoverTextViewMore) {
        imageHoverTextViewMore.textContent = '';
    });

    // Set Main-content min-height
    function setMainContentMinHeight() {
        mainContent.style.minHeight = `calc(100vh - ${mainHeader.offsetHeight + mainFooter.offsetHeight}px)`;
    }
});
