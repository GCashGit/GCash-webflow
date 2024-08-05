/**
 * Creates an item from the template element.
 * @param item The product data to create the item from.
 * @param templateElement The template element.
 * @returns A new Collection Item element.
 */
const createItem = (item, templateElement) => {
    // Clone the template element
    const newItem = templateElement.cloneNode(true);
    newItem.classList.remove('hidden');

    // Query inner elements
    const name = newItem.querySelector('.biller-item-title');
    const payment_date = newItem.querySelector('.biller-item-description');
    const gcredit = newItem.querySelector('[data-element="gcredit"]');
    const innerProductTag = newItem.querySelector('[data-element="gcredit"] > p');
    const fee = newItem.querySelector('[data-element="fee"]');
    const fee_amount = newItem.querySelector('[data-element="fee-amount"]');
    const label_wrapper = newItem.querySelector('.biller-card-label-wrapper');

    innerProductTag.textContent = "Accepts";

    // Populate inner elements
    if (name) name.textContent = item.name || item.Name;
    if (payment_date) payment_date.textContent = item.payment_date;
    if (!item.has_gcredit && !item.has_ggives) {
        gcredit.style.display = 'none';
    }

    if (item.has_gcredit) {
        gcredit.dataset.gcredit = 1;
        innerProductTag.textContent += ' GCredit';
    }
    
    if (item.has_ggives) {
        gcredit.dataset.ggives = 1;
        innerProductTag.textContent += item.has_gcredit ? ', GGives' : ' GGives';
    }

    if (item.fee_amount > 0) {
        fee_amount.textContent = `${item.fee_amount} fee`;
    } else {
        fee.style.display = 'none';
    }

    if (!item.has_gcredit && item.fee_amount <= 0) {
        label_wrapper.style.display = 'none';
    }

    return newItem;
};

/**
 * Fetches Partners data.
 * @param url The URL to fetch data from.
 * @returns A promise that resolves to the fetched data array.
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
 * @param results_area The element where results are displayed.
 * @param filter_data Filtered data to be converted.
 * @param template_element The template element.
 */
const renderItems = (results_area, filter_data, template_element) => {
    results_area.textContent = '';

    const newItems = filter_data.map(item => createItem(item, template_element));
    newItems.forEach(item => results_area.append(item));

    results_area.animate({ opacity: [0, 1] }, 300);
};

(async () => {
    const template_element = document.querySelector('.biller-result-card');
    const results_area = document.querySelector('.biller-result.billers_collection-list');
    const search_input = $('#field-2');
    const biller_card = $('.biller-list-item');
    const pagination_container = $('#pagination-area');
    const alpha_nav_regex = new RegExp('[^A-Za-z]');
    const index_header_container = $('.results-letter-index');
    const reset_all_btn = $('.biller-filter-reset-btn');
    const alpha_nav_btn = $('.alphabet-nav > .alphabet-nav_letter');

    let active_biller_type = '';
    let active_letter = '';
    let inputValue = search_input.val();

    const partnersData = await fetchPartners('https://gcashgit.github.io/GCash-webflow/billers/data.json');
    let filtered_items = [];
    const window_width = $(window).width();

    results_area.style.opacity = '1';

    const displayFirstLetter = () => {
        const first_element = $('.biller-result.billers_collection-list > .biller-result-card').first();
        const element_text_content = first_element.find('.biller-item-title').text();

        index_header_container.text(alpha_nav_regex.test(element_text_content.charAt(0)) ? '#' : element_text_content.charAt(0));
    };

    const usePagination = (data_arr) => {
        const arrowSVG = `
            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20.5" cy="20.4922" r="19" stroke="#025AE9" stroke-width="2"/>
                <path d="M19 24L23 20L19 16" stroke="#025AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

        const pageSize = window_width >= 1280 ? 15 : window_width <= 479 ? 5 : 9;

        pagination_container.pagination({
            ulClassName: 'pagination-list-wrapper',
            dataSource: data_arr,
            prevText: arrowSVG,
            nextText: arrowSVG,
            showNavigator: true,
            formatNavigator: 'Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>',
            pageSize,
            pageRange: 1,
            callback: (data) => {
                renderItems(results_area, data, template_element);
                displayFirstLetter();
            }
        });
    };

    const hasItemStartingWithLetter = (arr, letter) => {
        if (alpha_nav_regex.test(letter)) {
            return arr.some(item => alpha_nav_regex.test(item.name.charAt(0)));
        } else {
            return arr.some(item => item.name.toLowerCase().startsWith(letter.toLowerCase()));
        }
    };

    const disableLetter = (data_arr) => {
        alpha_nav_btn.each(function () {
            $(this).toggleClass('disabled', !hasItemStartingWithLetter(data_arr, $(this).data('letter')));
        });
    };

    const displayNoResult = (isDisplayed, searchValue = " ") => {
        const no_result_container = $('.no-results-wrapper');
        const search_result = $('.no-results-wrapper > .no-results-label .result');
        const results_wrapper = $('.results-wrapper');
        const letter_index_header = $('.results-letter-index');
        const card_view_btns = $('.biller-view-options');

        no_result_container.toggleClass('disabled', !isDisplayed);
        pagination_container.toggle(!isDisplayed);
        results_wrapper.toggle(!isDisplayed);
        letter_index_header.toggle(!isDisplayed && window_width < 479);
        search_result.text(searchValue);
        card_view_btns.toggleClass('no-result', isDisplayed);
    };

    const handleResetBtn = () => {
        reset_all_btn.toggleClass('no-filters', !(active_biller_type.length > 0 || active_letter.length > 0));
    };

    search_input.on("input", function () {
        inputValue = $(this).val().toLowerCase();
        let result_msg = '';

        const filterData = () => {
            filtered_items = partnersData
                .sort((a, b) => a.name.localeCompare(b.name))
                .filter(item => item.name.toLowerCase().includes(inputValue));

            if (active_biller_type.length > 0) {
                filtered_items = filtered_items.filter(item => item.biller_type.includes(active_biller_type));
            }

            if (active_letter.length > 0) {
                filtered_items = filtered_items.filter(item => {
                    const firstLetter = item.name.charAt(0).toLowerCase();
                    return alpha_nav_regex.test(active_letter) ? alpha_nav_regex.test(firstLetter) : firstLetter === active_letter.toLowerCase();
                });
            }

            pagination_container.pagination('destroy');
            usePagination(filtered_items);
            disableLetter(filtered_items);
            displayNoResult(filtered_items.length === 0, result_msg);

            if (filtered_items.length === 0) {
                displayNoResult(true, result_msg);
            }
        };

        if (active_biller_type.length > 0 && active_letter.length > 0) {
            result_msg = `Category: ${active_biller_type}, Letter: ${active_letter.toUpperCase()} and ${inputValue}`;
        } else if (active_biller_type.length > 0) {
            result_msg = `Category: ${active_biller_type} and ${inputValue}`;
        } else if (active_letter.length > 0) {
            result_msg = `Letter: ${active_letter.toUpperCase()} and ${inputValue}`;
        } else {
            result_msg = inputValue;
        }

        filterData();
    });

    biller_card.on("click", function () {
        const biller_type = $(this).children('.biller-label').text();
        $('.biller_dropdown-current').text(biller_type);
        active_biller_type = biller_type === 'All Categories' ? '' : biller_type;

        const filterData = () => {
            filtered_items = partnersData
                .sort((a, b) => a.name.localeCompare(b.name));

            if (active_biller_type) {
                filtered_items = filtered_items.filter(item => item.biller_type.includes(active_biller_type));
            }

            if (active_letter) {
                filtered_items = filtered_items.filter(item => {
                    const firstLetter = item.name.charAt(0).toLowerCase();
                    return alpha_nav_regex.test(active_letter) ? alpha_nav_regex.test(firstLetter) : firstLetter === active_letter.toLowerCase();
                });
            }

            pagination_container.pagination('destroy');
            usePagination(filtered_items);
            disableLetter(filtered_items
