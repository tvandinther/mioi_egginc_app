const initialState = {
    activePage: {
        path: "/",
        shortTitle: "Home",
        title: "Welcome",
    },
    isSidebarVisible: false,
    menuOnLeft: determineMenuPlacement(),
    sizeFormat: determineSizeFormat(),
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "TOGGLE_SIDEBAR": {
            return {...state, isSidebarVisible: !state.isSidebarVisible}
        }
        case "SHOW_SIDEBAR": {
            return {...state, isSidebarVisible: true}
        }
        case "HIDE_SIDEBAR": {
            return {...state, isSidebarVisible: false}
        }
        case "SET_PAGE": {
            return {...state, activePage: {...action.payload}}
        }
        case "RESIZE_PAGE": {
            return {...state, menuOnLeft: determineMenuPlacement(), sizeFormat: determineSizeFormat()}
        }
        case "PAGE_SWIPE": {
            return state
        }
        default: {
            return state
        }
    }
}

function determineMenuPlacement() {
    return window.innerWidth > 840 ? true : false
}

function determineSizeFormat() {
    const breakpoints = [840, 1280]
    if (window.innerWidth < breakpoints[0]) {
        return "small"
    }
    else if (window.innerWidth < breakpoints[1]) {
        return "medium"
    }
    else {
        return "large"
    }
}