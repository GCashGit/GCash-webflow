$(document).ready(function() {

  // For the URL parameter ?partner =
  var cashInPartner = getParameterByName('partner');  

if (BANKS.hasOwnProperty(cashInPartner)) {
  var partnerInstructions = BANKS[cashInPartner].instructions;
  var partnerHeader = BANKS[cashInPartner].name;
  var partnerLogo = BANKS[cashInPartner].logo;

  // if URL is set
  if (partnerInstructions) {
    // For Header
    var headerText = 'Cash In via ' + partnerHeader;
    $('#cash-in-header').html(headerText);
    $( "#image-container" ).remove();
    $('#cash-in-header').show(); // Show the header
    $('#instructions').addClass('CI-Bank');
    var stepHtml = '';

    // Loop to display each Instructions
    for (var i = 0; i < partnerInstructions.length; i++) {
      // Generate Each Instruction lines
      var stepElement = partnerInstructions[i];
      stepHtml += stepElement;
    }
    // Display Instructions on ID
    $('#cash-in-steps').html(stepHtml);
  } 

  if (partnerLogo) {
    $('.CICO-header')
      .addClass('CICO-header-border');
    $('<img class="partner-img">')
      .attr('src', partnerLogo)
      .addClass('conditional-image')
      .appendTo('.logo-container');
    $('<div class="partner-title-container"></div>')
      .appendTo('.logo-container');
    $('<p class="partner-name">' + partnerHeader + '</p>')
      .appendTo('.partner-title-container');
  }
  
} else {
   // Handle case where cashInPartner is not valid
   console.log('Invalid or missing partner:', cashInPartner);
}

});

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
