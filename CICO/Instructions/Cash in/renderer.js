$(document).ready(function() {
document.title = 'How to Cash In'

/**
 * * set Header background color
 */
if (window.AlipayJSBridge) {
  AlipayJSBridge.call('setTitleColor', {
    color: 1667833, // 22500,
  })
}

// For the URL parameter ?cash-in-partner =
var cashInPartner = getParameterByName('cash-in-partner');

if (CASHIN.hasOwnProperty(cashInPartner)) {
  var partnerData = CASHIN[cashInPartner];

  var serviceType = partnerData.type;
  var instructions = partnerData.instructions;
  var partnerHeader = partnerData.name;
  var partnerLogo = partnerData.logo;
  var mapbutton = partnerData.mapbutton;
  var isRevamped  = partnerData && partnerData.isRevamped

} else {
  $('.CICO-Instructions').empty();
}

/**
 * *======================================*
 * *        Cash In Revamp version        *
 * * if partner has isRevamped property   *
 * * set revamped class to the following  *
 * * elements. Hide the header container  *
 * *======================================*
 */

if (isRevamped) {
  $('.header-container').css('display', 'none');
  $('#instructions').addClass('revamped');
  $('.CICO-header').addClass('revamped');
}
// if URL is set
if (instructions) {
  // For Header
  var headerText = 'Cash In via ' + partnerHeader;
  $('#cash-in-header').html(headerText);
  $('#cash-in-header').show(); // Show the header
  var stepHtml = '';

  // Loop to display each Instructions
  for (var i = 0; i < instructions.length; i++) {
    // Generate Each Instruction lines
    var stepElement = instructions[i];
    stepHtml += stepElement;
  }
  // Display Instructions on ID
  $('#cash-in-steps').html(stepHtml);
} 

// OTC type
if (serviceType=="OTC") {
  if (instructions) {
    $( "#image-container" ).remove();
    if (instructions.length == 3) {
    // For instructions with 3 lines
      var steps = [
        {
          step: 'Step 1',
          image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f33562d384dfd1e439ce_bc%20-%20Step%201.png'
        },
        { 
          step: 'Step 2',
          image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f335759404555a664766_bc%20-%20Step%202.jpg' //'https://www.gcash.com/wp-content/uploads/2019/08/fill_out_form.png'
        },
        {
          step: 'Step 3',
          image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f335e9065aa88435cb8a_bc%20-%20Step%203.png'
          //image: 'https://www.gcash.com/wp-content/uploads/2019/08/valid_id.png'
        },
      ];
    }
  
    else {
      // For instructions with 4 lines
      var steps = [
        {
          step: 'Step 1',
          image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f33562d384dfd1e439ce_bc%20-%20Step%201.png'
        },
        { 
          step: 'Step 2',
          image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f335f9b08b853f04658d_Step%202.png'
        },
        {
          step: 'Step 3',
          image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f335e9065aa88435cb8a_bc%20-%20Step%203.png'
        },
        {
          step: 'Step 4',
          image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/65f415710116312d132b466f_pos-4.png'
        }
      ];
    }
    
    var headerText = 'How to Cash In';
    var headerSubText = 'At any branch of these official partners';
    $('#cash-in-header').html(headerText);
    $('#cash-in-subheader').html(headerSubText);
    $( "#image-container" ).remove();
    $('#cash-in-header').show(); // Show the header
    $('#instructions').addClass('CI-OTC');
    var stepHtml = '';
    var stepElement = '';
    for (var i = 0; i < instructions.length; i++) {
      // var stepNumber = i + 1;

      if (!isRevamped) {
        stepElement = '<div class="step-element"><img src="' + steps[i].image + '"><div class="step-element-content"><span><b>' + steps[i].step + '</b></span><p>' + instructions[i] + '</p></div></div>';
      }
      else {
        stepElement = `
        <div class="step-element ol-disc">
          <span class="step-number">${i+1}</span>
          <p>${instructions[i]}</p>
        </div>
      `;
      }
      stepHtml += stepElement;
    }
    $('#cash-in-steps').html(stepHtml);
  } 

  function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

}

// Barcode Type
if (serviceType=="barcode") {
  var headerText = 'How to Cash In';
  var subHeaderText = 'At any branch of these official partners';
  $('#instructions').addClass('CI-Barcode');
  $('.CI-Barcode #cash-in-header').html(headerText);
  $('.CI-Barcode #cash-in-subheader').html(subHeaderText);
  

  var steps = [
    {
      step: 'Step 1',
      //text: 'Inform the Cashier that you want to Cash In to your GCash wallet.',
      image: 'https://www.gcash.com/wp-content/uploads/2020/12/iconLevel15Merchant.png'
    },
    { 
      step: 'Step 2',
      //text: 'Tap on "Generate Barcode" button above. Enter the amount then tap \'Generate Barcode\'. Show the cashier the generated barcode.',
      image: 'https://www.gcash.com/wp-content/uploads/2021/03/PhoneInHand60x60.jpg'
    },
    {
      step: 'Step 3',
      //text: 'Cashier to confirm, collect payment and print receipt. Wait for a text confirmation upon successful Cash In before leaving the store.',
      image: 'https://www.gcash.com/wp-content/uploads/2019/08/valid_id.png'
    }
  ];


  var stepHtml = '';
  for (var i = 0; i < instructions.length; i++) {
    // var stepNumber = i + 1;

    if (!isRevamped) {
      stepElement = '<div class="step-element"><img src="' + steps[i].image + '"><div class="step-element-content"><span><b>' + steps[i].step + '</b></span><p>' + instructions[i] + '</p></div></div>';
    }
    else {
      stepElement = `
      <div class="step-element ol-disc">
        <span class="step-number">${i+1}</span>
        <p>${instructions[i]}</p>
      </div>
    `;
    }
    stepHtml += stepElement;
  }


  $('.CI-Barcode #cash-in-steps').html(stepHtml);
  if (!isRevamped) {
     var imageUrl = 'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/64a2695dd5e9bb672ace7e37_barcode_fullwidth.jpeg'; //'barcode_fullwidth.jpeg';//'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/64758b6c555ad35ace755328_Cash%20In%20no%20shadow.png';//'https://www.gcash.com/wp-content/uploads/2019/10/barcode_fullwidth.jpg';
  }
    else {
    var imageUrl = 'https://cdn.prod.website-files.com/6385b55675a0bd614777a5c1/6729bf6d41b7f1ade7d2ae9b_OTC.png';
    }
  var linkUrl = 'gcash://com.mynt.gcash/app/006300070012';//'https://gcash.cashin.viacode/gcash.splashscreen/?redirect=gcash://com.mynt.gcash/app/006300080600'; //'https://gcashapp.page.link/cashin_subapp_genericBarcode';

          if (!isRevamped) {
  var imageElement = $('<img>').attr({
    src: imageUrl,
    style: 'max-width: 100%;',
    alt: ''
  });
          }
    else {
          var imageElement = $('<img>').attr({
    src: imageUrl,
    style: 'max-width: 100%; border: none; box-shadow: 0px 8px 12px -8px rgba(15, 37, 69, 0.2);',
    alt: ''
  });
    }

  var linkElement = $('<a>').attr({
    href: linkUrl,
    target: '_self'
  }).append(imageElement);

  $('.CI-Barcode #image-container').append(linkElement);
}

// logo
$('.CICO-header').addClass('CICO-header-border');
if (partnerLogo) {
  $('<img class="partner-img">')
  .attr('src', partnerLogo)
  .addClass('conditional-image')
  .appendTo('.logo-container');
} else {
 $('<img class="partner-img-placeholder">')
  .attr('src', 'https://www.codespeedy.com/wp-content/uploads/2019/03/Chrome-Broken-Image-Icon.png')
  .addClass('default-image')
  .appendTo('.logo-container');
}
$('<div class="partner-title-container"></div>')
.appendTo('.logo-container');
$('<p class="partner-name">' + partnerHeader + '</p>')
.appendTo('.partner-title-container');
$('<div class="map-button-container"></div>')
.appendTo('.partner-title-container');


// mapbutton
if (mapbutton) {
  var buttonHTML = '<a href="' + mapbutton + '" target="_self" class="cico-map-btn" id="cico-map" >View nearby branches</a>';
  $('.map-button-container').html(buttonHTML);
}

else {
  $(".map-button-container").remove();
}

});

function getParameterByName(name) {
name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
var results = regex.exec(location.search);
return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

