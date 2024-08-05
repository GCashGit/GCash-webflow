/**
 * Creates an item from the template element.
 * @param {Object} item - The product data to create the item from.
 * @param {Element} templateElement - The template element.
 * @returns {Element} A new Collection Item element.
 */
const createItem = (item, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    newItem.classList.remove('hidden');

    const name = newItem.querySelector('.biller-item-title');
    const category = newItem.querySelector('[data-element="category"]');
    const paymentMethod = newItem.querySelector('.biller-item-services-title');

    if (name) name.textContent = item.name || item.Name;
    if (category) category.textContent = item.category;
    if (paymentMethod) paymentMethod.textContent = item.payment_method;

    return newItem;
};

/**
 * Fetches partner data from the given URL.
 * @param {string} url - The URL to fetch the data from.
 * @returns {Array} The fetched partner data.
 */
const fetchPartners = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('fetchPartners():', error.message);
        return [];
    }
};

/**
 * Renders items to the results area from the filtered data.
 * @param {Element} resultsArea - The element where results are displayed.
 * @param {Array} filteredData - The filtered data to render.
 * @param {Element} templateElement - The template element.
 */
const renderItems = (resultsArea, filteredData, templateElement) => {
    resultsArea.textContent = '';

    const newItems = filteredData.map((item) => createItem(item, templateElement));
    newItems.forEach((item) => resultsArea.append(item));

    resultsArea.animate({ opacity: [0, 1] }, 300);
};

(async () => {
    const templateElement = document.querySelector('.biller-result-card');
    const resultsArea = document.querySelector('.biller-result.billers_collection-list');
    const searchInput = $('#field-2');
    const billerCard = $('.biller-list-item');
    const paginationContainer = $('#pagination-area');
    const alphaNavRegex = /[^A-Za-z]/;
    const indexHeaderContainer = $('.results-letter-index');
    const resetAllBtn = $('.biller-filter-reset-btn');

    let alphaNavBtn = $('.alphabet-nav > .alphabet-nav_letter');
    let activePartnerType = '';
    let activeLetter = '';
    let inputValue = searchInput.val();
    let windowWidth = $(window).width();
    let filteredItems = [];

    const partnersData = await fetchPartners('https://gcashgit.github.io/GCash-webflow/Test/Data%20Table/Webpay/index.js');

    const displayFirstLetter = () => {
        const firstElement = $('.biller-result.billers_collection-list > .biller-result-card').first();
        const elementTextContent = firstElement.find('.biller-item-title').text();
        indexHeaderContainer.text(alphaNavRegex.test(elementTextContent.charAt(0)) ? '#' : elementTextContent.charAt(0));
    };

    const usePagination = (dataArr) => {
        const arrowSVG = `
            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20.5" cy="20.4922" r="19" stroke="#025AE9" stroke-width="2"/>
                <path d="M19 24L23 20L19 16" stroke="#025AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const pageSize = windowWidth >= 1280 ? 15 : windowWidth >= 480 ? 9 : 5;

        paginationContainer.pagination({
            ulClassName: 'pagination-list-wrapper',
            dataSource: dataArr,
            prevText: arrowSVG,
            nextText: arrowSVG,
            showNavigator: true,
            formatNavigator: 'Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>',
            pageSize,
            pageRange: 1,
            callback: (data) => {
                renderItems(resultsArea, data, templateElement);
                displayFirstLetter();
            },
        });
    };

    const hasItemStartingWithLetter = (arr, letter) => {
        const testFunction = alphaNavRegex.test(letter)
            ? (name) => alphaNavRegex.test(name.charAt(0))
            : (name) => name.toLowerCase().startsWith(letter.toLowerCase());

        return arr.some((item) => testFunction(item.name));
    };

    const disableLetter = (dataArr) => {
        alphaNavBtn.each(function () {
            $(this).toggleClass('disabled', !hasItemStartingWithLetter(dataArr, $(this).data('letter')));
        });
    };

    const displayNoResult = (isDisplayed, searchValue = ' ') => {
        const noResultContainer = $('.no-results-wrapper');
        const searchResult = $('.no-results-wrapper > .no-results-label .result');
        const resultsWrapper = $('.results-wrapper');
        const letterIndexHeader = $('.results-letter-index');
        const cardViewBtns = $('.biller-view-options');

        noResultContainer.toggleClass('disabled', !isDisplayed);
        paginationContainer.toggle(!isDisplayed);
        resultsWrapper.toggle(!isDisplayed);
        cardViewBtns.toggleClass('no-result', isDisplayed);

        if (isDisplayed) {
            searchResult.text(searchValue);
        } else if (windowWidth < 479) {
            letterIndexHeader.show();
        }
    };

    const handleResetBtn = () => {
        resetAllBtn.toggleClass('no-filters', !(activePartnerType || activeLetter));
    };

    searchInput.on('input', function () {
        inputValue = $(this).val().toLowerCase();

        const applyFilters = (item) => {
            const nameMatch = item.name.toLowerCase().includes(inputValue);
            const categoryMatch = !activePartnerType || item.category.toLowerCase() === activePartnerType.toLowerCase();
            const letterMatch = !activeLetter || (alphaNavRegex.test(activeLetter)
                ? alphaNavRegex.test(item.name.charAt(0))
                : item.name.toLowerCase().startsWith(activeLetter.toLowerCase()));

            return nameMatch && categoryMatch && letterMatch;
        };

        filteredItems = partnersData.sort((a, b) => a.name.localeCompare(b.name)).filter(applyFilters);

        const resultMsg = [
            activePartnerType && `Category: ${activePartnerType}`,
            activeLetter && `Letter: ${activeLetter.toUpperCase()}`,
            inputValue,
        ].filter(Boolean).join(', ');

        if (filteredItems.length === 0) {
            displayNoResult(true, resultMsg);
        } else {
            paginationContainer.pagination('destroy');
            usePagination(filteredItems);
            disableLetter(filteredItems);
            displayNoResult(false);
        }
    });

    billerCard.on('click', function () {
        activePartnerType = $(this).children('.biller-label').text().toLowerCase();
        $('.biller_dropdown-current').text($(this).children('.biller-label').text());

        if (activePartnerType === 'all categories') {
            activePartnerType = '';
        }

        searchInput.trigger('input');
        handleResetBtn();
    });

    $('.biller-view-options.w-radio').on('click', function () {
        if ($(this).hasClass('no-result')) return;

        const resultsContainer = $('.biller-result.billers_collection-list');
        const listViewHeader = $('.results-wrapper > .biller-table-header');
        const displayMode = $(this).children('.biller-view-label').text().toLowerCase();

        $('.biller-view-options.w-radio').removeClass('active');
        $(this).addClass('active');

        resultsContainer.toggleClass('list-view', displayMode === 'list view');
        resultsContainer.toggleClass('card-view', displayMode === 'card view');
        listViewHeader.toggleClass('list-view', displayMode === 'list view');

        resultsArea.animate({ opacity: [0, 1] }, 300);
    });

    alphaNavBtn.on('click', function () {
        if ($(this).hasClass('disabled')) return;

        activeLetter = $(this).data('letter');
        alphaNavBtn.removeClass('selected');
        $(this).addClass('selected');

        searchInput.trigger('input');
    });
})();
