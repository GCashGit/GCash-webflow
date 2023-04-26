
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
    const category = newItem.querySelector('[data-element="category"]');
    const payment_method = newItem.querySelector('.biller-item-services-title');

    // Populate inner elements
    if (name) name.textContent = item.name || item.Name;
    if (category) category.textContent = item.category;
    if (payment_method) payment_method.textContent = item.payment_method;

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

    let alpha_nav_btn = $('.alphabet-nav > .alphabet-nav_letter');
    let active_partner_type = ''
    let active_letter = '';

    //Get the data from URL source
    let partnersData = await fetchPartners('https://gcashgit.github.io/GCash-webflow/webpay/data.json');
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

        if (isDisplayed) {
            no_result_container.removeClass('disabled');
            pagination_container.hide()
            results_wrapper.hide()
            letter_index_header.hide()
            search_result.text(searchValue);
        } else {
            no_result_container.addClass('disabled');
            pagination_container.show()
            results_wrapper.show()

            if (window_width < 479) {
                letter_index_header.show()
            }

        }
    }

    //Input search functionality
    search_input.on("input", function () {
        let inputValue = $(this).val().toLowerCase();

        if (active_partner_type.length == 0) {
            filterd_items = partnersData
                .sort((a, b) => a.name.localeCompare(b.name))
                .filter((item) =>
                    item.name.toLowerCase().includes(inputValue)
                );
        } else {
            filterd_items = partnersData
                .sort((a, b) => a.name.localeCompare(b.name))
                .filter((item) =>
                    item.name.toLowerCase().includes(inputValue) &&
                    item.category.toLowerCase() === active_partner_type
                );
        }

        if (filterd_items.length == 0) {
            usePagination(filterd_items)
            disableLetter(filterd_items)
            displayNoResult(true, inputValue);
        } else {
            //Reinitialize paginationJS on input
            pagination_container.pagination('destroy');
            usePagination(filterd_items)
            //Disables letters 
            disableLetter(filterd_items)
            //Hides no result element 
            displayNoResult(false);
        }

    });

    //On click event for the dropdown items
    biller_card.on("click", function () {
        $('.biller_dropdown-current').text($(this).children('.biller-label').text())

        active_partner_type = $(this).children('.biller-label').text().toLowerCase();

        filterd_items = partnersData
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((item) =>
                item.category.toLowerCase() === active_partner_type
            );

        if (filterd_items.length == 0) {
            usePagination(filterd_items)
            disableLetter(filterd_items)
            displayNoResult(true, active_partner_type);
        } else {
            //Reinitialize paginationJS on input
            pagination_container.pagination('destroy');
            usePagination(filterd_items)
            //Disables letters 
            disableLetter(filterd_items)
            //Hides no result element 
            displayNoResult(false);
        }
    });

    //On click event for list and card view controls
    $('.biller-view-options.w-radio').on("click", function () {
        //The element that holds the items
        let results_container = $('.biller-result.billers_collection-list');
        //The text container of the GCredit tag
        let gcredit_tag_text = $('.biller-services-content.card-view > .biller-item-services-title');
        let list_view_header = $('.results-wrapper > .biller-table-header');
        let display_mode = $(this).children('.biller-view-label').text().toLowerCase();

        //Attaches active modifier to clicked button
        $('.biller-view-options.w-radio').removeClass('active');
        $(this).addClass('active');

        switch (display_mode) {
            case 'list view':
                results_container.removeClass('card-view');
                results_container.addClass('list-view');
                list_view_header.addClass('list-view');
                break;
            case 'card view':
                results_container.removeClass('list-view');
                results_container.addClass('card-view');
                list_view_header.removeClass('list-view');
                break;
            default:
                results_container.removeClass('list-view');
                results_container.removeClass('card-view');
                list_view_header.removeClass('list-view');
                break;
        }

        results_area.animate(
            {
                opacity: [0, 1]
            },
            300
        )
    });

    //Event to run when clicking on the alpha bet nav
    alpha_nav_btn.on("click", function () {
        if (!$(this).hasClass('disabled')) {
            active_letter = $(this).data('letter')

            //If no biller type selected
            if (active_partner_type.length == 0) {
                if (alpha_nav_regex.test(active_letter)) {
                    filterd_items = partnersData
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .filter((item) =>
                            alpha_nav_regex.test(item.name.charAt(0))
                        );
                } else {
                    filterd_items = partnersData
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .filter((item) =>
                            item.name.toLowerCase().startsWith(active_letter)
                        );
                }

                //If a partner type is selected
            } else {
                if (alpha_nav_regex.test(active_letter)) {
                    filterd_items = partnersData
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .filter((item) =>
                            alpha_nav_regex.test(item.name.charAt(0)) &&
                            item.category.toLowerCase() === active_partner_type
                        );
                } else {
                    filterd_items = partnersData
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .filter((item) =>
                            item.name.toLowerCase().startsWith(active_letter) &&
                            item.category.toLowerCase() === active_partner_type
                        );
                }
            }

            pagination_container.pagination('destroy');
            usePagination(filterd_items)
        }
    });

    //Event to run when window resizes
    $(window).resize(function () {
        window_width = $(window).width();

        //Passes the data source to usePagination alphabetically
        usePagination(partnersData.sort((a, b) => a.name.localeCompare(b.name)))
    });


    //Disables letters 
    disableLetter(partnersData)
    //Initialize pagination function
    usePagination(partnersData.sort((a, b) => a.name.localeCompare(b.name)))

})();
