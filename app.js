const sidebar = document.getElementById("sidebar")

// drawer functionality
;(function (sidebar) {
    // Grab the hamburger button and sidebar
    const toggleButton = document.getElementById("sidebar-toggle-btn")
    const overlay = document.getElementById("overlay")

    function showSidebar(visible) {
        // show (visible=true) or hide (visible=false) sidebar
        toggleButton.setAttribute("aria-expanded", visible)
        sidebar.setAttribute("aria-hidden", !visible)

        if (visible) {
            overlay.classList.add("darkened")
        } else {
            overlay.classList.remove("darkened")
        }
    }
    window.showSidebar = showSidebar

    function sideBarIsOpen() {
        return toggleButton.getAttribute("aria-expanded") === "true"
    }

    // Function to toggle sidebar open/close
    function toggleSidebar() {
        showSidebar(!sideBarIsOpen())
    }

    // Add event listener to the hamburger button
    toggleButton.addEventListener("click", toggleSidebar)

    // Function to update aria-hidden based on screen width
    function initSidebarAriaAttrs() {
        overlay.classList.remove("darkened")

        if (window.innerWidth <= 768) {
            // On mobile, make the button accessible
            toggleButton.setAttribute("aria-hidden", "false")
            toggleButton.setAttribute("aria-expanded", "false")
            // on load if hambrurger button is visible, then navmenu is hidden
            sidebar.setAttribute("aria-hidden", "true")
        } else {
            // On desktop, hide the button from screen readers
            toggleButton.setAttribute("aria-hidden", "true")
            toggleButton.setAttribute("aria-expanded", "true")
            // On desktop the nav menu is always visible
            sidebar.setAttribute("aria-hidden", "false")
        }
    }

    initSidebarAriaAttrs()
    // Update aria-hidden on window resize
    window.addEventListener("resize", initSidebarAriaAttrs)

    // Close the sidebar when it is open and the overlay is clicked
    overlay.addEventListener("click", function () {
        if (sideBarIsOpen()) {
            showSidebar(false)
        }
    })

    // Close the sidebar when the Escape key is pressed
    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && sideBarIsOpen()) {
            // Check if the pressed key is Escape
            showSidebar(false)
        }
    })
})(sidebar)

// Loop through each button and add a click event listener
sidebar.querySelectorAll(".dropdown-btn").forEach(button => {
    button.addEventListener("click", toggleSubMenu)
})

function toggleSubMenu(event) {
    // 'event.currentTarget' always refers to the button
    // that has the event listener

    const dropdownBtn = event.currentTarget
    const submenuIsOpen = dropdownBtn.getAttribute("aria-expanded") === "true"

    // get submenu that is controlled by the clicked dropdown button
    const controlledId = dropdownBtn.getAttribute("aria-controls")
    const submenu = document.getElementById(controlledId)

    closeOtherSubMenus(controlledId)

    // this effectively toggles it
    showSubmenu(submenu, !submenuIsOpen)
}

function showSubmenu(submenu, value) {
    // show or hide the submenu, value is boolean

    submenu.setAttribute("aria-hidden", !value)
    // get dropdown button that controls this submenu
    const button = sidebar.querySelector(
        `.dropdown-btn[aria-controls="${submenu.id}"]`
    )

    button.setAttribute("aria-expanded", value)
}

function closeOtherSubMenus(submenuId) {
    // Close all open submenus but this one
    // When submenuId is undefined, closes all open submenus
    sidebar
        .querySelectorAll('.submenu[aria-hidden="false"]')
        .forEach(submenu => {
            if (submenu.id !== submenuId) {
                showSubmenu(submenu, false)
            }
        })
}
