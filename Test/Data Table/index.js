
const jsonLink = "https://gcashgit.github.io/GCash-webflow/Test/Data%20Table/data.json";
let currentPage = 1;
const pageSize = 20;
let jsonData;
let categories = [];
let availability = [];
let filteredData = []; // Define filteredData as a shared variable

function fetchData() {
$.getJSON(jsonLink, function(data) {
jsonData = data;

// Extract unique categories
categories = [...new Set(jsonData.map((row) => row.Category))];

// Extract and split values from the Availability property
availability = [...new Set(jsonData.flatMap((row) => row.Availability))];

console.log(categories);
console.log(availability);

// Initialize Select2 for category filter
$("#categoryFilter").select2({
data: categories.map((category) => ({
    id: category,
    text: category,
})),
placeholder: "Select a Category",
multiple: true,
});

// Initialize Select2 for availability filter
$("#availabilityFilter").select2({
data: availability.map((value) => ({
    id: value,
    text: value,
})),
placeholder: "Select availability",
multiple: true,
});

// Add event listener for category filter change
$("#categoryFilter").on("change", function() {
displayTable();
});

// Add event listener for availability filter change
$("#availabilityFilter").on("change", function() {
displayTable();
});

displayTable();
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

// Function to toggle sorting order for a given key
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
.click(function() {
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
.click(function() {
if (currentPage > 1) {
    currentPage = 1;
    displayTable();
}
})
.addClass("table-nav");
const prevBtn = $("<li>")
.text("<")
.click(function() {
if (currentPage > 1) {
    currentPage--;
    displayTable();
}
})
.addClass("table-nav");
const nextBtn = $("<li>")
.text(">")
.click(function() {
if (currentPage < totalPages) {
    currentPage++;
    displayTable();
}
})
.addClass("table-nav");
const lastBtn = $("<li>")
.text(">>")
.click(function() {
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

$(document).ready(function() {
fetchData();

// Initialize Select2 after fetching data
$("#categoryFilter").select2({
data: categories.map((category) => ({
id: category,
text: category,
})),
placeholder: "Select a Category",
});

// Initialize Select2 after fetching data
$("#availabilityFilter").select2({
data: availability.map((availability) => ({
id: availability,
text: availability,
})),
placeholder: "Select an Availability",
multiple: true, // Allow selecting multiple values
});

// Add event listener for category filter change
$("#categoryFilter").on("change", function() {
displayTable();
});

// Add event listener for availability filter change
$("#availabilityFilter").on("change", function() {
displayTable();
});

// Add event listener for sorting headers using event delegation
$("#jsonTable").on("click", "th", function() {
const key = $(this).data("key");
toggleSortOrder(key);
displayTable();
});

// Add event listener for search input change
$("#searchInput").on("input", function() {
displayTable();
});
});

