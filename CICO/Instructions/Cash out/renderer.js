
$(document).ready(function() {
    document.title = 'How to Cash Out'

    /**
   * * set Header background color
   */
  if (window.AlipayJSBridge) {
    AlipayJSBridge.call('setTitleColor', {
      color: 1667833, // 22500,
    })
  }
    // For the URL parameter ?cash-out-partner =
    var cashOutPartner = getParameterByName('cash-out-partner');

    if (CASHOUT.hasOwnProperty(cashOutPartner)) {
        var partnerData = CASHOUT[cashOutPartner];

        var serviceType = partnerData.type
        var instructions = partnerData.instructions;
        var partnerHeader = partnerData.name;
        var partnerLogo = partnerData.logo;
        var mapbutton = partnerData.mapbutton;
        var listType = partnerData.listType || null

    } else {
        $('.CICO-Instructions').empty();
    }
  
    if (partnerHeader == "GCash Pera Outlet") {
        $('#instructions').addClass('revamped');
        $('.CICO-header').addClass('revamped');
    }

  
    // if URL is set
    if (instructions) {
        // For Header
        var headerText = 'Cash Out via ' + partnerHeader;
        $('#cash-out-header').html(headerText);
        $( "#image-container" ).remove();
        $('#cash-out-header').show(); // Show the header
        var stepHtml = '';

        // Loop to display each Instructions
        for (var i = 0; i < instructions.length; i++) {
            // Generate Each Instruction lines
            var stepElement = instructions[i];
            stepHtml += stepElement;
        }
        // Display Instructions on ID
        $('#cash-out-steps').html(stepHtml);
    } 

    // OTC type
  if (serviceType=="OTC") {
    if (instructions) {
      if (instructions.length < 4) {
      // For instructions with 3 lines
        var steps = [
          {
            step: 'Step 1',
            image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f33562d384dfd1e439ce_bc%20-%20Step%201.png'
          },
          { 
            step: 'Step 2',
            image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f335759404555a664766_bc%20-%20Step%202.jpg'
          },
          {
            step: 'Step 3',
            image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f335e9065aa88435cb8a_bc%20-%20Step%203.png'
          },
        ];
      }
    
      else if (instructions.length == 4) {
        // For instructions with 4 lines
        var steps = [
          {
            step: 'Step 1',
            image: 'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/6493ed9735cf63e96981dbe1_pos-1.png'
          },
          { 
            step: 'Step 2',
            image: 'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/6493ed9735cf63e96981dbe1_pos-1.png'
          },
          {
            step: 'Step 3',
            image: 'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/6493ed97e02b9ba4e3f1e578_pos-3.png'
          },
          {
            step: 'Step 4',
            image: 'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/6493ed97541fde473a002587_pos-4.png'
          }
        ];
      }

      else if (instructions.length == 5) {
        // For instructions with 5 lines
        var steps = [
          {
            step: 'Step 1',
            image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f33562d384dfd1e439ce_bc%20-%20Step%201.png'//'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/6493ed9735cf63e96981dbe1_pos-1.png'
          },
          { 
            step: 'Step 2',
            image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f33562d384dfd1e439ce_bc%20-%20Step%201.png' //'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/6493ed9735cf63e96981dbe1_pos-1.png'
          },
          {
            step: 'Step 3',
            image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66b2f335e9065aa88435cb8a_bc%20-%20Step%203.png' //'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/6493ed97e02b9ba4e3f1e578_pos-3.png'
          },
          {
            step: 'Step 4',
            image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/65f415710116312d132b466f_pos-4.png'
          },
          {
            step: 'Step 5',
            image: 'https://uploads-ssl.webflow.com/6385b55675a0bd614777a5c1/66bb0baa05e491bf6bf83d64_co-step5.png'
          }
        ];
      }
      var isGCashPO = partnerHeader === 'GCash Pera Outlet';
      var headerText = isGCashPO ? 'Cash Out via Cashier' : 'How to Cash Out';
      var headerSubText = isGCashPO ? '' : 'At any branch of these official partners';
      $('#cash-out-header').html(headerText);
      $('#cash-out-subheader').html(headerSubText);
      $( "#image-container" ).remove();
      $('#cash-out-header').show(); // Show the header
      $('#instructions').addClass('CO-OTC');
      var stepHtml = '';
      var stepElement = '';
      for (var i = 0; i < instructions.length; i++) {
        var stepNumber = i + 1;
        
        if (listType === null) {
          stepElement = '<div class="step-element"><img src="' + steps[i].image + '"><div class="step-element-content"><span><b>' + steps[i].step + '</b></span><p>' + instructions[i] + '</p></div></div>';
        } else {
          /**
           * * Can add additional condition for listType
           */
          stepElement = `
            <div class="step-element ol-disc">
              <span class="step-number">${stepNumber}</span>
              <p>${instructions[i]}</p>
            </div>
          `;
        }
        stepHtml += stepElement;
      }
      $('#cash-out-steps').html(stepHtml);
    } 

    function getUrlParameter(name) {
      var urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

  }
 
  // Barcode Type
  if (serviceType=="barcode") {
    var headerText = 'How to Cash Out';
    var subHeaderText = 'At any branch of these official partners';
    $('#instructions').addClass('CO-Barcode');
    $('.CO-Barcode #cash-out-header').html(headerText);
    $('.CO-Barcode #cash-out-subheader').html(subHeaderText);
  

    var steps = [
      {
        step: 'Step 1',
        text: 'Inform the Cashier that you would like to Cash Out to your GCash wallet.',
        image: 'https://www.gcash.com/wp-content/uploads/2020/12/iconLevel15Merchant.png'
      },
      { 
        step: 'Step 2',
        text: 'Tap on "Generate Barcode" button above. Enter the amount then tap \'Generate Barcode\'. Show the cashier the generated barcode in the app.',
        image: 'https://www.gcash.com/wp-content/uploads/2021/03/PhoneInHand60x60.jpg'
      },
      {
        step: 'Step 3',
        text: 'Cashier to confirm, and print receipt. Wait for a text confirmation upon successful Cash Out before leaving the store.',
        image: 'https://www.gcash.com/wp-content/uploads/2019/08/valid_id.png'
      }
    ];

    var stepHtml = '';
    for (var i = 0; i < steps.length; i++) {
      var stepNumber = i + 1;
      var stepElement = '<div class="step-element"><img src="' + steps[i].image + '"><div class="step-element-content"><span><b>' + steps[i].step + '</b></span><p>' + steps[i].text + '</p></div></div>';
      stepHtml += stepElement;
    }

  
    $('.CO-Barcode #cash-out-steps').html(stepHtml);
  
    var imageUrl = 'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/64a2695dd5e9bb672ace7e37_barcode_fullwidth.jpeg'; //'barcode_fullwidth.jpeg';//'https://uploads-ssl.webflow.com/64129d0a758f1256bf3e95cc/64758b6c555ad35ace755328_Cash%20In%20no%20shadow.png';//'https://www.gcash.com/wp-content/uploads/2019/10/barcode_fullwidth.jpg';
    var linkUrl = 'https://gcashapp.page.link/cashin_subapp_genericBarcode';

    var imageElement = $('<img>').attr({
      src: imageUrl,
      style: 'max-width: 100%;',
      alt: ''
    });
  
    var linkElement = $('<a>').attr({
      href: linkUrl,
      target: '_self'
    }).append(imageElement);

    $('.CO-Barcode #image-container').append(linkElement);
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
