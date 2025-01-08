const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios')
const {fetchMtn, fetchAirtel, fetchGlo, fetchMobile} = require('./firebaseSet');

// Call the fetchMtn function
const mtnPlans = async () => {
    try {
        const documents = await fetchMtn(); // Fetch the data (an array of objects)

        // Sort the documents by the 'index' key in ascending order
        documents.sort((a, b) => a.index - b.index);

        // Extract the 'name' keys from the sorted documents
        const options = documents.map(doc => doc.name);

        let menuString = '*📲Buy MTN DATA📱*\n\n';
        menuString += 'Please select your *Data Type*\n\n';
        menuString += 'Reply with menu number\n\n';

        // Loop through the array to build the numbered menu
        options.forEach((option, index) => {
            menuString += `\t*${index + 1}. ${option}*\n\n`;
        });

        menuString += '\n*Note*:  Reply with #️⃣ to go back to the main menu';
        return menuString;
    } catch (error) {
        console.error('Error fetching MTN plans:', error);
    }
};

const airtelPlans = async () => {
    try {
        const documents = await fetchAirtel(); // Fetch the data (an array of objects)

        // Sort the documents by the 'index' key in ascending order
        documents.sort((a, b) => a.index - b.index);

        // Extract the 'name' keys from the sorted documents
        const options = documents.map(doc => doc.name);

        let menuString = '*📲Buy AIRTEL DATA📱*\n\n';
        menuString += 'Please select your *Data Type*\n\n';
        menuString += 'Reply with menu number\n\n';

        // Loop through the array to build the numbered menu
        options.forEach((option, index) => {
            menuString += `\t*${index + 1}. ${option}*\n\n`;
        });

        menuString += '\n*Note*:  Reply with #️⃣ to go back to the main menu';
        return menuString;
    } catch (error) {
        console.error('Error fetching MTN plans:', error);
    }
};

const gloPlans = async () => {
    try {
        const documents = await fetchGlo(); // Fetch the data (an array of objects)

        // Sort the documents by the 'index' key in ascending order
        documents.sort((a, b) => a.index - b.index);

        // Extract the 'name' keys from the sorted documents
        const options = documents.map(doc => doc.name);

        let menuString = '*📲Buy GLO DATA📱*\n\n';
        menuString += 'Please select your *Data Type*\n\n';
        menuString += 'Reply with menu number\n\n';

        // Loop through the array to build the numbered menu
        options.forEach((option, index) => {
            menuString += `\t*${index + 1}. ${option}*\n\n`;
        });

        menuString += '\n*Note*:  Reply with #️⃣ to go back to the main menu';
        return menuString;
    } catch (error) {
        console.error('Error fetching MTN plans:', error);
    }
};

const mobilePlans = async () => {
    try {
        const documents = await fetchMobile(); // Fetch the data (an array of objects)

        // Sort the documents by the 'index' key in ascending order
        documents.sort((a, b) => a.index - b.index);

        // Extract the 'name' keys from the sorted documents
        const options = documents.map(doc => doc.name);

        let menuString = '*📲Buy 9MOBILE DATA📱*\n\n';
        menuString += 'Please select your *Data Type*\n\n';
        menuString += 'Reply with menu number\n\n';

        // Loop through the array to build the numbered menu
        options.forEach((option, index) => {
            menuString += `\t*${index + 1}. ${option}*\n\n`;
        });

        menuString += '\n*Note*:  Reply with #️⃣ to go back to the main menu';
        return menuString;
    } catch (error) {
        console.error('Error fetching MTN plans:', error);
    }
};

// Initialize the WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Generate QR code for login
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code to log in.');
});

// Once authenticated
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

const userStates = new Map();
const userIndex = new Map();
const beneficiary = new Map();
const usernetwork = new Map();
const airtimeAmount = new Map();


// Handle incoming messages
client.on('message',async (message) => {
    const chatId = message.from;
    const text = message.body.trim();
    const phoneNumber = chatId.split('@')[0];
    const modifiedPhoneNumber = '0' + phoneNumber.slice(3);
    const currentState = userStates.get(chatId);

    const InvalidCmd = `⚠️ *Invalid Command* ⚠️

❌ ⚡️⚡️ ❌
Sorry, i don’t understand the command entered.

Note: Always ensure you respond with the menu number

if you have any issue, please contact our support team: https://wa.me/+2347041754704

Press #️⃣ to go back to the main menu or reply with the appropriate menu number`

    try {
          const phpScriptUrl = 'https://app.jotease.org/bot/user.php';
          const response = await axios.post(
                phpScriptUrl,
                new URLSearchParams({ phone: modifiedPhoneNumber }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            const user = response.data.users?.[0] || {}; // Safely access the first user or fallback to an empty object
            const names = `${user.first_name || 'N/A'} ${user.last_name || 'N/A'}`;
            const balance = user.balance || 'N/A';
            const account = user.account || 'N/A';

                    const welcomeMessage = `*Good Day, ${names}* 🎉,
            \n🤑 *Available Balance: ₦${balance}*
            \n💰 *Acc No: ${account}*
💰 *Bank: Providus Bank*
            \nPay Bills Below 👇
            \n*Reply with number*
            1️⃣ Buy Data
            2️⃣ Buy Airtime
            3️⃣ Fund Wallet
            4️⃣ Talk to Support
            \n⚡️https://onelink.to/4kgwux ⚡️`;
            if (!currentState) {
                // Step 1: Send welcome message
                if (response.data && response.data.success) {
                    client.sendMessage(chatId, welcomeMessage);
                    userStates.set(chatId, 'MAIN_MENU'); // Set user's state to MAIN_MENU
                } else {
                    client.sendMessage(chatId, `Hello, I’m *Beulah* from JotEase.
                        
It seems you haven’t created a JotEase account yet, or the phone number connected to your WhatsApp is different from the one on your JotEase account. 
                        
To get started with JotEase, *Sign up* now by clicking the link below 👇, it’s quick and easy.  

https://onelink.to/4kgwux

Or request a phone number change.
Use the link bellow,  Contact support and request for a phone number change. 👇👇
                        
https://onelink.to/4kgwux`);
                    userStates.set(chatId, ''); // Set user's state to SIGNUP_PROMPT
                }
                return;
            }

                   // Step 2: Handle user responses based on current state
            if (currentState === 'MAIN_MENU') {
                switch (text) {
                    case '1': // Buy Data
                        client.sendMessage(chatId, `*📲Buy DATA📱*

Please select your *Network*

Reply with menu number
 
        1️⃣ MTN
        2️⃣ AIRTEL
        3️⃣ GLO
        4️⃣ 9MOBILE


*Note*:  Reply with #️⃣ to go back to the main menu`);
                        userStates.set(chatId, 'BUY_DATA');
                        break;
                    case '2': // Buy Airtime
                        client.sendMessage(chatId, `*📲Buy AIRTIME*

Please select your *Network*

Reply with menu number
 
        1️⃣ MTN
        2️⃣ AIRTEL
        3️⃣ GLO
        4️⃣ 9MOBILE


*Note*:  Reply with #️⃣ to go back to the main menu`);
                        userStates.set(chatId, 'BUY_AIRTIME');
                        break;
                    case '3': // Fund Wallet
                        client.sendMessage(chatId, `Copy your providus Bank account number here:\n *Account number:* ${account}\n  and send the amount you want to fund, you’ll be credited in 20seconds - 5minutes

*Note*:  Reply with #️⃣ to go back to the main menu`);
                        break;
                    case '4': // Talk to Support
                        client.sendMessage(chatId, `*Need Help? Contact our team ASAP*: https://wa.me/+2347041754704

*Note*: enter “#” to go back to menu`);
                        break;
                    case '#': // Talk to Support
                        client.sendMessage(chatId, welcomeMessage);
                        userStates.set(chatId, '');
                    break;
                    default:
                        client.sendMessage(chatId, InvalidCmd);
                }
                return;
            } 

            //buy data
            if (currentState === 'BUY_DATA') {
                switch (text) {
                    case '1': // Buy Data
                        const menu = await mtnPlans();
                        client.sendMessage(chatId, menu);
                        userStates.set(chatId, 'MTN_DATA');
                        usernetwork.set(chatId, 'mtn');
                        break;
                    case '2': // Buy Airtime
                        const airtelMenu = await airtelPlans();
                        client.sendMessage(chatId, airtelMenu);
                        userStates.set(chatId, 'MTN_DATA');
                        usernetwork.set(chatId, 'airtel');
                        break;
                    case '3': // Fund Wallet
                        const gloMenu = await gloPlans();
                        client.sendMessage(chatId, gloMenu);
                        userStates.set(chatId, 'MTN_DATA');
                        usernetwork.set(chatId, 'glo');
                        break;
                    case '4': // Fund Wallet
                        const mobileMenu = await mobilePlans();
                        client.sendMessage(chatId, mobileMenu);
                        userStates.set(chatId, 'MTN_DATA');
                        usernetwork.set(chatId, '9mobile');
                        break;    
                    case '#': // Talk to Support
                        client.sendMessage(chatId, welcomeMessage);
                        userStates.set(chatId, '');
                    break;
                    default:
                        client.sendMessage(chatId, InvalidCmd);
                }
                return;
            } 

             //buy MTN data
             if (currentState === 'MTN_DATA') { // Parse user input as an integer
                const network = usernetwork.get(chatId);
                console.log('network', network)
                selectedIndex = parseInt(text, 10);
                const documents = await (network === 'mtn' ? fetchMtn() : network === 'airtel' ? fetchAirtel() : network === 'glo' ? fetchGlo() : fetchMobile()) ;
                const foundDocument = documents.find(doc => doc.index === selectedIndex);
                const optionsMap = documents.reduce((map, doc, index) => {
                    map[index + 1] = doc.name; // Map option to name
                    return map;
                }, {});
            
                const totalPlans = Object.keys(optionsMap).length; // Total number of plans
            
                if (!isNaN(selectedIndex) && selectedIndex > 0 && selectedIndex <= totalPlans) {
                    userIndex.set(chatId, selectedIndex);
                    // Valid selection, retrieve the name
                    const selectedName = foundDocument.name;
            
                    client.sendMessage(chatId, `📳 *Buy Data* 📳

⚡️⚡️⚡️

You are buying *${selectedName}* DATA PLAN

Reply with the  *recipient phone number* .

*Note*:  Reply with #️⃣ to go back to the main menu`);
                    userStates.set(chatId, 'MTN_NUMBER');
                } else if (selectedIndex > totalPlans) {
                    // Input is greater than the number of plans
                    client.sendMessage(
                        chatId,
                        `*Invalid selection*. You selected option ${selectedIndex}, but there are only ${totalPlans} options available. Please try again or Press #️⃣ to go back to the main menu.`
                    );
                } else if (text === '#') { // Talk to Support
                    client.sendMessage(chatId, welcomeMessage);
                    userStates.set(chatId, '');
                } else {
                    client.sendMessage(chatId, InvalidCmd);
                }
                return;
            }
            
            if (currentState === 'MTN_NUMBER') {
                const recipient = text;
                console.log('recipient', recipient )
                const recipientString = recipient.toString();
                const network = usernetwork.get(chatId);
                const documents = await (network === 'mtn' ? fetchMtn() : network === 'airtel' ? fetchAirtel() : network === 'glo' ? fetchGlo() : fetchMobile()) ;
                const selectedIndex = userIndex.get(chatId);
                const foundDocument = documents.find(doc => doc.index === selectedIndex);
                const selectedName = foundDocument.name
                beneficiary.set(chatId, recipient)
                if (recipientString.length === 11) {
                    client.sendMessage(chatId, `📳 *Buy Data* 📳

Invoice Generated.

*Package* : ${selectedName}
*Recipient*: ${recipientString}

Would you like to process this invoice. Reply with menu number

1. Yes
2. No`)
             userStates.set(chatId, 'NUMBER_CONFIRM');
                } else if (text === '#') {
                    client.sendMessage(chatId, welcomeMessage);
                    userStates.set(chatId, '');
                }  else {
                    client.sendMessage(chatId, `📳 *Buy Data* 📳

❌ ⚡️ ⚡️ ❌

You have entered an invalid *recipient phone number*. Please check and send again.

*Note*:  Reply with #️⃣ to go back to the main menu`)
                }
            }

            if (currentState === 'NUMBER_CONFIRM') {
                const recipient = beneficiary.get(chatId) || "Unknown Recipient";
                const selectedIndex = userIndex.get(chatId);
                const network = usernetwork.get(chatId);
                const documents = await (network === 'mtn' ? fetchMtn() : network === 'airtel' ? fetchAirtel() : network === 'glo' ? fetchGlo() : fetchMobile()) ;
                const apikey = response.data.users[0].apikey; 
                const user_id = response.data.users[0].user_id; 
                const foundDocument = documents.find(doc => doc.index === selectedIndex);
                const dataType = foundDocument.type || "Unknown Type";
                const planid = foundDocument.planid || "Unknown Plan";
                const selectedName = foundDocument.name || "Unknown Package";
            
                console.log('Details:', recipient, selectedIndex, apikey, user_id, network, dataType, planid, selectedName);
            
                if (text === '1') {
                    const purchaseResponse = await axios.get(`https://app.jotease.org/wp-content/plugins/vprest/?id=${user_id}&apikey=${apikey}&q=data&phone=${recipient}&network=${network}&type=${dataType}&dataplan=${planid}`);
                    console.log('response', purchaseResponse.data.Successful)
                    const message = purchaseResponse.data.message
                    if (purchaseResponse.data.Successful === 'true') {
                    client.sendMessage(chatId, `📳 *Buy Data* 📳

✅ ⚡️⚡️ ✅
Transaction Completed Successfully.

*Congratulations* 🎉 you’ve earned *0.5% cash back* on this transaction ✅
${message}

Thanks for using JotEase⚡️,


Note: Reply with #️⃣ to go back to the main menu`);
                    } else if (purchaseResponse.data.message === 'Balance Too Low'){
                        client.sendMessage(chatId, `📳 *Buy DATA* 📳

❌ ⚡️⚡️ ❌
*INSUFFICIENT BALANCE*.

KINDLY FUND WALLET TO PROCESS THIS TRANSACTION 

*Note*: Reply with #️⃣ to go back to the main menu`)
                    } else  {
                        client.sendMessage(chatId, `📳 *Buy Data* 📳

❌ ⚡️⚡️ ❌
TRANSACTION FAILED TRY ANOTHER DATA PLAN 


*Note*: Reply with #️⃣ to go back to the main menu`)
                    }
                            userStates.set(chatId, 'done');
                } else if (text === '2') {
                    client.sendMessage(chatId, `📳 *Buy Data* 📳

⚠️⚡️⚡️⚠️
Transaction has been Cancelled.🥲

We wish to see you again,
`);
                   userStates.set(chatId, 'cancel');
                } else if (text === '#') { // Talk to Support
                    client.sendMessage(chatId, welcomeMessage);
                    userStates.set(chatId, '');
                } else {
                    client.sendMessage(chatId, InvalidCmd);
                }
            }
            
            if (currentState === 'BUY_AIRTIME') {
                const networkMap = {
                    '1': 'mtn',
                    '2': 'airtel',
                    '3': 'glo',
                    '4': '9mobile',
                };
            
                if (text in networkMap) {
                    const network = networkMap[text];
                    usernetwork.set(chatId, network);
            
                    const menu = `📳 *Buy Airtime* 📳
            
            ⚡️⚡️⚡️
            
You are buying *${network.toUpperCase()}* Airtime.

Reply with *recipient phone number*.
            
*Note*: Reply with #️⃣ to go back to the main menu`;
            
                    client.sendMessage(chatId, menu);
                    userStates.set(chatId, 'airtime_number')
                } else if (text === '#') {
                    // Talk to Support
                    client.sendMessage(chatId, welcomeMessage);
                    userStates.set(chatId, '');
                } else {
                    client.sendMessage(chatId, InvalidCmd);
                }
            }

            if (currentState === 'airtime_number') {
                const recipient = text;
                const network = usernetwork.get(chatId);
                beneficiary.set(chatId, recipient)
                if (recipient.length === 11) {
                    client.sendMessage(chatId, `📳 *Buy Airtime* 📳

⚡️⚡️⚡️

You are buying *${network}* Airtime For ${recipient}

Please *enter the amount* of airtime you are buying .

*Note*:  Reply with #️⃣ to go back to the main menu`)
             userStates.set(chatId, 'airtime_amount');
                } else if (text === '#') {
                    client.sendMessage(chatId, welcomeMessage);
                    userStates.set(chatId, '');
                }  else {
                    client.sendMessage(chatId, `📳 *Buy Airtime* 📳

❌ ⚡️⚡️ ❌

You have entered an *invalid recipient phone number*. Please check and send again.

Note:  Reply with #️⃣ to go back to the main menu`)
                }

            }
            
            if (currentState === 'airtime_amount') {
                const amount = parseInt(text, 10);
                const network = usernetwork.get(chatId);
                const recipient = beneficiary.get(chatId);
                airtimeAmount.set(chatId, amount)
                if (amount < 50) {
                    client.sendMessage(chatId, `📳 *Buy Airtime* 📳

❌ ⚡️⚡️ ❌
The minimum *amount is ₦50*

*Please reply with appropriate Amount* or 👇👇

*Note*: Reply with #️⃣ to go back to the main menu`)
                } else if (amount >= 50) {
                    client.sendMessage(chatId, `📳 *Buy Airtime* 📳

⚡️⚡️⚡️

Invoice Generated.

*Service*: ${network} Airtime
*Recipient*: ${recipient}
*Amount*: NGN ${amount}

*Would you like to process this invoice. Reply with menu number*

*1*. Yes
*2*. No`)
                 userStates.set(chatId, 'confirm') 
                }  else if (text === '#') {
                    client.sendMessage(chatId, welcomeMessage);
                    userStates.set(chatId, '');
                }  else {
                    client.sendMessage(chatId, InvalidCmd);                }
            }

            if (currentState === 'confirm') {
                const recipient = beneficiary.get(chatId) || "Unknown Recipient";
                const network = usernetwork.get(chatId);
                const apikey = response.data.users[0].apikey; 
                const user_id = response.data.users[0].user_id; 
                const amount = airtimeAmount.get(chatId);
            
                console.log('Details:', recipient, apikey, user_id, network, amount);
            
                if (text === '1') {
                    const purchaseResponse = await axios.get(`https://app.jotease.org/wp-content/plugins/vprest/?q=airtime&id=${user_id}&apikey=${apikey}&phone=${recipient}&amount=${amount}&network=${network}&type=vtu`);
                    console.log('response', purchaseResponse.data.Successful)
                    const message = purchaseResponse.data.message
                    if (purchaseResponse.data.Successful === 'true') {
                    client.sendMessage(chatId, `📳 *Buy Airtime* 📳

✅⚡️⚡️⚡️✅
Transaction Successfull.

*Congratulations* 🎉 you’ve earned *0.5% cash back* on this transaction ✅

Thanks for Choosing JotEase,


*Note*: Reply with #️⃣ to go back to the main menu`);
                    } else if (purchaseResponse.data.message === 'Balance Too Low'){
                        client.sendMessage(chatId, `📳 *Buy Airtime* 📳

❌ ⚡️⚡️ ❌
*INSUFFICIENT BALANCE*.

KINDLY FUND WALLET TO PROCESS THIS TRANSACTION 

*Note*: Reply with #️⃣ to go back to the main menu`)
                    } else {
                        client.sendMessage(chatId, `📳 Buy Airtime 📳

❌ ⚡️⚡️ ❌
TRANSACTION FAILED TRY AGAIN 


Note: Reply with #️⃣ to go back to the main menu`)
                    }
                            userStates.set(chatId, 'done');
                } else if (text === '2') {
                    client.sendMessage(chatId, `📳 *Buy Airtime* 📳

⚠️⚡️⚡️⚠️
Transaction has been Cancelled.🥲

We wish to see you again,
`);
                   userStates.set(chatId, 'cancel');
                } else if (text === '#') { // Talk to Support
                    client.sendMessage(chatId, welcomeMessage);
                    userStates.set(chatId, '');
                } else {
                    client.sendMessage(chatId, InvalidCmd);
                }
            }


            if (currentState === 'done' || currentState === 'cancel') {
                client.sendMessage(chatId, welcomeMessage);
                userStates.set(chatId, '');
            }

    }
    catch (error) {
        console.error('Error sending phone number to PHP script:', {
            errorMessage: error.message,
            response: error.response?.data || 'No response data',
        });
    }
   
});

// Start the WhatsApp client
client.initialize();
