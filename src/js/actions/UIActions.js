export function toggleSidebar() {
    return {
        type: "TOGGLE_SIDEBAR",
    }
}

export function showSidebar() {
    return {
        type: "SHOW_SIDEBAR",
    }
}

export function hideSidebar() {
    return {
        type: "HIDE_SIDEBAR",
    }
}

export function pageSwipe(event) {
    return {
        type: "PAGE_SWIPE",
        payload: event,
    }
}

export function setPage(options) {
    return {
        type: "SET_PAGE",
        payload: {
            ...options
        }
    }
}

export function resizePage() {
    return {
        type: "RESIZE_PAGE",
    }
}