import API from './API';

// proxy to avoid cors issues
const proxyURL = 'https://cors-anywhere.herokuapp.com';
const defaultFileType = '0000000000000000000000000000000000000000000000000000000000000000';
const EP = 'https://api.todaqfinance.net';

const routes = {
    accounts: {
        get: {
            accountsAll: settings => API.get(`${proxyURL}/${EP}/accounts`, settings),
            accountByID: (accountID, settings) => API.get(`${proxyURL}/${EP}/accounts/${accountID.toString()}`, settings),
            filesAll: (accountID, settings) => API.get(`${proxyURL}/${EP}/accounts/${accountID.toString()}/files`, settings),
            filesByType: (type = defaultFileType, accountID, settings) => API.get(
                `${proxyURL}/${EP}/accounts/${accountID.toString()}/files/types/${type}`,
                settings
            ),
            fileTypes: (accountID, settings) => API.get(`${proxyURL}/${EP}/accounts/${accountID.toString()}/files/types`, settings),
            transactionsAll: (accountID, settings) => API.get(`${proxyURL}/${EP}/accounts/${accountID.toString()}/transactions`, settings),
        },
    }
};


const ul = document.getElementById('methods-list');
Object.keys(routes.accounts.get).forEach(name => { 
    const li = document.createElement('li');
    li.textContent = `GET: ${name}`;
    ul.appendChild(li);
 })

export default routes;
