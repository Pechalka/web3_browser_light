const localStorageItemName = 'appMenu';

const initState = {
    items: [
        {
            name: 'help',
            rootDura: '.help',
            subItems: {}
        },
        {
            name: 'cyber',
            rootDura: '.cyber',
            subItems: {}
        },
        {
            name: 'wiki',
            rootDura: '.wiki',
            subItems: {}
        },
        {
            name: 'ewiki',
            rootDura: '.ewiki',
            subItems: {}
        },
        {
            name: 'test',
            rootDura: '.test',
            subItems: {}
        }
    ],
    pendingAddToFavorites: false,
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_MENU_ITEMS': {
            return {
                ...state,
                items: [...action.payload],
            }
        }

        case 'SET_PENDING_ADD_TO_BOOKMARKS': {
            return {
                ...state,
                pendingAddToFavorites: action.payload,
            }
        }

        default:
            return state;
    }
}

export const init = () => (dispatch, getState) => {
    let menuItems = JSON.parse(localStorage.getItem(localStorageItemName) || '[]');

    if (menuItems.length === 0) {
        menuItems = initState.items;
    }

    dispatch({
        type: 'SET_MENU_ITEMS',
        payload: menuItems
    });
    dispatch(saveMenuItemsInLs());
}

export const showInput = () => (dispatch, getState) => {
    dispatch({
        type: 'SET_PENDING_ADD_TO_BOOKMARKS',
        payload: true,
    })
}

export const hideInput = () => (dispatch, getState) => {
    dispatch({
        type: 'SET_PENDING_ADD_TO_BOOKMARKS',
        payload: false,
    })
}

export const deleteMenuItem = (rootDura) => (dispatch, getState) => {
    let menuItems = getState().appMenu.items;

    menuItems = menuItems.filter(item => {
        console.log(item.rootDura !== rootDura);
        return item.rootDura !== rootDura;
    });

    dispatch({
        type: 'SET_MENU_ITEMS',
        payload: menuItems
    });
    dispatch(saveMenuItemsInLs());
}

export const getMenuItems = (state) => {
    return state.appMenu.items
}

export const addMenuItem = (name, dura) => (dispatch, getState) => {
    let menuItems = getState().appMenu.items;

    menuItems.push({
        name: name,
        rootDura: dura,
        subItems: {}
    });

    dispatch({
        type: 'SET_MENU_ITEMS',
        payload: menuItems
    });
    dispatch(saveMenuItemsInLs());
}

const saveMenuItemsInLs = () => (dispatch, getState) => {
    const registryItems = getState().appMenu.items;
    localStorage.setItem(localStorageItemName, JSON.stringify(registryItems));
}
