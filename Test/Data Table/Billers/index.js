/**
 * Creates an item from the template element.
 * @param {Object} item - The product data to create the item from.
 * @param {HTMLElement} templateElement - The template element.
 * @returns {HTMLElement} A new Collection Item element.
 */
const createItem = (item, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    newItem.classList.remove('hidden');

    const name = newItem.querySelector('.biller-item-title');
    const paymentDate = newItem.querySelector('.biller-item-description');
    const gcredit = newItem.querySelector('[data-element="gcredit"]');
    const innerProductTag = newItem.querySelector('[data-element="gcredit"] > p');
    const fee = newItem.querySelector('[data-element="fee"]');
    const feeAmount = newItem.querySelector('[data-element="fee-amount"]');
    const labelWrapper = newItem.querySelector('.biller-card-label-wrapper');

    innerProductTag.textContent = "Accepts";

    if (name) name.textContent = item.name || item.Name;
    if (paymentDate) paymentDate.textContent = item.payment_date;
    if (!item.has_gcredit && !item.has_ggives) gcredit.style.display = 'none';

    if (item.has_gcredit) {
        gcredit.dataset.gcredit = 1;
        innerProductTag.textContent += ' GCredit';
    }
    
    if (item.has_ggives) {
        gcredit.dataset.ggives = 1;
        innerProductTag.textContent += item.has_gcredit ? ', GGives' : ' GGives';
    }

    if (item.fee_amount > 0) {
        feeAmount.textContent = `${item.fee_amount} fee`;
    } else {
        fee.style.display = 'none';
    }

    if (!item.has_gcredit && item.fee_amount <= 0) {
        labelWrapper.style.display = 'none';
    }

    return newItem;
};

/**
 * Fetches Partners data.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object[]>} A promise that resolves to the fetched data array.
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
 * Renders items from the filtered data.
 * @param {HTMLElement} resultsArea - The element where results are displayed.
 * @param {Object[]} filterData - Filtered data to be converted.
 * @param {HTMLElement} templateElement - The template element.
 */
const renderItems = (resultsArea, filterData, templateElement) => {
    resultsArea.innerHTML = ''; // Clears the results area

    const newItems = filterData.map(item => createItem(item, templateElement));
    newItems.forEach(item => resultsArea.append(item));

    resultsArea.animate({ opacity: [0, 1] }, 300);
};

(async () => {
    const templateElement = document.querySelector('.biller-result-card');
    const resultsArea = document.querySelector('.biller-result.billers_collection-list');
    const searchInput = $('#field-2');
    const billerCard = $('.biller-list-item');
    const paginationContainer = $('#pagination-area');
    const alphaNavRegex = new RegExp('[^A-Za-z]');
    const indexHeaderContainer = $('.results-letter-index');
    const resetAllBtn = $('.biller-filter-reset-btn');
    const alphaNavBtn = $('.alphabet-nav > .alphabet-nav_letter');

    let activeBillerType = '';
    let activeLetter = '';
    let inputValue = searchInput.val();

    const partnersData = await fetchPartners('https://gcashgit.github.io/GCash-webflow/billers/data.json');

    resultsArea.style.opacity = '1';

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
            </svg>`;

        const pageSize = window.innerWidth >= 1280 ? 15 : window.innerWidth <= 479 ? 5 : 9;

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
            }
        });
    };

    const hasItemStartingWithLetter = (arr, letter) => {
        return arr.some(item => alphaNavRegex.test(letter)
            ? alphaNavRegex.test(item.name.charAt(0))
            : item.name.toLowerCase().startsWith(letter.toLowerCase()));
    };

    const disableLetter = (dataArr) => {
        alphaNavBtn.each(function () {
            $(this).toggleClass('disabled', !hasItemStartingWithLetter(dataArr, $(this).data('letter')));
        });
    };

    const displayNoResult = (isDisplayed, searchValue = " ") => {
        $('.no-results-wrapper').toggleClass('disabled', !isDisplayed);
        paginationContainer.toggle(!isDisplayed);
        $('.results-wrapper').toggle(!isDisplayed);
        indexHeaderContainer.toggle(!isDisplayed && window.innerWidth < 479);
        $('.no-results-wrapper > .no-results-label .result').text(searchValue);
        $('.biller-view-options').toggleClass('no-result', isDisplayed);
    };

    const handleResetBtn = () => {
        resetAllBtn.toggleClass('no-filters', !(activeBillerType.length || activeLetter.length));
    };

    const filterData = () => {
        let filteredItems = partnersData
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter(item => item.name.toLowerCase().includes(inputValue));

        if (activeBillerType) {
            filteredItems = filteredItems.filter(item => item.biller_type.includes(activeBillerType));
        }

        if (activeLetter) {
            filteredItems = filteredItems.filter(item => {
                const firstLetter = item.name.charAt(0).toLowerCase();
                return alphaNavRegex.test(activeLetter) ? alphaNavRegex.test(firstLetter) : firstLetter === activeLetter.toLowerCase();
            });
        }

        paginationContainer.pagination('destroy');
        usePagination(filteredItems);
        disableLetter(filteredItems);
        displayNoResult(filteredItems.length === 0, resultMsg);
    };

    searchInput.on("input", function () {
        inputValue = $(this).val().toLowerCase();
        const resultMsg = activeBillerType && activeLetter
            ? `Category: ${activeBillerType}, Letter: ${activeLetter.toUpperCase()} and ${inputValue}`
            : activeBillerType
                ? `Category: ${activeBillerType} and ${inputValue}`
                : activeLetter
                    ? `Letter: ${activeLetter.toUpperCase()} and ${inputValue}`
                    : inputValue;

        filterData();
    });

    billerCard.on("click", function () {
        const billerType = $(this).children('.biller-label').text();
        $('.biller_dropdown-current').text(billerType);
        activeBillerType = billerType === 'All Categories' ? '' : billerType;

        filterData();
    });

    $(window).on('resize', () => {
        if (paginationContainer.data('pagination')) {
            filterData();
        }
    });

    resetAllBtn.on('click', () => {
        activeBillerType = '';
        activeLetter = '';
        searchInput.val('');
        inputValue = '';
        handleResetBtn();
        filterData();
    });
})();
