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
    hide_header,    
    nav_menu = document.querySelector('.navbar__menu'),
    mobile_menu_btn = document.querySelector('.mobile-menu-btn'),
    scroll_top_btn = document.querySelector('#scroll-top-btn');


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
    
    //save navlist height if on mobile device
    if( window.innerWidth <= 768 ) {
        setTimeout(function(){
            document.querySelector('.navbar__menu').style.setProperty('--list-height', `${document.querySelector('#navbar__list').offsetHeight}px`);
        }, 500);
    }
}


// Add class 'active' to section when near top of viewport
let IntersectionObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: .2
}

const IntersectionObserverCallback = (entries, observer) => {
    
    entries.forEach((entry) => {
        if( entry.isIntersecting ) {
            entry.target.classList.add('active');
            
            //update active state of nav item
            document.querySelector(`.menu__link.active`).classList.remove('active');    
            document.querySelector(`.menu__link[href="#${entry.target.id}"]`).classList.add('active');
            
            if( entry.target.id === 'section3' ) {
                
            }
            
        } else {
            entry.target.classList.remove('active');
        }
    })
}

let observer = new IntersectionObserver(IntersectionObserverCallback, IntersectionObserverOptions);

function active_section_check(e) {
    
    sections.forEach((section) => {
        observer.observe(section.elem);
    })

    let currentPossition = window.pageYOffset;
    
    //toggle scroll top button visibility
    if( currentPossition > sections.get("#section3").start ) {
        if( !scroll_top_btn.classList.contains('active') ) {
            scroll_top_btn.classList.add('active');
        }        
    } else {
        scroll_top_btn.classList.remove('active');
    }
    
    //hide page header while not scrolling   
    show_header();
    if( currentPossition > 300 ) {        
        hide_header = setTimeout(function(){
            header.classList.add('hide');
        }, 2000);        
    }

}


// Scroll to anchor ID using scrollTO event
function handle_nav_anchor(e) {

    e.preventDefault();

    if (e.target.nodeName.toLowerCase() === 'a') {

        let target = sections.get(e.target.hash);

        window.scroll({
            top: target.start,
            left: 0,
            behavior: 'smooth'
        });

    }
}


//handle scroll top button action
function handle_scroll_top(e) {

    e.preventDefault();

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}


//Toggle mobile hamburger menu
function toggle_mobile_menu(e){
    
    e.preventDefault();
    
    if( mobile_menu_btn.classList.contains('active') ) {         
        mobile_menu_btn.classList.remove('active');        
        nav_menu.classList.remove('active');        
    } else {        
        mobile_menu_btn.classList.add('active');        
        nav_menu.classList.add('active');        
    }
    
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', nav_items, { once: true });

// Scroll to section on link click
document.querySelector('#navbar__list').addEventListener('click', handle_nav_anchor);

// Set sections as active
window.addEventListener('scroll', active_section_check);

//scroll top button action
document.querySelector('#scroll-top-btn').addEventListener('click', handle_scroll_top);

//mobile menu button click event
document.querySelector('.mobile-menu-btn').addEventListener('click', toggle_mobile_menu);