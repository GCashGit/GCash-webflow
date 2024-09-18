const REMITTANCES = {
    'alipay-hk': {
      name: 'AlipayHK',
      instructions: [
        `<ol>`,
          `<li>Log in to the AlipayHK App.</li>`,
          `<li>Tap on "More", then "Remittance".</li>`,
          `<li>Tap "New Remittance" then choose GCash as the remittance destination.</li>`,
          `<li>Enter the amount and the beneficiary's information.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobtel (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Complete the transaction.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Alipay%403x.png'
    },
    azimo: {
      name: 'Azimo',
      instructions: [
        `<ol>`,
          `<li>Log in to the Azimo App or website.</li>`,
          `<li>Choose Philippines, pick a delivery method and enter the recipient's name.</li>`,
          `<li>Choose an amount and pay securely with your debit/credit card or with bank transfer.</li>`,
          `<li>Enter the amount and the beneficiary's information.</li>`,
          `<li>Check all transfer details and confirm payment.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Azimo%403x.png'
    },
    bwallet: {
      name: 'bWallet',
      instructions: [
        `<ol>`,
          `<li>Log in to bWallet.</li>`,
          `<li>Select 'International Money Transfer'.</li>`,
          `<li>Select 'ewallets'.</li>`,
          `<li>Select 'Philippines' as Country.</li>`,
          `<li>Add Beneficiary details.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Enter Remittance amount in BHD to get quote.</li>`,
          `<li>Confirm to complete transaction.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/bwallet%403x.png'
    },
    cross: {
        name: 'Cross Remittance',
        instructions: [
          `<ol>`,
            `<li>Log in to the Cross Remittance App.</li>`,
            `<li>Send money to a new recipient &gt; Choose 'e-wallet' &gt; then choose 'GCash'.</li>`,
            `<li>Complete the receiver's details:
              <ul style="list-style-type: disc;">
                <li>The beneficiary name must match their GCash-registered name.</li>
                <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
              </ul>
            </li>`,
            `<li>Enter your Payment PIN to finish the request.</li>`,
          `</ol>`,
        ],
        logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/CrossRemittance%403x.png'
      }, denarii: {
        name: 'Denarii Cash',
        instructions: [
          `<ol>`,
            `<li>Log in to the Denarii Cash App.</li>`,
            `<li>On the home page, enter the amount you want to send and then click 'Send Money'.</li>`,
            `<li>Choose GCash from the list of transfer methods.</li>`,
            `<li>Add your beneficiary's required details:
              <ul style="list-style-type: disc;">
                <li>The beneficiary's name must match their GCash-registered name.</li>
                <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
              </ul>
            </li>`,
            `<li>Review the details of the transaction and then tap "I agree with Denarii Cash’s Terms and Conditions."</li>`,
            `<li>Proceed to payment.</li>`,
          `</ol>`,
        ]
      },eec: {
        name: 'EEC',
        instructions: [
          `<ol>`,
            `<li>Go to an EEC Service Station.</li>`,
            `<li>Provide the following information for the beneficiary: name, phone number, and birthdate:
              <ul style="list-style-type: disc;">
                <li>The beneficiary's name must match their GCash-registered name.</li>
                <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
              </ul>
            </li>`,
            `<li>Pay for the remittance (the amount to send and the service fee).</li>`,
            `<li>After processing, the beneficiary will receive an SMS message confirming that the remittance has been successfully transferred to their GCash wallet.</li>`,
          `</ol>`,
          `<p class="cico-bank-title">Cash In via EEC Remit App</p>`,
          `<ol>`,
            `<li>Log in to your EEC Remit App.</li>`,
            `<li>Click BANK transactions and choose GCASH from the selection.</li>`,
            `<li>Select the CITY/PROVINCE of the beneficiary.</li>`,
            `<li>Input the desired amount you want to send.</li>`,
            `<li>Fill in the recipient's name, phone number, and birthdate.</li>`,
            `<li>Please type MANILA for the bank branch.</li>`,
            `<li>Input the account number. The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>`,
            `<li>Pay your transaction at any ECC Store or convenience store near you.</li>`,
          `</ol>`,
        ],
        logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/EEC%403x.png'
      }, 'emq-send': {
      name: 'EMQ Send',
      instructions: [
        `<ol>`,
        `<li>Log in to the EMQ Send App.</li>`,
        `<li>Add the recipient's GCash number and the recipient's pay-out option.
          <ul style="list-style-type: disc;">
            <li>The beneficiary name must match their GCash-registered name.</li>
            <li>The account number is the GCash-registered mobtel (in the appropriate 09XXXXXXXXX format).</li>
          </ul>
        </li>`,
        `<li>Input the amount and select where to pay; either at 7-Eleven or Hi-Life.</li>`,
        `<li>Submit the transaction.</li>`,
        `<li>Wait for the QR Code for payment, then proceed to your chosen payment counter.</li>`,
      `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/EMQ%403x.png'
    },
 'far-east-express': {
      name: 'Far East Express',
      instructions: [
        `<ol>`,
          `<li>Go to any Far East Express branch.</li>`,
          `<li>Present your Far East Express Priority Card or fill out the send money form:
            <ul style="list-style-type: disc;">
              <li>The beneficiary's name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay the remittance (the amount to send and the service fee).</li>`,
          `<li>The remittance is processed within a few minutes, and the beneficiary will receive an SMS notification confirming the successful transfer to their GCash wallet.</li>`,
        `</ol>`,
        `<p class="cico-bank-title">Cash In via FEE Mobile App</p>`,
        `<ol>`,
          `<li>Log in to the FEE Mobile App (Far East Express):
            <ul style="list-style-type: disc;">
              <li>Download the FEE MOBILE APP from the App Store or Play Store, or click the following link: <a href="http://onelink.to/f3rmmj">http://onelink.to/f3rmmj</a></li>
            </ul>
          </li>`,
          `<li>Select GCash as the recipient’s pay-out option. Add the recipient's name and GCash number.</li>`,
        `</ol>`,
        `<ul style="list-style-type: disc;">`,
          `<li>The beneficiary's name must match their GCash-registered name.</li>`,
          `<li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>`,
          `<li>Input the amount and select where to pay: 7-Eleven, FamilyMart, or a Far East Express branch.</li>`,
          `<li>Submit the transaction.</li>`,
          `<li>Wait for the QR Code/Barcode for payment, then proceed to your chosen payment counter.</li>`,
        `</ul>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/FarEastExpress%403x.png'
    },'fast-pay-international': {
      name: 'Fastpay International Ltd',
      instructions: [
        `<ol>`,
          `<li>Choose "Send Money".</li>`,
          `<li>Select "E-Wallet", then select "GCash".</li>`,
          `<li>Enter the beneficiary's information:
            <ul style="list-style-type: disc;">
              <li>The beneficiary's name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Select preferred payment method:
            <ul style="list-style-type: disc;">
              <li>Cash payment at 7-ELEVEN, Family Mart, Hi-Life, or OK Mart</li>
              <li>Bank transfer via online banking, mobile banking, or ATM</li>
            </ul>
          </li>`,
          `<li>Enter the amount and confirm the details.</li>`,
          `<li>Wait for the barcode or one-time payment account, then proceed with payment.</li>`,
          `<li>The remittance is processed within a few minutes, and both the sender and beneficiary will receive an SMS notification confirming the successful transfer to the designated GCash account.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/FastPay%403x.png'
    }, 'coinshot': {
      name: 'CoinShot',
      instructions: [
        `<ol>`,
          `<li>Log in to the CoinShot App or Website <a href="https://coinshot.org">(https://coinshot.org)</a>.</li>`,
          `<li>Clink Menu &gt; International Transfer &gt; Send Money</li>`,
          `<li>Click +Add and choose Philippines &gt; Bank &gt; GCash</li>`,
          `<li>Type the GCash Number (09XXXXXXXXX), receiver details, and click Transfer</li>`,
          `<li>Type the amount, indicate the purpose of the transaction, and pay securely through your CoinShot Wallet, bank transfer, or auto-debit.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/CoinShot%403x.png'
    },
    'global-remit': {
      name: 'Global Remit',
      instructions: [
        `<ol>`,
         ` <li>Go to a Global Remit branch.</li>`,
          `<li>Fill out the send money form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay for the remittance (the amount to send and the transfer fee).</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notitication that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/GlobalRemit%403x.png'
    },
    gmoneytrans: {
      name: 'GmoneyTrans',
      instructions: [
        `<ol>`,
          `<li>Log in to the GmoneyTrans App.</li>`,
          `<li>Choose the Receiver.</li>`,
          `<li>Enter the amount to be sent and provide Source of Funds and Purpose of Transaction.</li>`,
          `<li>Pay for the Remittance.</li>`,
          `<li>Enter Payment PIN to complete the transaction.</li>`,
          `<li>Receive a reply receipt with your Transaction Control number.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/GMoneyTrans%403x.png'
    },'instant-cash': {
      name: 'Instant Cash',
      instructions: [
        `<ol>`,
          `<li>Go to an Instant Cash branch.</li>`,
          `<li>Fill out the send money form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobtel (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay for the remittance (the amount to send and the transfer fee).</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/InstantCash%403x.png'
    },
    jrf: {
        name: 'JRF',
        instructions: [
          `<ol>`,
            `<li>Senders need to log in to the JRF Wallet Mobile App or visit <a href="http://jpremit.com">http://jpremit.com</a></li>`,
            `<li>Tap on Add beneficiary details
              <ul style="list-style-type: circle">
                <li>
                  Enter the receiver's personal and contact information.
                  <ul style="list-style-type: square">
                    <li>The receiver's name MUST match their GCash registered name.</li>
                  </ul>
                </li>
                <li>
                  For the Payout Info:
                  <ul style="list-style-type: square">
                    <li>Choose “eWallet” for the Payout Type.</li>
                    <li>Select “GCash” for the Bank Name.</li>
                    <li>
                      Select the country for the Origin of Wallet.
                      <ul style="list-style-type: disc">
                        <li>
                          If sending to a Philippine mobile number, select “Philippines”.
                        </li>
                        <li>
                          If topping up a Japan GCash wallet, select “Japan”.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Under Wallet ID, enter the GCash mobile number:
                      <ul style="list-style-type: disc">
                        <li>For a Philippine mobile number: 09XXXXXXXXX</li>
                        <li>For a Japan mobile number, it must start with an 8, followed by 9-digits: 8XXXXXXXXX</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>Click save and you're ready to send a transaction from JRF to GCash.</li>
              </ul>
            </li>`,
            `<li>Click Send Internationally</li>`,
            `<li>Choose Beneficiary from the list</li>`,
            `<li>Enter the send/receive amount</li>`,
            `<li>Review all transfer details and click confirm.</li>`,
          `</ol>`,
          `<p class="cico-bank-title">Cash In via JRF Branch</p>`,
          `<ol>`,
            `<li>Go to any Japan Remit branch or deposit via a JRF Remittance Card</li>`,
            `<li>
              Fill out the Beneficiary Registration Form:
              <ol type="a">
                <li>
                  If sending a remittance to your loved one in the Philippines:
                  <ol type="i">
                    <li>
                      In the “Name” field, ensure it matches their name registered in GCash.
                    </li>
                    <li>
                      In the “Account Number” field, enter their GCash mobile number (e.g., 09XXXXXXXXX).
                    </li>
                  </ol>
                </li>
                <li>
                  If cashing in your Japan GCash wallet:
                  <ol type="i">
                    <li>
                      In the “Name” field, ensure it matches the name you registered with GCash.
                    </li>
                    <li>
                      In the “Relation” field, indicate “Self”.
                    </li>
                    <li>
                      In the “Account Number” field, enter your Japan GCash mobile number (must start with an 8, followed by 9-digits: 8XXXXXXXXX).
                    </li>
                  </ol>
                </li>
              </ol>
            </li>`,
            `<li>Submit the Beneficiary Registration Form at the counter and provide the amount for the deposit.</li>`,
            `<li>Present one (1) valid ID to the teller.</li>`,
          `</ol>`,
          `For succeeding visits, you won’t need to fill out the Beneficiary Registration form.`,
          `<p class="cico-bank-title">Cash In via JRF Korea Mobile App</p>`,
          `<ol>`,
            `<li>Log in to the JRF Korea Mobile App.</li>`,
            `<li>Tap on Add beneficiary details:
              <ul style="list-style-type: circle">
                <li>Enter the Receiver's information.</li>
                <li>Choose Payout Type "eWallet".</li>
                <li>Choose GCash as eWallet Payout Type and enter the recipient mobile number.</li>
              </ul>
            </li>`,
            `<li>Click Send Internationally</li>`,
            `<li>Choose Beneficiary from the list</li>`,
            `<li>Enter the send/receive amount</li>`,
            `<li>Review all transfer details and click confirm.</li>`,
          `</ol>`,
          `Receiver's name MUST match their GCash registered name. GCash registered Mobile Number must be entered in the appropriate (0)9xxxxxxxxx format.`,
        ],
        logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/JRF%403x.png'
      }, 'kabayan-remittance': {
      name: 'Kabayan Remittance',
      instructions: [
        `<ol>`,
          `<li>Go to a Kabayan Remittance Branch</li>`,
          `<li>Fill out the send money form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay for the remittance (the amount to send and the transfer fee).</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Kabayan%403x.png'
    },
    'lbc-usa': {
      name: 'LBC USA',
      instructions: [
        `<ol>`,
          `<li>Go to a LBC Branch</li>`,
          `<li>Fill out the send money form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay for the remittance (the amount to send and the transfer fee).</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo:'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/LBC%403x.png'
    },
    lmi: {
      name: 'LMI Pacific',
      instructions: [
  
        `<ol>`,
          `<li>Go to any Lucky Money Branch</li>`,
          `<li>Fill out the remittance application form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobtel (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay the remittance and the service fee.</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
        `<p class="cico-bank-title">Cash In via Lucky Money Online</p>`,
        `<ol>`,
          `<li>Sender need to log-on to account via www.luckymoney.com</li>`,
          `<li>Choose GCash in the list of service and enter the amount to be sent.</li>`,
          `<li>Complete the required information
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobtel (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Enter Payment Details using Debit Card, Bank Account or Credit Card.</li>`,
          `<li>Confirm the information and complete the transaction.</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/LuckyMoney%403x.png'
    },
    'lulu-international': {
      name: 'Lulu International Exchange',
      instructions: [
        `<ol>`,
          `<li>Go to a Lulu Exchange Branch</li>`,
          `<li>Fill out the remittance application form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobtel (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay the remittance and the service fee.</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Lulu%403x.png'
    },
    'pacific-ace': {
      name: 'Pacific Ace',
      instructions: [
        `<ol>`,
          `<li>Go to a Pacific Ace Branch</li>`,
          `<li>Fill out the send money form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobtel (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay for the remittance (the amount to send and the transfer fee).</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/PacificAce%403x.png'
    },
    'panda-remit': {
      name: 'Panda Remit',
      instructions: [
        `<ol>`,
          `<li>Download the Panda Remit App and register with email or mobile number.</li>`,
          `<li>Create a customer KYC profile by filling out the customer information form and uploading a valid ID photo (Passport, ID, Driver's license, etc.) for CDD.</li>`,
          `<li>Add a recipient with basic information and their GCash account.</li>`,
          `<li>Create a new transaction to send PHP to your designated recipient's GCash account.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/PandaRemit%403x.png'
    },payit: {
        name: 'PayIt',
        instructions: [
          `<ol>`,
            `<li>Log in to the PayIt App.</li>`,
            `<li>Click on “Transfer”.</li>`,
            `<li>Choose your country: Philippines.</li>`,
            `<li>Select "Transfer to GCash".</li>`,
            `<li>Enter the amount.</li>`,
            `<li>Add or select the beneficiary:
              <ul style="list-style-type: disc;">
                <li>The beneficiary name must match their GCash-registered name.</li>
                <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
              </ul>
            </li>`,
            `<li>Click on transfer.</li>`,
          `</ol>`,
        ],
        logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/PayIt%403x.png'
      },remitly: {
        name: 'Remitly',
        instructions: [
          `<ol>`,
            `<li>Log in to the Remitly app or website <a href="https://remitly.com">https://remitly.com</a></li>`,
            `<li>Tap “Send Money”</li>`,
            `<li>Select a New Recipient</li>`,
            `<li>Select Mobile Money and enter the amount</li>`,
            `<li>Tap GCash</li>`,
            `<li>Enter the name you registered in GCash</li>`,
            `<li>Fill in your GCash mobile number
              <ul style="list-style-type: disc;">
                <li>Country Code: XX</li>
                <li>Mobile Number: XXXXXXXXXX</li>
              </ul>
            </li>`,
            `<li>Fill in your details</li>`,
            `<li>Enter Payment Details using Debit Card, Bank Account, or Credit Card.</li>`,
            `<li>Confirm the information and complete the transaction</li>`,
          `</ol>`,
        ],
        logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Remitly%403x.png'
    },rocketremit: {
      name: 'Rocket Remit',
      instructions: [
        `<ol>`,
          `<li>Go to the Rocket Remit website and log in to the Rocket Remit Dashboard.</li>`,
          `<li>Enter the details of the receiver of your money transfer and the AUD amount to be sent.</li>`,
          `<li>Receive payment confirmation SMS containing your one time code.</li>`,
          `<li>Reply with the confirmation code to authorize the payment to the receiver's mobile wallet.</li>`,
          `<li>Receive a reply receipt with your transaction reference number.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/RocketRemit%403x.png'
    },
    sabb: {
      name: 'SABB',
      instructions: [
        `<ol>`,
          `<li>Login to SABBnet or SABBmobile.</li>`,
          `<li>Choose 'Money Transfer'.</li>`,
          `<li>Select 'Add Beneficiary' and add GCash as the beneficiary.</li>`,
          `<li>Enter your Beneficiary's name and GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>`,
          `<li>Enter the amount you want to send.</li>`,
          `<li>Confirm the details and send.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/SABB%403x.png'
    },
    'sbi-remit': {
      name: 'SBI Remit',
      instructions: [
        `<small><strong>FOR ONLINE MEMBERS</strong></small>`,
        `<ol>`,
          `<li>Login to SBI Remit website.</li>`,
          `<li>Select registered GCash Receiver.</li>`,
          `<li>Enter amount to send from your pocket account.</li>`,
          `<li>Click 'Remit' to complete transaction.</li>`,
        `</ol>`,
        `<small><strong>FOR NON-ONLINE MEMBERS (RAKU-RAKU MEMBERS)</strong></small>`,
        `<ol>`,
          `<li>Insert SBI Card in Japan Post Bank ATM machine.</li>`,
          `<li>Deposit Cash to complete the transaction.</li>`,
        `</ol>`,
      ],
      logo:'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/SBI%403x.png'
    },
    'sender-money-transfer': {
      name: 'Send Money Transfer',
      instructions: [
        `<ol>`,
          `<li>Go to a Sender Money Transfer Branch</li>`,
          `<li>Fill out the send money form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay for the remittance (the amount to send and the transfer fee).</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo:'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Sender%403xpng.png'
    },sendwave: {
        name: 'Sendwave',
        instructions: [
          `<ol>`,
            `<li>Log in to the Sendwave App.</li>`,
            `<li>Enter the recipient’s full name.</li>`,
            `<li>Enter their mobile number.</li>`,
            `<li>Enter the amount you want to send and then press send.</li>`,
          `</ol>`,
        ],
        logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Sendwave%403x.png'
      },'siammali-remittance': {
      name: 'Siammali Remittance',
      instructions: [
        `<ol>`,
          `<li>Go to a Siammali Remittance branch.</li>`,
          `<li>Fill out the send money form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay for the remittance (the amount to send and the transfer fee).</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notitication that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/SiamMali%403x.png'
    },'singtel-dash': {
      name: 'Singtel Dash',
      instructions: [
        `<small><strong>LAUNCH THE SINGTEL DASH APP AND DO THE FOLLOWING STEPS TO ADD BENEFICIARY: </strong></small>`,
        `<ol>`,
          `<li>Tap on 'Send Money' > 'Remit Overseas' > 'Add Beneficiary'.</li>`,
          `<li>Select GCash Wallet as the recipient's pay-out option.</li>`,
          `<li>Add the recipient's GCash number and select 'Register' to proceed.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>OTP will be sent to the sender via SMS.</li>`,
          `<li>Enter OTP and once successful, the screen will show that a beneficiary has been added.</li>`,
        `</ol>`,
        `<small><strong>AFTER BENEFICIARY HAS BEEN ADDED, DO THE FOLLOWING STEPS TO SEND MONEY TO BENEFICIARY: </strong></small>`,
        `<ol>`,
          `<li>Tap on 'Send Money' > 'Remit Overseas' > select beneficiary.</li>`,
          `<li>Enter amount and select GCash.</li>`,
          `<li>Check to ensure the amount and details.</li>`,
          `<li>Enter 6 Digit PIN to proceed.</li>`,
          `<li>Submit the transaction by selecting “Okay”.</li>`,
          `<li>Transaction receipt will be displayed and a successful SMS from GCash will be sent to the beneficiary.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/SingtelDash%403x.png'
    },'skrill': {
      name: 'Skrill',
      instructions: [
        `<ol>`,
          `<li>Log in to the Skrill mobile app or website and go to 'Send'.</li>`,
          `<li>Choose the 'Money Transfer' option to send to a mobile.</li>`,
          `<li>Select 'Philippines' as the country and 'PHP' as the currency.</li>`,
          `<li>Enter the amount you want to send.</li>`,
          `<li>Select a payment method.</li>`,
          `<li>Enter your recipient’s name and GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>`,
          `<li>Confirm the amount and send.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Skrill%403x.png'
    },'telcoin': {
      name: 'Telcoin',
      instructions: [
        `<ol>`,
          `<li>Log in to the Telcoin App and verify your identity with a government-issued photo ID.</li>`,
          `<li>Tap the home screen to send money.</li>`,
          `<li>Enter the beneficiary’s information.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Enter or select an amount in CAD and tap “Send Money.” Fill in the required additional details and tap “Next.”</li>`,
          `<li>Review the transfer details before the sixty-second exchange rate quote expires. Enter your Telcoin App pin then tap “Confirm & Send.”</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Telcoin%403x.png'
    },tikfx: {
      name: 'TikFX',
      instructions: [
        `<ol>`,
          `<li>Login to your Tik FX account via APP or website.</li>`,
          `<li>Add new recipients, choosing e-wallet as the pickup method in the Philippines.</li>`,
          `<li>Select GCash from the e-wallet list.</li>`,
          `<li>Go to the send page and set the send/receive amount.</li>`,
          `<li>Check all transfer details and click confirm.</li>`,
          `<li>Pay securely with any of the following payment methods:
            <ul style="list-style-type: disc;">
              <li>Debit card</li>
              <li>Online debit card</li>
              <li>Online banking</li>
            </ul>
          </li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/TikFX%403x.png'
    },
    tng: {
      name: 'TNG',
      instructions: [
        `<ol>`,
          `<li>Login to TNG App</li>`,
          `<li>Select "Global Remittance"</li>`,
          `<li>Select "Other Friends"</li>`,
          `<li>Change the currency to PHP, and input the transfer amount</li>`,
          `<li>Select "Transfer to Overseas Bank"</li>`,
          `<li>Tap "Bank Name" and select "GCash"</li>`,
          `<li>Input the receiver information, including account number, name, mobile number, and also other required information</li>`,
          `<li>Confirm all information is correct, the tap the green tick button</li>`,
          `<li>Input your 6-digit transaction PIN for submission</li>`,
          `<li>Submit the Transaction</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/TNG%403x.png'
    },
    'transfer-galaxy': {
      name: 'Transfer Galaxy',
      instructions: [
        `<ol>`,
          `<li>Log in to the Transfer Galaxy App or website https://transfergalaxy.com/.</li>`,
          `<li>Enter the recipient Information.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Choose Mobile wallet - GCash.</li>`,
          `<li>Enter the amount.</li>`,
          `<li>Review transfer details and send.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/TransferGalaxy%403x.png'
    },
    wallstreet: {
      name: 'Wall Street Exchange',
      instructions: [
        `<ol>`,
          `<li>Go to a Wall Street Exchange branch.</li>`,
          `<li>Fill out the send money form.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobtel (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Pay for the remittance (the amount to send and the transfer fee).</li>`,
          `<li>The remittance is processed within a few minutes and the beneficiary will receive an SMS notification that a remittance was successfully sent to their GCash wallet.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/WallStreet%403x.png'
    },
    'warba-bank': {
      name: 'Warba Bank',
      instructions: [
        `<ol>`,
          `<li>Log into Warba App.</li>`,
          `<li>Click on Services and choose 'Transfer Money'.</li>`,
          `<li>Add Beneficiary details.
            <ul style="list-style-type: disc;">
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Select payment method - Mobile Wallet - GCash.</li>`,
          `<li>Enter the 6-digit OTP.</li>`,
          `<li>Complete the transaction.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/WarbaBank%403x.png'
    },'wirebarley': {
      name: 'WireBarley',
      instructions: [
        `<ol>`,
          `<li>Log in to the WireBarley App and click the 'Send Money' button, then select GCash as the delivery option.</li>`,
          `<li>Complete the recipient details. Please be reminded of the following information:
            <ul style="list-style-type: disc;">
              <li>Check GCash transaction limits depending on the level of verification. Read more here: <a href="https://help.gcash.com/hc/en-us/articles/900000946286">GCash Help Center</a></li>
              <li>The beneficiary name must match their GCash-registered name.</li>
              <li>The account number is the GCash-registered mobile number (in the appropriate 09XXXXXXXXX format).</li>
            </ul>
          </li>`,
          `<li>Enter your payment PIN to finish the request.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Wirebarley%403x.png'
  },wise: {
      name: 'Wise',
      instructions: [
        `<ol>`,
          `<li>Login to Wise App</li>`,
          `<li>Set up your Transaction and Enter Amount to be sent</li>`,
          `<li>Add a new recipient and select GCash wallet
        (For transfers to mobile wallets, you'll need their mobile phone number, starting with the country code +63.)</li>`,
          `<li>Review details of your transfer</li>`,
          `<li>Choose your transfer type (Payment Options)
            <ul style="list-style-type: disc;">
              <li>Your balance</li>
              <li>Debit Card</li>
              <li>Bank Transfer</li>
            </ul>
          </li>`,
          `<li>Confirm the details</li>`,
        `</ol>`,
      ],
      logo:'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Wise%403x.png'
    },'xoom': {
      name: 'Xoom',
      instructions: [
        `<ol>`,
          `<li>Senders need to log into their account via Xoom’s app or via Xoom.com.</li>`,
          `<li>Enter the amount to be sent.</li>`,
          `<li>Choose Receiving Option 'Mobile Wallet'</li>`,
          `<li>Choose GCash as Mobile Wallet Provider and enter the recipient’s mobile number.</li>`,
          `<li>Enter the Receiver’s information.</li>`,
        `</ol>`,
        `<p>Receiver's name MUST match their GCash registered name.</p>`,
        `<p>GCash registered mobile number must be entered in the appropriate (0)9XXXXXXXXX format.</p>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Xoom%403x.png'
    }, 'ott-remit': {
      name: 'OTT Remit',
      instructions: [
        `<ol>`,
          `<li>Senders need to log on to their account via the OTT Remit App or <a href="https://www.ottremit.com">www.ottremit.com</a>.</li>`,
          `<li>Enter the amount to be sent; choose delivery time and delivery method — E-Wallet-GCash</li>`,
          `<li>Enter the recipient's information, address, and e-wallet information.
              <ul style="list-style-type: disc;">
                <li>The beneficiary's name must match their GCash-registered name.</li>
                <li>The beneficiary's mobile number is their GCash-registered mobile number (in the appropriate 09XXXXXXXX format or 1647XXXXXXX or 1416XXXXXXX).</li>
              </ul>
          </li>`,
          `<li>Confirm the information and complete the transaction via Interac email transfer.</li>`,
        `</ol>`,
      ],
      logo: 'https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/OTT_Remit%403x.png',
      isRevamped: true,
    },'tap-tap-send': {
      name: 'TapTapSend',
      logo: 'https://uat.m.gcash.com/gcash-common-web/static/funds/cashin_icons/TapTapSend%403x.png',
      instructions: [
        `<ol>`,
          `<li>Open the app. You will instantly see the exchange rate.</li>`,
          `<li>Enter the amount you wish to transfer, and the app will show you the total converted amount from your sending country’s currency to Philippine peso.</li>`,
          `<li>If it’s your first time sending, add the promo code ‘GCash’ to get a bonus as specified below:
            <ul style="list-style-type: disc; padding-left: 1.25rem;">  
              <li>UAE — AED 50</li>
              <li>UK and Canada — $20</li>
              <li>UK — £15</li>
              <li>Europe — €15</li>
            </ul>
          </li>`,
          `<li>Click ‘Next.’</li>`,
          `<li>
            <div class="text-pre">Choose the recipient by either adding a new recipient or selecting a previously saved recipient from your list.
  
          When you click ‘Add new recipient,’ choose GCash as the payout method.
            </div>
          </li>`,
          `<li>Enter the recipient’s name. Ensure it is their legal name as registered with their mobile service/GCash account.</li>`,
          `<li>Click ‘Next.’</li>`,
          `<li>To confirm the transfer, choose your payment method. Double-check the amount and recipient details.</li>`,
          `<li>Then, click ‘Pay with Card.’</li>`,
          `<li>Authorize your payment accordingly.</li>`,
          `<li>You will be directed to a confirmation screen showing that the transfer is processing. It will also display your transfer ID.</li>`,
          `<li>You will receive a notification once the transfer is successful.</li><li>To check the transfer status, go to the ‘Transfer History’ on the app.</li>`,
        `</ol>`,
      ],
      isRevamped: true,
    }
  }
