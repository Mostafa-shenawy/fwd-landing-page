/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections = new Map(),
    header = document.querySelector('header.page__header'),
    hide_header;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function show_header() {   
    clearTimeout(hide_header, 5000);
    header.classList.remove('hide');
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function nav_items() {

    let nav_items = document.createDocumentFragment();

    document.querySelectorAll('main section').forEach(function (section, i) {

        //create nav item
        let nav_item = document.createElement('li');
        nav_item.innerHTML = `<a class="menu__link ${i === 0 ? 'active' : ''}" href="#${section.id}">${section.dataset.nav}</a>`;
        nav_items.appendChild(nav_item);

        //save section top offset to section array
        sections.set(`#${section.id}`, {
            start: section.offsetTop,
            end: section.offsetTop + section.offsetHeight,
            elem: section
        });
        
    });

    //append nav items to nav list wrapper
    document.querySelector('#navbar__list').appendChild(nav_items);
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', nav_items, { once: true });

// Scroll to section on link click

// Set sections as active


