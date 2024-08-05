const pageSize = 20;
let currentPage = 1;
let jsonData = [];
let categories = [];
let availability = [];
let filteredData = [];

async function fetchData(jsonLink) {
    try {
        const response = await fetch(jsonLink);
        const data = await response.json();
        jsonData = data;

        categories = [...new Set(jsonData.map((row) => row.Category))];
        availability = [...new Set(jsonData.flatMap((row) => row.Availability))];

        console.log(categories);
        console.log(availability);

        initializeSelect2("#categoryFilter", categories, "Select a Category");
        initializeSelect2("#availabilityFilter", availability, "Select availability");

        $("#categoryFilter, #availabilityFilter").on("change", function () {
            displayTable();
        });

        displayTable();
    } catch (error) {
        console.log('fetchData(): ', error.message);
    }
}

function initializeSelect2(selector, data, placeholder) {
    $(selector).select2({
        data: data.map((value) => ({ id: value, text: value })),
        placeholder: placeholder,
        multiple: true,
    });
}

function displayTable() {
    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const table = $("#jsonTable");

    table.empty();

    // Display table header with sorting buttons
    const headerRow =
        "<tr>" +
        Object.keys(jsonData[0])
            .map((key) => `<th data-key="${key}" data-order="asc">${key}</th>`)
            .join("") +
        "</tr>";
    table.append(headerRow);

    // Get selected categories
    const selectedCategories = $("#categoryFilter").val();

    // Get selected availability values
    const selectedAvailability = $("#availabilityFilter").val();

    // Get search input value
    const searchValue = $("#searchInput").val().toLowerCase();

    // Filter data based on selected categories and availability values
    filteredData = (
        !selectedCategories || selectedCategories.length === 0
            ? jsonData
            : jsonData.filter((row) => selectedCategories.includes(row.Category))
    ).filter((row) =>
        (selectedAvailability.length === 0 ||
            selectedAvailability.some((value) => row.Availability.includes(value))) &&
        Object.values(row).some(value =>
            value.toLowerCase().includes(searchValue)
        )
    );

    // Display table rows
    for (let i = startIdx; i < endIdx && i < filteredData.length; i++) {
        const rowData = filteredData[i];
        const row =
            "<tr>" +
            Object.keys(rowData).map((key) => {
                if (key === "Availability") {
                    const availabilityValues = rowData[key].split('; ');

                    // Wrap each availability value in a span tag
                    const availabilityHtml = availabilityValues
                        .map((value) => `<span class="availability">${value}</span>`)
                        .join(" ");

                    return `<td>${availabilityHtml}</td>`;
                } else {
                    return `<td>${rowData[key]}</td>`;
                }
            }).join("") +
            "</tr>";
        table.append(row);

        displayPagination();
    }
}


function toggleSortOrder(key) {
    const thElement = $(`th[data-key="${key}"]`);
    const sortOrder = thElement.data("order") || "asc";

    if (sortOrder === "asc") {
        filteredData.sort((a, b) => a[key].localeCompare(b[key]));
        thElement.data("order", "desc");
        console.log("if " + key);
    } else {
        filteredData.sort((a, b) => b[key].localeCompare(a[key]));
        thElement.data("order", "asc");
        console.log("else " + key);
    }
}
function displayPagination() {
    // Calculate the number of pages based on the filtered data
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginationList = $(".pagination");
    paginationList.empty();

    const maxDisplayedPages = 10; // Limit the number of displayed pages

    let startPage = Math.max(
        1,
        currentPage - Math.floor(maxDisplayedPages / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

    // Adjust startPage if it is at the end
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);

    // Display pagination buttons
    for (let i = startPage; i <= endPage; i++) {
        const listItem = $("<li>")
            .text(i)
            .click(function () {
                currentPage = i;
                displayTable();
            });
        if (i === currentPage) {
            listItem.addClass("active");
        }
        paginationList.append(listItem);
    }

    // Display first, prev, next, last buttons
    const firstBtn = $("<li>")
        .text("<<")
        .click(function () {
            if (currentPage > 1) {
                currentPage = 1;
                displayTable();
            }
        })
        .addClass("table-nav");
    const prevBtn = $("<li>")
        .text("<")
        .click(function () {
            if (currentPage > 1) {
                currentPage--;
                displayTable();
            }
        })
        .addClass("table-nav");
    const nextBtn = $("<li>")
        .text(">")
        .click(function () {
            if (currentPage < totalPages) {
                currentPage++;
                displayTable();
            }
        })
        .addClass("table-nav");
    const lastBtn = $("<li>")
        .text(">>")
        .click(function () {
            if (currentPage < totalPages) {
                currentPage = totalPages;
                displayTable();
            }
        })
        .addClass("table-nav");

    if (currentPage === 1) {
        firstBtn.addClass("disabled");
        prevBtn.addClass("disabled");
    }

    if (currentPage === totalPages) {
        nextBtn.addClass("disabled");
        lastBtn.addClass("disabled");
    }

    paginationList.prepend(firstBtn, prevBtn);
    paginationList.append(nextBtn, lastBtn);
}


$(document).ready(function () {
    const jsonLink = "https://gcashgit.github.io/GCash-webflow/Test/Data%20Table/Webpay/data.json";
    fetchData(jsonLink);

    // Initialize Select2 after fetching data
    initializeSelect2("#categoryFilter", categories, "Select a Category");
    initializeSelect2("#availabilityFilter", availability, "Select an Availability");

    $("#categoryFilter, #availabilityFilter").on("change", function () {
        displayTable();
    });

    $("#jsonTable").on("click", "th", function () {
        const key = $(this).data("key");
        toggleSortOrder(key);
        displayTable();
    });

    $("#searchInput").on("input", function () {
        displayTable();
    });
});
