$(document).ready(function () {
    var cashInPartner = getParameterByName('partner');
    const revampPartners = ['bsp', 'bsp-old', 'uniteller']
    if (multiple.hasOwnProperty(cashInPartner)) {
        var instructions = multiple[cashInPartner].instructions;
        var partnerHeader = multiple[cashInPartner].name;
        var partnerSubHeader = multiple[cashInPartner].subHeader;
        var partnerLogo = multiple[cashInPartner].logo;
        var partnerType = multiple[cashInPartner].partner || ''
        var isRevamp = revampPartners.includes(cashInPartner)
        
        document.title = 'How to Cash In'

        if (instructions) {
            // Will display the instructions on the HTML Ids
            var headerText = 'How to Cash In';
            var headerSubText = 'At any branch of these official partners';
            $('#instructions').addClass('CI-Multiple' + partnerType);
            if (!isRevamp) {
                $('#cash-in-header').html(headerText);
                $('#cash-in-subheader').html(headerSubText);
            }

            // Loop through the instructions and create accordions
            for (var key in instructions) {
                if (instructions.hasOwnProperty(key)) {
                    var accordionTitle = key.split('-')  // Split the title into an array of words
                        .map(function (word) {
                            return word;
                        })
                        .join(' ');  // Join the words back together with spaces
                    var accordionClass = isRevamp ? 'accordion-revamp ' + key : key ; 
                    var accordionContent = instructions[key].content.join('');
                    console.log(accordionContent)

                     // Get the image URL for the current accordion title
                     var imageUrl = instructions[key].imageUrl; // Make sure this property exists in your instructions object

                    var accordionImg = !isRevamp ? '<img src="' + imageUrl + '" class="accordion-image">'  : '';
                   
                    // Create accordion structure
                    var accordion = '<button class="accordion ' + accordionClass + '"><div class="accordion-inner-div">' + accordionImg + accordionTitle + '</div></button>' +
                        '<div class="panel ' + accordionClass + '">' + accordionContent + '</div>';
                    
                    if (isRevamp) {
                        $('#instructions-container').addClass('instructions-container-revamp')
                    }
                    // Append the accordion to #instructions
                    $('#instructions-container').append(accordion);
                }
            }

            // Accordion code from Promo Template
            var acc = document.getElementsByClassName("accordion");
            var i;

            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                    this.classList.toggle("active");
                    var panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
            }
        }

        if (partnerLogo) {
            $('.CICO-header').addClass('CICO-header-border');
            $('<img class="partner-img">')
                .attr('src', partnerLogo)
                .addClass('conditional-image')
                .appendTo('.logo-container');
            $('<div class="partner-title-container"></div>')
                .appendTo('.logo-container');
            $('<p class="partner-name">' + partnerHeader + '</p>')
                .appendTo('.partner-title-container');
            
            if (partnerSubHeader) {
                $('<p class="partner-sub-header">' + partnerSubHeader + '</p>')
                    .appendTo('.partner-title-container');
            }
        }

        var barcodeBtn = document.querySelector('.generate-btn')
        if (barcodeBtn) {
            barcodeBtn.addEventListener('click', generateBarcode)
        }
    } else {
        console.log('Invalid or missing partner:', cashInPartner);
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function generateBarcode(e) {
    console.log('generate barcode')
    e.preventDefault();
    if (window.AlipayJSBridge) {
        window.AlipayJSBridge.call('startApp',{"appId":"006300070012"})
        // AlipayJSBridge.call('startApp' {"appId": "006300000100", "redirectUri": 'gcash://com.mynt.gcash/app/006300070012'})
        return;
    }
    window.location = 'https://gcash.cashin.viacode/gcash.splashscreen/?redirect=gcash://com.mynt.gcash/app/006300070012'
}
