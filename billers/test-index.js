/**
 * Creates an item from the template element.
 * @param product The product data to create the item from.
 * @param templateElement The template element.
 *
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
    const ggives = newItem.querySelector('[data-element="ggives"]');
    const fee = newItem.querySelector('[data-element="fee"]');
    const fee_amount = newItem.querySelector('[data-element="fee-amount"]');
    const label_wrapper = newItem.querySelector('.biller-card-label-wrapper');

    // Populate inner elements
    if (name) name.textContent = item.name || item.Name;
    if (payment_date) payment_date.textContent = item.payment_date;
    if (!item.has_gcredit) gcredit.style.display = 'none';
    if (!item.has_ggives) ggives.style.display = 'none';
    
    // Determine the text for gcredit and ggives
    if (item.has_gcredit === "TRUE" && item.has_ggives === "TRUE") {
        gcredit.textContent = "Accepts GCredit, GGives";
    } else if (item.has_gcredit === "TRUE") {
        gcredit.textContent = "Accepts GCredit";
    } else if (item.has_ggives === "TRUE") {
        gcredit.textContent = "Accepts GGives";
        gcredit.style.display = 'block';
    }

    if (item.fee_amount > 0) {
        fee_amount.textContent = `${item.fee_amount} fee`;
    } else {
        fee.style.display = 'none';
    }

    if ((!item.has_gcredit || item.has_gcredit === "FALSE") && item.fee_amount <= 0) {
        label_wrapper.style.display = 'none';
    }

    return newItem;
};

/**
* Methods to fetch Partners data
* @method fetchPartners() Returns Array from API that uses JSON
*/
async function fetchPartners(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log('fetchPartners(): ', error.message);
        return [];
    }
};

/**
* Creates an item from the template element.
* @param results_area The element where results are displayed
* @param filter_data Filtered data to be converted 
*
* @returns A collection of dom elements.
*/
function renderItems(results_area, filter_data, template_element) {
    //Clear the children of results
    results_area.textContent = '';

    //Get converted items
    let newItems = filter_data.map((item) => createItem(item, template_element));

    //Append new filtered itesm to HTML
    newItems.map((item) => results_area.append(item));

    results_area.animate(
        {
            opacity: [0, 1]
        },
        300
    )
}

(async function () {
    const template_element = document.querySelector('.biller-result-card');
    const results_area = document.querySelector('.biller-result.billers_collection-list');
    const search_input = $('#field-2');
    const biller_card = $('.biller-list-item');
    const pagination_container = $('#pagination-area');
    const alpha_nav_regex = new RegExp('[^A-Za-z]');
    const index_header_container = $('.results-letter-index');
    const reset_all_btn = $('.biller-filter-reset-btn');

    let alpha_nav_btn = $('.alphabet-nav > .alphabet-nav_letter');
    let active_biller_type = ''
    let active_letter = ''
    let inputValue = search_input.val();

    //Get the data from URL source
    let partnersData = await fetchPartners('https://gcashgit.github.io/GCash-webflow/billers/data.json');
    //Initialize an empty array
    let filterd_items = [];

    let window_width = $(window).width();

    results_area.style.opacity = '1';

    function displayFirstLetter() {
        const first_element = $('.biller-result.billers_collection-list > .biller-result-card').first();
        const element_text_content = first_element.find('.biller-item-title ').text();

        if (alpha_nav_regex.test(element_text_content.charAt(0))) {
            index_header_container.text('#');
        } else {
            index_header_container.text(element_text_content.charAt(0));
        }
    }

    //Function to run when reattaching new data to pagination
    function usePagination(data_arr) {
        let arrowSVG = `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20.5" cy="20.4922" r="19" stroke="#025AE9" stroke-width="2"/>
        <path d="M19 24L23 20L19 16" stroke="#025AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `

        if (window_width >= 1280) {
            pagination_container.pagination({
                ulClassName: 'pagination-list-wrapper',
                dataSource: data_arr,
                prevText: arrowSVG,
                nextText: arrowSVG,
                showNavigator: true,
                formatNavigator: 'Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>',
                pageSize: 15,
                pageRange: 1,
                callback: function (data, pagination) {
                    // Render method to generate results
                    renderItems(results_area, data, template_element);
                    displayFirstLetter()
                }
            })
        } else if (window_width <= 1279 && 480 <= window_width) {
            pagination_container.pagination({
                ulClassName: 'pagination-list-wrapper',
                dataSource: data_arr,
                prevText: arrowSVG,
                nextText: arrowSVG,
                showNavigator: true,
                formatNavigator: 'Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>',
                pageSize: 9,
                pageRange: 1,
                callback: function (data, pagination) {
                    // Render method to generate results
                    renderItems(results_area, data, template_element);
                    displayFirstLetter()
                }
            })
        } else if (window_width <= 479) {
            pagination_container.pagination({
                ulClassName: 'pagination-list-wrapper',
                dataSource: data_arr,
                prevText: arrowSVG,
                nextText: arrowSVG,
                showNavigator: true,
                formatNavigator: 'Results: <%= rangeStart %> - <%= rangeEnd %> of <%= totalNumber %>',
                pageSize: 5,
                pageRange: 1,
                callback: function (data, pagination) {
                    // Render method to generate results
                    renderItems(results_area, data, template_element);
                    displayFirstLetter()
                }
            })
        }


    }

    //Function that checks if item with first letter exists in array
    function hasItemStartingWithLetter(arr, letter) {
        //checks if passed value is a special character or hashtag
        if (alpha_nav_regex.test(letter)) {
            for (let i = 0; i < arr.length; i++) {
                if (alpha_nav_regex.test(arr[i].name.charAt(0))) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name.toLowerCase().startsWith(letter.toLowerCase())) {
                    return true;
                }
            }
        }

        return false;
    }

    //Function that disables letters if items without that first letter exists
    function disableLetter(data_arr) {
        alpha_nav_btn.each(function (index) {
            if (!hasItemStartingWithLetter(data_arr, $(this).data('letter'))) {
                $(this).addClass('disabled');
            } else {
                $(this).removeClass('disabled');
            }
        });
    }

    //Function that reveals the no result element when search query is 0
    // Accepts true or false
    function displayNoResult(isDisplayed, searchValue = " ") {
        let no_result_container = $('.no-results-wrapper');
        let search_result = $('.no-results-wrapper > .no-results-label .result');
        let results_wrapper = $('.results-wrapper');
        let letter_index_header = $('.results-letter-index');
        let card_view_btns = $('.biller-view-options');


        if (isDisplayed) {
            no_result_container.removeClass('disabled');
            pagination_container.hide()
            results_wrapper.hide()
            letter_index_header.hide()
            search_result.text(searchValue);
            card_view_btns.addClass('no-result')
        } else {
            no_result_container.addClass('disabled');
            pagination_container.show()
            results_wrapper.show()
            letter_index_header.show()
            card_view_btns.removeClass('no-result')
        }
    }

    search_input.on('input', function (e) {
        let value = $(this).val().toLowerCase();
        filterd_items = partnersData.filter((partner) => partner.name.toLowerCase().includes(value));

        if (filterd_items.length === 0) {
            displayNoResult(true, value);
        } else {
            displayNoResult(false);
        }

        disableLetter(filterd_items);
        usePagination(filterd_items);
        displayFirstLetter();

        inputValue = value;
    });

    biller_card.on('click', function (e) {
        let billerType = $(this).data('type');

        if (billerType == active_biller_type) {
            $(this).removeClass('selected')
            active_biller_type = ''
            filterd_items = partnersData;
        } else {
            biller_card.each(function (i, el) {
                $(this).removeClass('selected')
            })
            $(this).addClass('selected')
            active_biller_type = billerType;
            filterd_items = partnersData.filter((partner) => partner.type.includes(active_biller_type));
        }

        filterd_items = filterd_items.filter((partner) => partner.name.toLowerCase().includes(inputValue));

        disableLetter(filterd_items)
        usePagination(filterd_items);
        displayFirstLetter();
    });

    alpha_nav_btn.on('click', function (e) {
        let letter = $(this).data('letter');
        alpha_nav_btn.removeClass('selected');
        $(this).addClass('selected');

        if (letter == active_letter) {
            $(this).removeClass('selected')
            active_letter = ''
            filterd_items = partnersData;
        } else {
            $(this).addClass('selected')
            active_letter = letter;

            if (alpha_nav_regex.test(letter)) {
                filterd_items = partnersData.filter((partner) => alpha_nav_regex.test(partner.name.charAt(0)))
            } else {
                filterd_items = partnersData.filter((partner) => partner.name.toLowerCase().startsWith(letter.toLowerCase()))
            }
        }

        filterd_items = filterd_items.filter((partner) => partner.name.toLowerCase().includes(inputValue));

        if (active_biller_type != '') {
            filterd_items = filterd_items.filter((partner) => partner.type.includes(active_biller_type));
        }

        if (filterd_items.length === 0) {
            displayNoResult(true, letter);
        } else {
            displayNoResult(false);
        }

        usePagination(filterd_items);
        displayFirstLetter();
    });

    reset_all_btn.on('click', function (e) {
        active_biller_type = ''
        active_letter = ''
        inputValue = ''
        search_input.val('')

        biller_card.each(function (i, el) {
            $(this).removeClass('selected')
        })

        alpha_nav_btn.each(function (index) {
            $(this).removeClass('selected');
        });

        filterd_items = partnersData;
        usePagination(filterd_items);
        disableLetter(filterd_items);
        displayFirstLetter()
        displayNoResult(false);
    })

    filterd_items = partnersData;
    usePagination(filterd_items);
    disableLetter(filterd_items);
    displayFirstLetter();

})();
