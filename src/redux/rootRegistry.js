const localStorageItemName = 'rootRegistry';

const initState = {
    items: {
        'help': {
            hash: 'QmT26rKxQdkD6XruyN8J3LDkRxWy6ZAjeYabfQUe9GssGf',
            protocol: 'ipfs'
        },
        'cyber': {
            hash: 'QmXZ5GeuFGYJswXT93hmjG5Z6fGJM2ifgXsXBxyomi63GN',
            protocol: 'ipfs'
        },
        'wiki': {
            hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
            protocol: 'ipfs'
        },
        'ewiki': {
            hash: 'QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX',
            protocol: 'ipfs'
        },
        'test': {
            hash: 'Qma2CP6cRe8K6QExZ2MwGW5XYC76r9CZYxbbWEtnMzcZ6g',
            protocol: 'ipfs'
        }
    },
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_ITEMS': {
            return {
                ...state,
                items: action.payload,
            }
        }

        default:
            return state;
    }
}

let __registryItems = {};

export const init = () => (dispatch, getState) => new Promise(resolve => {
    const _localStorageItems = JSON.parse(localStorage.getItem(localStorageItemName) || '{}');

    if (Object.keys(_localStorageItems).length === 0) {
        __registryItems = initState.items;
    } else {
        __registryItems = _localStorageItems
    }

    localStorage.setItem(localStorageItemName, JSON.stringify(__registryItems));

    dispatch({
        type: 'SET_ITEMS',
        payload: __registryItems
    })

    resolve(__registryItems)
})

export const deleteRegistryItem = (itemName) => (dispatch, getState) => {
    delete __registryItems[itemName];
    localStorage.setItem(localStorageItemName, JSON.stringify(__registryItems));

    dispatch({
        type: 'SET_ITEMS',
        payload: __registryItems
    })
}

export const registryItemsAsArray = (state) => {
    const itemsMap = state.rootRegistry.items;
    const itemsArray = Object.keys(itemsMap).map(key => ({
        name: key,
        hash: itemsMap[key].hash,
        protocol: itemsMap[key].protocol,
    }));

    return itemsArray;
}

export const getRegistryItems = (state) => {
    return state.rootRegistry.items
}


export const addRegistryItem = (name, hash, protocol) => (dispatch, getState) => new Promise(resolve => {
    __registryItems[name] = {
        hash,
        protocol
    };

    localStorage.setItem(localStorageItemName, JSON.stringify(__registryItems));

    dispatch({
        type: 'SET_ITEMS',
        payload: __registryItems
    });

    resolve(__registryItems);
})
