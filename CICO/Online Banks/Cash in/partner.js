
const BANKS = {
    "bank-of-china": {
        "name": "Bank of China",
        "instructions": [
            "Cash In via Mobile Application",
            "<ol type='1'>",
            "<li>Log in to Bank of China mobile banking app and select the Instapay Logo or 'InstaPay Fund Transfer'.</li>",
            "<li>Select Payers Account then select 'Account Number' under Payee Type.</li>",
            "<li>Input the required details and amount to be transferred. *Your GCash-registered mobile number (09XXXXXXXXX) serves as your account number.</li>",
            "<li>Select 'G-Xchange Inc.' as Beneficiary Bank.</li>",
            "<li>Review and agree with the Terms and Conditions. Click 'Submit', then input the password generated from your E-Token.</li>",
            "</ol>",
            "<br>An acknowledgement page will be displayed. The recipient will receive an SMS from GCash as confirmation of a successful transaction.<br>",
            "Cash In via Online Banking",
            "<ol type='1'>",
            "<li>Log in to your Bank of China Online Banking account and select the InstaPay logo or 'InstaPay Fund Transfer'.</li>",
            "<li>Select Payers Account, then 'Bank Account' as Beneficiary Account Type.</li>",
            "<li>Input the required details and amount to be transferred. *Your GCash-registered mobile number (09XXXXXXXXX) serves as your account number.</li>",
            "<li>Review and agree on the Terms and Conditions. Click 'Submit'.</li>",
            "<li>Verify inputted details and password generated from your E-Token. Click 'Confirm'.</li>",
            "</ol>",
            "<br>Bank of China will charge PHP 20.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/BankOfChina%403x.png"
    },
    "aub": {
        "name": "AUB",
        "instructions": [
            "<ol type='1'>",
            "<li>Log in to the AUB Website or Mobile App.</li>",
            "<li>Click 'InstaPay Fund Transfer'.</li>",
            "<li>Select the AUB Account to transfer funds from.</li>",
            "<li>Select 'GCash', input your GCash-registered mobile number (09XXXXXXXXX) as your Account Number and enter amount.</li>",
            "<li>Review transaction summary then click 'Confirm' to confirm.</li>",
            "</ol>",
            "<br>*AUB is offering FREE InstaPay transfers until March 31,2021</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/AUB%403x.png"
    },
    "china-bank": {
        "name": "China Bank",
        "instructions": [
            "Add GCash as eWallet",
            "<ol type='1'>",
            "<li>Log in to your China Bank Mobile app and go to 'Reload or Purchase'.</li>",
            "<li>Select 'e-Wallet,' tap 'Add e-Wallet,' and choose 'GCASH.' Input your details. *Your GCash-registered mobile number (09XXXXXXXXX) serves as your account number.</li>",
            "<li>Enter the OTP (One-time password) to confirm.</li>",
            "</ol>",
            "Cash In with China Bank Mobile",
            "<ol type='1'>",
            "<li>Tap 'Reload or Purchase' and select 'e-Wallet.'</li>",
            "<li>Choose GCASH and input the details.</li>",
            "<li>Enter the OTP (One-time password) to confirm.</li>",
            "</ol>",
            "<br>China Bank will charge PhP10.00 per successful transaction. An acknowledgment page will be displayed. The recipient will receive an SMS from GCash as confirmation of a successful transaction.</br>"
        ],
        "logo": "https://uat.m.gcash.com/gcash-common-web/static/cashin_icons/revamp/Chinabank%403x.png"
    },
    "maybank": {
        "name": "MayBank",
        "instructions": [
            "<ol type='1'>",
            "<li>Log in to the Maybank Website or Mobile App.</li>",
            "<li>Click 'Transfer' and enter Transaction Password.</li>",
            "<li>Select 'Transfer to Other Accounts'.</li>",
            "<li>Select Maybank Account to transfer funds from.</li>",
            "<li>Review transaction summary then click 'Confirm' to confirm.</li>",
            "<li>Select 'Savings' for Account Type, input your GCash-registered mobile number (09XXXXXXXXX) as your Account Number and enter amount.</li>",
            "<li>Review transaction summary then click 'Submit' to confirm.</li>",
            "<li>Enter Transaction Authorization Code received via SMS then click 'Submit'.</li>",
            "</ol>",
            "<br>*Maybank will charge PHP 10.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Maybank%403x.png"
    },
    "metrobank": {
        "name": "Metrobank",
        "instructions": [
            "<ol type='1'>",
            "<li>Log in to the Metrobank App.</li>",
            "<li>Under Profile icon on top left corner, click 'Transfer to Other Bank' then select 'InstaPay'.</li>",
            "<li>Click 'Transfer', select 'GCash' then input your GCash-registered mobile number (09XXXXXXXXX) as your Account Number, Account Name, Address and Email Address.</li>",
            "<li>Select Metrobank Account to transfer funds from.</li>",
            "<li>Enter Amount then click 'Next'.</li>",
            "<li>Review transaction summary then click 'Submit' to confirm.</li>",
            "</ol>",
            "<br>*Metrobank will charge PHP 25.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Metrobank%403x.png"
    },
    "psbank": {
        "name": "PSBank",
        "instructions": [
            "Cash In via PSBank Mobile App",
            "<ol type='1'>",
            "<li>Log in to the PSBank Mobile App.</li>",
            "<li>Select Fund Transfer from the side menu.</li>",
            "<li>Choose a source account.</li>",
            "<li>Select GCash from the list of banks.</li>",
            "<li>Input your GCash-registered mobile number (09XXXXXXXXX), then tap Proceed.</li>",
            "<li>Fill in the required details, then tap Proceed.</li>",
            "<li>Enter the amount, then select Immediate, then tap Proceed.</li>",
            "</ol>",
            "Cash In via PSBank Online",
            "<ol type='1'>",
            "<li>Log in to http://www.psbank.com.ph.</li>",
            "<li>Go to Fund Transfer module.</li>",
            "<li>Choose a source account.</li>",
            "<li>Select GCash from the list of banks.</li>",
            "<li>Input your GCash-registered mobile number (09XXXXXXXXX), fill in the required fields then tap Proceed.</li>",
            "<li>Enter the amount.</li>",
            "<li>Select Immediate for Instapay.</li>",
            "<li>Review transaction details and click Submit.</li>",
            "</ol>",
            "<br>*PSBank will charge PHP 15.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/PSBank%403x.png"
    },
    "pbcom": {
        "name": "PBCOM",
        "instructions": [
            "Registering to PBCOM Online",
            "<ol type='1'>",
            "<li>Log in to PBCom Online Platform.</li>",
            "<li>From the dashboard, select 'Manage Accounts', and then choose 'Register 3rd Party-Other Banks'.</li>",
            "<li>Enter the required details with GCash as the Bank Name and input your GCash-registered mobile number (09XXXXXXXXX) as your Account Number.</li>",
            "<li>Enter the One-Time Pin (OTP) sent to you.</li>",
            "<li>Review linking confirmation sent to your email.</li>",
            "</ol>",
            "Cash In via PBCOM Personal",
            "<ol type='1'>",
            "<li>Log in to https://mypbcom.com.ph/.</li>",
            "<li>Enter the 6-digit One-Time Pin (OTP) sent to your registered mobile number.</li>",
            "<li>On the dashboard, click 'Transfer' then 'Send Money to Account'.</li>",
            "<li>Go to 'Other Banks' and enter the required information with GCash as the Bank Name.</li>",
            "<li>Enter the One-Time Pin sent to your phone.</li>",
            "<li>Wait for the confirmation message to appear on your screen.</li>",
            "</ol>",
            "<br>*PBCom will charge PHP 20.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/PBCOM%403x.png"
    },
    "landbank": {
        "name": "LandBank",
        "instructions": [
            "Cash In via LandBank iAccess",
            "<ol type='1'>",
            "<li>Log in by entering your User ID and Password.</li>",
            "<li>Tap 'Fund Transfer' and choose the source account.</li>",
            "<li>Select 'Transfer to Other Banks' via Instapay.</li>",
            "<li>Select GCash as the Destination Bank.</li>",
            "<li>Input the required details and amount to be transferred. Your GCash-registered mobile number (09XXXXXXXXX) also serves as your account number.</li>",
            "<li>Select where the One-Time PIN (OTP) will be sent, either through your registered mobile number or e-mail address.</li>",
            "<li>Review the details in the Confirmation Page. Once confirmed, enter the OTP sent to your registered mobile number or e-mail address.</li>",
            "<li>Tap 'Confirm' then OK.</li>",
            "<li>A transaction acknowledgment page with the status of the transaction will be displayed.</li>",
            "</ol>",
            "Cash In via LandBank Mobile Banking App",
            "<ol type='1'>",
            "<li>Log in by entering your UserID and Password or biometrics.</li>",
            "<li>Tap 'Transfers' >> 'Transfer to Other Bank'.</li>",
            "<li>Input the One-Time PIN (OTP) sent to your mobile number or e-mail address. If enrolled in OTP Generator, click OK and submit the OTP generated by your registered device.</li>",
            "<li>Select the Destination bank and choose Instapay as Transfer Method.</li>",
            "<li>Select the Source Account where the funds will be debited.</li>",
            "<li>Input Recipient Details. The GCash-registered mobile number (09XXXXXXXXX) also serves as your account number.</li>",
            "<li>Tap 'Submit'.</li>",
            "<li>Review the details in the Confirmation Page then click Confirm.</li>",
            "<li>A transaction acknowledgment page with the status of the transaction will be displayed.</li>",
            "</ol>",
            "<br>*Landbank is offering FREE InstaPay transfers until September 30, 2021.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/Landbank%403x.png"
    },
    "bdo": {
        "name": "BDO",
        "instructions": [
            "<ol type='1'>",
            "<li>Log in through BDO Personal Banking or Mobile Banking.</li>",
            "<li>Select Send Money >> To Another Local Bank >> GCash</li>",
            "<li>Fill in the details. Input your GCash-registered mobile number (09XXXXXXXXX) as your Account Number.</li>",
            "<li>Enter the One Time PIN sent to your phone or generated by your BDO Mobile App's OTP Generator.</li>",
            "<li>Confirm details.</li>",
            "</ol>",
            "<br>*BDO will charge PHP 25.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/BDO%403x.png"
    },
    "eastwest": {
        "name": "EastWest Bank",
        "instructions": [
            "<ol type='1'>",
            "<li>Log-in to your EastWest Mobile app.</li>",
            "<li>Click the menu icon on the upper right and select 'Send Money.'</li>",
            "<li>Select 'New Payee,' choose 'GCash' under Bank.</li>",
            "<li>Select Beneficiary type (Registered Payee or One Time Payment) & Payment option (Local Bank)</li>",
            "<li>Enter your GCash-registered mobile number (in 09XXXXXXXXX format) as your account number, select 'GCash' as the beneficiary bank, and fill in the other necessary details.</li>",
            "<li>Select 'InstaPay' as the mode of transfer.</li>",
            "<li>Review your transaction then tap 'Confirm.' (You may be requested to answer a security question for one-time payments)</li>",
            "</ol>",
            "<br>*EastWest Bank is offering FREE InstaPay transfers until July 31, 2021.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/EastWest%403x.png"
    },
    "ucpb": {
        "name": "UCPB",
        "instructions": [
            "<ol type='1'>",
            "<li>Log in to UCPB Connect.</li>",
            "<li>Generate a transaction password.</li>",
            "<li>Click on Inter-bank Fund Transfer via InstaPay.</li>",
            "<li>Fill up the form and wait for confirmation. Enter your GCash-registered mobile number (in 09XXXXXXXXX format) as your account number and select 'G-Xchange, Inc.' as the beneficiary bank.</li>",
            "</ol>",
            "Cash In via UCPB Mobile Phone Banking App",
            "<ol type='1'>",
            "<li>Log in using your UCPB Connect Username and Password.</li>",
            "<li>Click on Transfer Funds and then select Transfer to other Bank.</li>",
            "<li>Choose InstaPay.</li>",
            "<li>Fill up the form and wait for confirmation. Enter your GCash-registered mobile number (in 09XXXXXXXXX format) as your account number and select 'G-Xchange, Inc.' as the beneficiary bank.</li>",
            "</ol>",
            "<br>*UCPB is offering FREE Instapay transfers until September 30, 2021.</br>"
        ],
        "logo": "https://www.gcash.com/wp-content/uploads/2020/07/ucpb.png"
    },
    "security-bank": {
        "name": "Security Bank",
        "instructions": [
            "<ol type='1'>",
            "<li>Log in to your Security Bank Mobile App (make sure that your app is updated).</li>",
            "<li>Tap 'Transfer' then select 'Other banks' and select your source account.</li>",
            "<li>Choose 'GCash' as the target bank.</li>",
            "<li>Fill in the details. (Note: Enter your GCash-registered mobile number 09XXXXXXXXX as the Account Number).</li>",
            "<li>Tap the toggle to agree to the terms and conditions then click 'Submit.'</li>",
            "<li>An SMS code (OTP) will be sent to your mobile number to confirm the transfer.</li>",
            "<li>Review your transaction then tap 'Confirm.'</li>",
            "</ol>",
            "<br>*Security Bank will charge PHP 25.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/SecurityBank%403x.png"
    },
    "bank-commerce": {
        "name": "Bank of Commerce",
        "instructions": [
            "Cash-In via BankCom Mobile App:",
            "<ol type='1'>",
            "<li>Log in through BankCom [Personal] on your desktop or registered mobile device.</li>",
            "<li>Go to Fund Transfer >> Other Bank >> and select 'Transfer Type >> InstaPay.'</li>",
            "<li>Choose G-EXCHANGE as Beneficiary Bank.</li>",
            "<li>Fill in the details. Input the mobile number linked to the GCash account in the account number field and click 'Submit.'</li>",
            "<li>Review details and click 'Confirm.'</li>",
            "</ol>",
            "Cash In via BankCom [Personal] web:",
            "<ol type='1'>",
            "<li>Log in through BankCom [Personal] on your desktop or mobile device.</li>",
            "<li>Go to Financial Services >> Transfer to Other Banks and select 'Transfer Type >> InstaPay.'</li>",
            "<li>Choose G-EXCHANGE as Beneficiary Bank.</li>",
            "<li>Fill in the details. Input the mobile number linked to the GCash account in the account number field and click 'Submit.'</li>",
            "<li>Confirm details and enter the One-Time PIN sent to your phone or generated by your BankCom [Personal] Mobile AppÃ¢â‚¬â„¢s OTP Generator.</li>",
            "</ol>",
            "<br>*Bank of Commerce will charge PHP 25.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcash-common-web/static/cashin_icons/BankOfCommerce%40x3.png"
    },
    "pnb": {
        "name": "PNB",
        "instructions": [
            "<ol type='1'>",
            "<li>Log in to your PNB Mobile Banking app and select 'Transfer Funds' on the side menu.</li>",
            "<li>Tap 'Other Local Banks Ã¢â‚¬â€œ Instapay' and choose the source account.</li>",
            "<li>Select 'New Payee,' choose 'GCash' under Bank.</li>",
            "<li>Enter your name under Account Name, your GCash mobile number in this format: 09XXXXXXXXX under A/C Number, your home address, and desired amount.</li>",
            "<li>Enable 'Save Payee to List.'</li>",
            "<li>Review the details you entered and tap 'Done.'</li>",
            "<li>Enter the 6-digit One-Time PIN (OTP) sent to you via SMS.</li>",
            "<li>Wait for the confirmation message to appear on your screen.</li>",
            "</ol>",
            "<br>*PNB will charge PHP 25.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/PNB%403x.png"
    },
    "hsbc": {
        "name": "HSBC",
        "instructions": [
            "New Payee Cash In via HSBC*",
            "<ol type='1'>",
            "<li>Log on to the HSBC Mobile Banking app using your Secure Key. Tap on New transaction under Move Money.</li>",
            "<li>Choose the account you'll send money from.</li>",
            "<li>Tap on 'Select account' >> 'My Payees' >> 'Add a Person.'</li>",
            "<li>Go to Account type and choose 'Other Local Bank.'</li>",
            "<li>Fill out the required information with Payee bank details providing the Payee name. <br>Under Bank name, select 'G-XCHANGE INC (GCASH)' and fill out the account number with the 11-digit <br>GCash-registered mobile number (09XXXXXXXXX). Tap to continue. <br>TIP: For faster future transactions, tick 'Add to My Payees' to add this account to your My Payees List.</li>",
            "<li>Under 'Branch Name,' input 'GCASH.' Indicate the amount to transfer.</li>",
            "<li>Follow the on-screen instructions to generate a transaction security code using your Secure Key.</li>",
            "<li>Tap Continue and review the details, then tap Confirm. You'll see a confirmation that transfer was successful.</li>",
            "</ol>",
            "Saved Payee Cash In via HSBC*",
            "<ol type='1'>",
            "<li>Log on to the HSBC Mobile Banking app. Tap 'Pay bills/Make a transfer' at the bottom of the home screen.</li>",
            "<li>Choose the account you'll send money from then tap 'Select Account.'</li>",
            "<li>Tap on 'My Payees' then choose 'GCASH' from the list.</li>",
            "<li>Fill out the rest of the required information typing GCASH under branch name. Indicate the amount to transfer then tap continue.</li>",
            "<li>Review the details, then tap Confirm. You'll receive a confirmation that transfer was successful.</li>",
            "</ol>",
            "<br>Cash in is also available on Online Banking. Visit hsbc.com.ph <br>Receive your cashed in funds by end of the same banking day for transfers within cut-off, or by the end of the next banking day for transfers after cut-off. <br>For more details visit FAQ at hsbc.com.ph</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/HSBC%403x.png"
    },
    "rcbc": {
        "name": "RCBC",
        "instructions": [
            "Cash In Via RCBC Online Banking App",
            "<ol type=\"1\">",
            "<li>Login to the RCBC Online Banking App.</li>",
            "<li>Select â€œFund Transferâ€ >> â€œBank Transferâ€.</li>",
            "<li>Select the RCBC account to transfer funds from.</li>",
            "<li>Select your GCash account from your enrolled list of Beneficiaries, or select \"GCash\" as the target institution and input your GCash-registered mobile number (09XXXXXXXXX) as your Account Number, Account Name, then tap \"Proceed\".</li>",
            "<li>Select \"Instapay\" as the Transfer Channel, enter Amount, and tap \"Transfer Now\".</li>",
            "<li>Review the transaction summary then tap \"Proceed\" to confirm.</li>",
            "<li>Enter the OTP sent to your RCBC-registered mobile number, then tap \"Submit\".</li>",
            "</ol>",
            "Cash In via RCBC Online Bank Website",
            "<ol type=\"1\">",
            "<li>Log in to your RCBC Online Banking account.</li>",
            "<li>Tap \"Transfer Funds\" and select the RCBC account to transfer funds from.</li>",
            "<li>Select your GCash account from your enrolled list of Beneficiaries, or select \"GCash\" as the target institution and input your GCash-registered mobile number (09XXXXXXXXX) as your Account Number, Account Name, and Amount, then tap \"Submit\".</li>",
            "<li>Review the transaction summary then tap \"Submit\" to confirm.</li>",
            "</ol>",
            "<br>*RCBC will charge PHP 25.00 per successful transaction.</br>"
        ],
        "logo": "https://m.gcash.com/gcashapp/gcash-common-web/static/cashin_icons/revamp/RCBC%403x.png"
    }
};
