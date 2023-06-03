let resultsCount = $('.map_filtered-items-number');
let filterRegionCurrent = $('.map_filter-current.map_region');
let filterCityCurrent = $('.map_filter-current.map_city');
let filter = $('.map_sidebar-filter');
let filterList = $('.map_filter-dropdown-content');
let filterItem = $('.map_filter-dropdown-content .map_filter-drodpown-list-item');

//Save a copy of the template element
let templateElement = document.getElementById('map_search-item'); 

/**
 * Creates an item from the template element.
 * @param product The product data to create the item from.
 * @param templateElement The template element.
 *
 * @returns A new Collection Item element.
 */
const createItem = (product, templateElement) => {

  // Clone the template element
  const newItem = templateElement.cloneNode(true);
  // Query inner elements
  const name = newItem.querySelector('[data-element="name"]');
  const address = newItem.querySelector('[data-element="address"]');
  const city = newItem.querySelector('[data-element="city"]');
  const distance = newItem.querySelector('[data-element="distance"]');

  // Populate inner elements
  if (name) name.textContent = product.name || product.Name;
  if (address) address.textContent = product.address || product.Address;
  if (city) city.textContent = product.city || product.City;

  return newItem;
};

/**
 *  Methods to filter incoming data based on user position 
 *  @method convertToRegion
 *  Converts google's naming of regions, 
 *  to the numbered version ex. Region IX, Region I
 *  @param  regionStr 
 *  A string that resembles the 
 *  numbered region's name in word form
 
 *  @method getUserLocationData 
 *  Returns array that contains user's city, region and address
 *  @param coords 
 *  An object with lat and lng values

 *  @method getUserLocationData 
 *  Returns array that contains user's city, region and address
 *  @param userLocation 
 *  An object that holds details 
 *  of users location, city, region and address
 *  @param partnersData
 *  An Array that holds objects with values of partners
 * 
*/ 
function convertRegion(regionString) {   
  switch(regionString.toLowerCase()) {
      case 'ilocos region': 
          regionString = 'Region I';
          break
      case 'cagayan valley': 
          regionString = 'Region II';
          break
      case 'central luzon': 
          regionString = 'Region III';
          break
      case 'calabarzon': 
          regionString = 'Region IV-A';
          break
      case 'mimaropa': 
          regionString = 'Region IV-B';
          break
      case 'bicol': 
          regionString = 'Region V';
          break
      case 'western visayas': 
          regionString = 'Region VI';
          break
      case 'central visayas': 
          regionString = 'Region VII';
          break
      case 'eastern visayas': 
          regionString = 'Region VIII';
          break
      case 'zamboanga peninsula': 
          regionString = 'Region IX';
          break
      case 'northern mindanao': 
          regionString = 'Region X';
          break
      case 'davao region': 
          regionString = 'Region XI';
          break
      case 'soccsksargen': 
          regionString = 'Region XII';
          break
      case 'caraga': 
          regionString = 'Region XIII';
          break
      case 'armm':
          regionString = 'BARMM';
      default:
          regionString = regionString;
  }

  return regionString;
}

async function getUserLocationData(coords) {
  let url ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords.lat +',' + coords.lng +
  '&key=AIzaSyD1lDeWCObDolArPKOXaO2OeQxAlgZBZGY&region=US&language=en';

  try {
    let response = await fetch(url).then((response) => response.json());
    let city = response.results.find(item => item.types[0]  === 'locality');
    let region = response.results.find(item => item.types[0]  === 'administrative_area_level_1');
    let addresObj = {
      city: city.address_components[0].long_name,
      region: convertRegion(region.address_components[0].short_name),
      address: response.results[0].formatted_address
    }

    $('.map_location-tag-result').text(addresObj.city + ", " + addresObj.region);
    filterRegionCurrent.text(addresObj.region);
    filterCityCurrent.text(addresObj.city);

    return addresObj;
  } catch (error) {
    console.log('user location data: ', error.message);
  }
}

function filterByLocation(userLocation, partnersData) {

  let initialFilter = partnersData.filter((item) => 
    item.city.toLowerCase().includes(userLocation.city.toLowerCase()) &&
    item.region.toLowerCase().includes(userLocation.region.toLowerCase())
  );

  return initialFilter;
}

/**
 * Methods to get user position
 * @method getPosition() Gets user position and returns promise from navigator
 * @method getCoordinates() Returns object with lat and long values
*/ 
function getPosition(options) {
  return new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      })
  );
}

async function getCoordinates() {
  try {
    const response = await getPosition();
    let coordinates = {
      lat: response.coords.latitude,
      lng: response.coords.longitude,
    }

    return coordinates;
  } catch (error) {
    console.log('getCoordinates(): ', error.message);
  }
}

/**
 * Methods to fetch Partners data
 * @method fetchPartners() Returns Array from API that uses JSON
*/ 
async function fetchPartners () {
  try {
    const response = await fetch('https://lxpocampofrost.github.io/gcash-stylesheet/assets/billers.json');
    const data = await response.json();

    return data;
  } catch (error) {
    console.log('fetchPartners(): ', error.message);
    return [];
  }
};

/**
 * Methods to get user position
 * @method initializeFilterData() 
 * Async function that gets data first from partners
*/ 
async function initializeFilterData() {
  try {
    //Get partners data
    let partnersData = await fetchPartners();
    //Get user coodinates
    let coordinates = await getCoordinates();
    //Get location from coordinates
    let userLocation = await getUserLocationData(coordinates);
    
    //Filter partners data based on user location
    let filteredPartners = filterByLocation(userLocation , partnersData);

    let data = {
      allItems: partnersData,
      filteredItems: filteredPartners,
      coords: coordinates,
      location: userLocation,
    };
    
    return data;
  } catch (error) {
    console.log('Main method: ', error.message);
  }
}

/**
 * Map Methods and variables
 * @var map The global GMaps object
 * 
 * @method initMap() Initialized the map UI of Google Maps
*/
let map;

async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 14.40, lng: 121.03 },
    disableDefaultUI: true,
    styles: [
      {
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
      },
    ]
  });

    
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  directionsRenderer.setMap(map);

  // onChangeHandler(coordinates);

  const control = document.getElementById("floating-panel");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);


  function renderRoutes(directions) {
    $('#steps-sidebar').empty();
    directions.forEach((direction) => {
      $('#steps-sidebar').append(
        `
        <div class="steps">
          <div class="adp-maneuver-icon adp-${direction.maneuver}"></div>
          <div class="content">
            <p class="instructions">${direction.instructions}</p>
            <span class="distance">${direction.distance.value}m</span>
          </div>
        </div>
        `
      );
    });
  }
  function calculateAndDisplayRoute(directionsService, directionsRenderer,coordinates) {
    const start = coordinates.lat + ',' + coordinates.lng;
    const end = document.getElementById("end").value;
    const selectedMode = document.getElementById("mode").value;
    const data = null;
    directionsService
      .route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        let directions = directionsRenderer.getDirections()
        renderRoutes(directions.routes[0].legs[0].steps);
      })
      .catch((e) =>
        window.alert("Request failed, something went wrong. Please try again later.")
      );
  }
  
  const onChangeHandler = function (coords) {
    let endInput = $('#end');
    let startInput = $('#start');
    let startLocation = $('.starting-point .highlight.start-address');
    startLocation.text(startInput.val());
    calculateAndDisplayRoute(directionsService, directionsRenderer, coords);
  };

  /**
 * Method to render data to HTML
 *  @method renderDataToHTML
 *  Renders items to the results panel
 *  @param  partnerData 
 *  Array that holds filtered data
 *  @param  templateElement
 *  Copy of the element that holds the base structure 

 *  @method filterByInput
 *  Renders items to the results panel
 *  @param  partnerData 
 *  Array that holds filtered data
 *  @param  templateElement
 *  Copy of the element that holds the base structure 
*/ 
  function renderDataToHTML(partnerData, templateElement, coords) {
    let newItems = partnerData.map((item) => createItem(item, templateElement));
    let itemLimit = 4;

    //Clear initial elements
    $('.map_search-results').empty();

    //Append to HTML
    newItems.slice(0, itemLimit).map(item => {
      $('.map_search-results').append(item);
    });

    //Display number of results
    resultsCount.text(partnerData.length);

    //Attach see directions event to rendered btn
    $('.map_dir-btn').on('click', function() {
      let directionsBtn = $(this);
      //Targets direction services end input
      let endInput = $('#end');
      //Elmenent - Sidebar location name
      let partnerName = $('.outlets_sidebar-location > .outlets_sidebar-destination');
      //Elmenent - Sidebar location address
      let partnerAddress = $('.outlets_sidebar-location > .outlets_sidebar-address');
      $('.outlets_sidebar-wrapper').css('display', 'flex');
  
      partnerName.text(directionsBtn.parent().siblings('.map_search-item-destination').text());
      partnerAddress.text(directionsBtn.parent().siblings('.map_search-item-address').text());
      endInput.attr('value', directionsBtn.parent().siblings('.map_search-item-address').text());
      onChangeHandler(coords);
    });

    //Infinite scroll, Adds items when scroll reaches bottom;
    $('.map_search-results').on('scroll', function(){
      var $el = $(this);
    
      if( $el.innerHeight()+$el.scrollTop() >= this.scrollHeight-5 ){
        itemLimit++;
        $('.map_search-results').append(newItems[itemLimit - 1]);
         //Attach see directions event to rendered btn
        $('.map_dir-btn').on('click', function() {
          let directionsBtn = $(this);
          //Targets direction services end input
          let endInput = $('#end');
          //Elmenent - Sidebar location name
          let partnerName = $('.outlets_sidebar-location > .outlets_sidebar-destination');
          //Elmenent - Sidebar location address
          let partnerAddress = $('.outlets_sidebar-location > .outlets_sidebar-address');
          $('.outlets_sidebar-wrapper').css('display', 'flex');
      
          partnerName.text(directionsBtn.parent().siblings('.map_search-item-destination').text());
          partnerAddress.text(directionsBtn.parent().siblings('.map_search-item-address').text());
          endInput.attr('value', directionsBtn.parent().siblings('.map_search-item-address').text());
          onChangeHandler(coords);
        });
      }
    });

  }

  function filterByInput(partnerData, templateElement, coords) {
    $( ".map_search-input.w-input" ).on("input", function() {
      let inputValue = $(this).val().toLowerCase();
      
      filteredData = partnerData.filter((item) => 
        item.name.toLowerCase().includes(inputValue) ||
        item.city.toLowerCase().includes(inputValue) ||
        item.address.toLowerCase().includes(inputValue)
      );

      if (filteredData.length != 0) {
        renderDataToHTML(filteredData, templateElement, coords);
      } else {
        $('.map_search-results').empty();
      }
    });
  }


  function filterByDropdown(partnerData, templateElement, coords) {
    let changeBtn = $('.map_search-item-btn.map_change-location');
    let cancelBtn = $('.map_action-btn.cancel');
    let applyBtn = $('.map_action-btn.apply');
    let searchByNameBlock = $('.map_form.map_search-by-name');
    let searchByDropdown = $('.map_form.map_search-by-dropdown');

    //Opens dropdowns
    changeBtn.on('click', function() {
      //Adds classes 'disabled' and 'active'
      searchByNameBlock.addClass('disabled');
      searchByDropdown.addClass('active');
      $('.w-checkbox-input').prop('checked', false);
    });

    //Close dropdown filters
    cancelBtn.on('click', function() {
      searchByNameBlock.removeClass('disabled');
      searchByDropdown.removeClass('active');
    });

    //Applies dropdown value filters
    applyBtn.on('click', function() {
      filteredData = partnerData.filter((item) => 
        item.city.toLowerCase().includes(filterCityCurrent.text().toLowerCase()) &&
        item.region.toLowerCase().includes(filterRegionCurrent.text().toLowerCase())
      );
      
      renderDataToHTML(filteredData, templateElement, coords);
      filterByInput(filteredData, templateElement, coords);

      searchByNameBlock.removeClass('disabled');
      searchByDropdown.removeClass('active');
    });

    //Closes dropdown list, when clicking dropdown again
    filter.on('click', function() {
      if( $(this).children('.map_filter-dropdown-content').css('display') == 'none') { 
        filterList.css('display', 'none');
        $(this).children('.map_filter-dropdown-content').css('display', 'block');
      } else {
        $(this).children('.map_filter-dropdown-content').css('display', 'none');
      }
    });

    //Changes current dropdown value on item click
    filterItem.on('click', function() {
      $(this).parent()
      .siblings('.map_filter-dropdown-toggle')
      .children('.map_filter-current')
      .text($(this).text());
    });
  }

  let data = await initializeFilterData();

  $('.starting-point .highlight.start-address').text(data.location.address);

  //Render the data to HTML and attach event listeners
  renderDataToHTML(data.filteredItems, templateElement, data.coords);
  filterByInput(data.filteredItems, templateElement, data.coords);
  filterByDropdown(data.allItems, templateElement, data.coords);
  
  //Closes the directions sidebar
  $('.outlets_sidebar-close-btn').on('click', function() {
    $('.outlets_sidebar-wrapper').css('display', 'none');
  });
}

window.initMap = initMap;
