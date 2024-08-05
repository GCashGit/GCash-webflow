/**
 * Creates an item from the template element.
 * @param item The product data to create the item from.
 * @param templateElement The template element.
 * @returns A new Collection Item element.
 */
const createItem = (item, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    newItem.classList.remove('hidden');

    const name = newItem.querySelector('.biller-item-title');
    const payment_date = newItem.querySelector('.biller-item-description');
    const gcredit = newItem.querySelector('[data-element="gcredit"]'); 
    const innerProductTag = newItem.querySelector('[data-element="gcredit"] > p'); 
    const fee = newItem.querySelector('[data-element="fee"]');
    const fee_amount = newItem.querySelector('[data-element="fee-amount"]');
    const label_wrapper = newItem.querySelector('.biller-card-label-wrapper');

    innerProductTag.textContent = "Accepts";

    if (name) name.textContent = item.name || item.Name;
    if (payment_date) payment_date.textContent = item.payment_date;
    if (!item.has_gcredit && !item.has_ggives) {
        gcredit.style.display = 'none';
    } else {
        gcredit.setAttribute('data-gcredit', item.has_gcredit ? 1 : 0);
        gcredit.setAttribute('data-ggives', item.has_ggives ? 1 : 0);
        const credits = [];
        if (item.has_gcredit) credits.push('GCredit');
        if (item.has_ggives) credits.push('GGives');
        innerProductTag.textContent += ` ${credits.join(', ')}`;
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
 * Fetches Partners data from a URL.
 * @param url The API endpoint.
 * @returns A promise that resolves to an array of partner data.
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
 * Renders items to a specified area.
 * @param results_area The element where results are displayed.
 * @param filter_data Filtered data to be converted.
 * @param template_element The template element for items.
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
    const alpha_nav_regex = /[^A-Za-z]/;
    const index_header_container = $('.results-letter-index');
    const reset_all_btn = $('.biller-filter-reset-btn');
    const alpha_nav_btn = $('.alphabet-nav > .alphabet-nav_letter');
    
    let partnersData = await fetchPartners('https://gcashgit.github.io/GCash-webflow/billers/data.json');
    let filtered_items = [];
    let active_biller_type = '';
    let active_letter = '';
    let inputValue = search_input.val();
    let window_width = $(window).width();

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
        const paginationSettings = {
            ulClassName: 'pagination-list-wrapper',
            dataSource: data_arr,
            prevText: arrowSVG,
            nextText: arrowSVG,
            showNavigator: true,
            formatNavigator: 'Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>',
            pageSize: window_width >= 1280 ? 15 : window_width <= 479 ? 5 : 9,
            pageRange: 1,
            callback: (data) => {
                renderItems(results_area, data, template_element);
                displayFirstLetter();
            }
        };
        pagination_container.pagination(paginationSettings);
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
        reset_all_btn.toggleClass('no-filters', !(active_biller_type.length || active_letter.length));
    };

    search_input.on("input", function () {
        inputValue = $(this).val().toLowerCase();
        let result_msg = '';

        if (active_biller_type.length > 0 && active_letter.length > 0) {
            if (alpha_nav_regex.test(active_letter)) {
                filtered_items = partnersData.filter(item =>
                    item.biller_type.includes(active_biller_type)
                ).filter(item =>
                    item.name.toLowerCase().includes(inputValue) && alpha_nav_regex.test(item.name.charAt(0))
                );
            } else {
                filtered_items = partnersData.filter(item =>
                    item.biller_type.includes(active_biller_type)
                ).filter(item =>
                    item.name.toLowerCase().includes(inputValue) && item.name.toLowerCase().startsWith(active_letter)
                );
            }
            result_msg = `Category: ${active_biller_type}, Letter: ${active_letter.toUpperCase()} and ${inputValue}`;
        } else if (active_biller_type.length > 0) {
            filtered_items = partnersData.filter(item =>
                item.name.toLowerCase().includes(inputValue) && item.biller_type.includes(active_biller_type)
            );
            result_msg = `Category: ${active_biller_type} and ${inputValue}`;
        } else if (active_letter.length > 0) {
            filtered_items = partnersData.filter(item =>
                item.name.toLowerCase().includes(inputValue) && 
                (alpha_nav_regex.test(active_letter) ? alpha_nav_regex.test(item.name.charAt(0)) : item.name.toLowerCase().startsWith(active_letter))
            );
            result_msg = `Letter: ${active_letter.toUpperCase()} and ${inputValue}`;
        } else {
            filtered_items = partnersData.filter(item => item.name.toLowerCase().includes(inputValue));
            result_msg = inputValue;
        }

        pagination_container.pagination('destroy');
        usePagination(filtered_items);
        disableLetter(filtered_items);
        displayNoResult(filtered_items.length === 0, result_msg);
    });

    biller_card.on("click", function () {
        const biller_label = $(this).children('.biller-label').text();
        active_biller_type = biller_label.toLowerCase() === 'all categories' ? '' : biller_label;
        search_input.val('');

        if (!active_biller_type) {
            filtered_items = partnersData.filter(item => item.name.toLowerCase().startsWith(active_letter));
        } else if (active_letter.length > 0) {
            filtered_items = partnersData.filter(item =>
                item.biller_type.includes(active_biller_type) &&
                (alpha_nav_regex.test(active_letter) ? alpha_nav_regex.test(item.name.charAt(0)) : item.name.toLowerCase().startsWith(active_letter))
            );
        } else {
            filtered_items = partnersData.filter(item => item.biller_type.includes(active_biller_type));
        }

        pagination_container.pagination('destroy');
        usePagination(filtered_items);
        disableLetter(filtered_items);
        displayNoResult(filtered_items.length === 0, `Category: ${biller_label}`);
        handleResetBtn();
    });

    alpha_nav_btn.on("click", function () {
        active_letter = $(this).data('letter').toLowerCase();
        search_input.val('');

        if (!active_biller_type.length) {
            filtered_items = active_letter === '' ? partnersData : partnersData.filter(item => alpha_nav_regex.test(active_letter) ? alpha_nav_regex.test(item.name.charAt(0)) : item.name.toLowerCase().startsWith(active_letter));
        } else {
            filtered_items = active_letter === '' ? partnersData.filter(item => item.biller_type.includes(active_biller_type)) : partnersData.filter(item => item.biller_type.includes(active_biller_type) && (alpha_nav_regex.test(active_letter) ? alpha_nav_regex.test(item.name.charAt(0)) : item.name.toLowerCase().startsWith(active_letter)));
        }

        pagination_container.pagination('destroy');
        usePagination(filtered_items);
        displayNoResult(filtered_items.length === 0, `Letter: ${active_letter.toUpperCase()}`);
        handleResetBtn();
    });

    reset_all_btn.on("click", function () {
        active_biller_type = '';
        active_letter = '';
        search_input.val('');
        pagination_container.pagination('destroy');
        usePagination(partnersData);
        disableLetter(partnersData);
        displayNoResult(false);
        handleResetBtn();
    });

    usePagination(partnersData);
    disableLetter(partnersData);
    displayFirstLetter();
})();
