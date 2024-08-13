$(document).ready(function() {
document.title = 'Cash In';

// For the URL parameter ?partner =
var cashInPartner = getParameterByName('partner');  

if (REMITTANCES.hasOwnProperty(cashInPartner)) {
var instructions = REMITTANCES[cashInPartner].instructions;
var partnerHeader = REMITTANCES[cashInPartner].name;
var partnerLogo = REMITTANCES[cashInPartner].logo;
var isRevamped = REMITTANCES[cashInPartner] && REMITTANCES[cashInPartner].isRevamped

// if URL is set
if (instructions) {
  // For Header
  var headerText = 'Cash In via ' + partnerHeader;
  $('#cash-in-header').html(headerText);
  $( "#image-container" ).remove();
  $('#cash-in-header').show(); // Show the header
  $('#instructions').addClass('CI-Remittances');
  var stepHtml = '';

  // Loop to display each Instructions
  for (var i = 0; i < instructions.length; i++) {
    // Generate Each Instruction lines
    var stepElement = instructions[i];
    stepHtml += stepElement;
  }
  if (isRevamped) {
    $('.header-container').css('display', 'none');
    $('#instructions').addClass('revamped');
    $('.CICO-header').addClass('revamped');
    setTimeout(() => {
      document.querySelector('.CICO-header.revamped > .logo-container > .partner-img').style.boxShadow = 'none'
    }, 300);

    //$('.partner-img').css('box-shadow', 'none');

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
}
else {
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
