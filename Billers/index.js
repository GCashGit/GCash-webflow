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
    const fee = newItem.querySelector('[data-element="gcredit"]');


    // Populate inner elements
    if (name) name.textContent = item.name || item.Name;
    if (payment_date) payment_date.textContent = item.payment_date;


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
    const template_element = document.querySelector('.biller-result-card.hidden');
    const results_area = document.querySelector('.biller-result.billers_collection-list');
    const search_input = $('#field-2');
    const biller_card = $('.biller-list-item');
    const pagination_container = $('#pagination-area');
    const alpha_nav_regex = new RegExp('[^A-Za-z]');

    let alpha_nav_btn = $('.alphabet-nav > .alphabet-nav_letter');
    let active_biller_type = ''
    let active_letter = '';

    //Get the data from URL source
    let partnersData = await fetchPartners('https://lxpocampofrost.github.io/gcash-stylesheet/assets/partners.json');
    //Initialize an empty array
    let filterd_items = [];

    results_area.style.opacity = '1';

    //Function to run when reattaching new data to pagination
    function usePagination(data_arr) {
        let arrowSVG = `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20.5" cy="20.4922" r="19" stroke="#025AE9" stroke-width="2"/>
        <path d="M19 24L23 20L19 16" stroke="#025AE9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
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
            }
        })
    }

    //Function that checks if item with first letter exists in array
    function hasItemStartingWithLetter(arr, letter) {
        //checks if passed value is a special character or hashtag
        if (alpha_nav_regex.test(letter)) {
            for (let i = 0; i < arr.length; i++) {
                if (alpha_nav_regex.test(arr[i].name)) {
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

    //Input search functionality
    search_input.on("input", function () {
        let inputValue = $(this).val().toLowerCase();

        if (active_biller_type.length == 0) {
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
                    item.biller_type.includes(active_biller_type)
                );
        }

        //Reinitialize paginationJS on input
        pagination_container.pagination('destroy');
        usePagination(filterd_items)

        //Disables letters 
        disableLetter(filterd_items)
    });

    //On click event for the dropdown items
    biller_card.on("click", function () {
        $('.biller_dropdown-current').text($(this).children('.biller-label').text())

        active_biller_type = $(this).children('.biller-label').text();

        filterd_items = partnersData
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter((item) =>
                item.biller_type.includes(active_biller_type)
            );

        pagination_container.pagination('destroy');
        usePagination(filterd_items)

        //Disables letters 
        disableLetter(filterd_items)
    });

    //On click event for list and card view controls
    $('.biller-view-options.w-radio').on("click", function () {
        //The element that holds the items
        let results_container = $('.biller-result.billers_collection-list');
        //The text container of the GCredit tag
        let gcredit_tag_text = $('.biller-services-content.card-view > .biller-item-services-title');
        let list_view_header = $('.results-wrapper > .biller-table-header');
        let display_mode = $(this).children('.biller-view-label').text().toLowerCase();

        switch (display_mode) {
            case 'list view':
                results_container.removeClass('card-view');
                results_container.addClass('list-view');
                list_view_header.addClass('list-view');
                gcredit_tag_text.text('GCredit');
                break;
            case 'card view':
                results_container.removeClass('list-view');
                results_container.addClass('card-view');
                list_view_header.removeClass('list-view');
                gcredit_tag_text.text('Accepts GCredit');
                break;
            default:
                results_container.removeClass('list-view');
                results_container.removeClass('card-view');
                list_view_header.removeClass('list-view');
                gcredit_tag_text.text('Accepts GCredit');
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

            if (active_biller_type.length == 0) {
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

            } else {
                if (alpha_nav_regex.test(active_letter)) {
                    filterd_items = partnersData
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .filter((item) =>
                            alpha_nav_regex.test(item.name.charAt(0)) &&
                            item.biller_type.includes(active_biller_type)
                        );
                } else {
                    filterd_items = partnersData
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .filter((item) =>
                            item.name.toLowerCase().startsWith(active_letter) &&
                            item.biller_type.includes(active_biller_type)
                        );
                }

            }

            pagination_container.pagination('destroy');
            usePagination(filterd_items)
        }
    });

    //Disables letters 
    disableLetter(partnersData)
    //Initialize pagination function
    usePagination(partnersData.sort((a, b) => a.name.localeCompare(b.name)))

    /*
        ToDo: 
        - No result 
        - Responsive styles
    */

    //Create pagination
})();




