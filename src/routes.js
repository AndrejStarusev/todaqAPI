import API from './API';

// TODO handle CORS issue, cors-anywhere is a temporary solution
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
        post: {
            accountCreate: (data, settings) => API.post(`${proxyURL}/${EP}/accounts`, data, settings),
            // here shoud be specific account type in the data object
            businessCreate: (data, settings) => API.post(`${proxyURL}/${EP}/accounts`,data, settings),
        },
    },
    transactions: {
        get: {
            transactionsAll: settings => API.get(`${proxyURL}/${EP}/transactions`, settings),
            transactionByID: (accountID, settings) => API.get(`${proxyURL}/${EP}/transactions/${accountID.toString()}`, settings),
            transactionFiles: (accountID, settings) => API.get(`${proxyURL}/${EP}/transactions/${accountID.toString()}/files`, settings),
            transactionSender: (accountID, settings) => API.get(`${proxyURL}/${EP}/transactions/${accountID.toString()}/sender`, settings),
            transactionRecipient: (accountID, settings) => API.get(`${proxyURL}/${EP}/transactions/${accountID.toString()}/recipient`, settings),
        },
        post: {
            initiate: (data, settings) => API.post(`${proxyURL}/${EP}/transactions`, data, settings),
            bulkFilesOfType: (data, settings) => API.post(`${proxyURL}/${EP}/transactions`,data, settings),
        },
    },
    files: {
        get: {
            filesAll: settings => API.get(`${proxyURL}/${EP}/files`, settings),
            fileByID: (accountID, settings) => API.get(`${proxyURL}/${EP}/files/${accountID.toString()}`, settings),
            transactionsByFileId: (fileID, settings) => API.get(`${proxyURL}/${EP}/files/${fileID.toString()}/transactions`, settings),
            proofByFileId: (fileID, settings) => API.get(`${proxyURL}/${EP}/files/${fileID.toString()}/proofs`, settings),
            metaByFileId: (fileID, settings) => API.get(`${proxyURL}/${EP}/files/${fileID.toString()}/meta`, settings),
        },
        post: {
            create: (data, settings) => API.post(`${proxyURL}/${EP}/files`, data, settings),
            bulkCreate: (data, settings) => API.post(`${proxyURL}/${EP}/files`,data, settings),
        },
    },
    cycles: {
        get: {
            listRoots: settings => API.get(`${proxyURL}/${EP}/cycles`, settings),
            cycleByRootId: (rootId, settings) => API.get(`${proxyURL}/${EP}/files/${rootId.toString()}`, settings),
        },
    },
};


async function testRoute() {
    const accounts = await routes.accounts.get.accountsAll();
    console.log('accounts', accounts);

    const files = await routes.files.get.filesAll();
    console.log('files', files);

    const transactions = await routes.transactions.get.transactionsAll();
    console.log('transactions', transactions);

    const roots = await routes.cycles.get.listRoots();
    console.log('roots', roots);
;};

testRoute();

export default routes;
