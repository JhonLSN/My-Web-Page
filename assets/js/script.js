//  <----- TypeWriter Name and --change ----->

function typewriterName(element){
    const textArrayName = element.innerHTML.split('');
    element.innerHTML = '';
    textArrayName.forEach((letra, i) => {
        setTimeout(function(){
            element.innerHTML += letra
        }, 80*i)
    });
}

typewriterName(document.querySelector('.home__typewriter__name'))
typewriterName(document.querySelector('.home__typewriter__name--change'))

//  <----- TypeWriter About Me ----->

const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false
}

// Type Method
TypeWriter.prototype.type = function(){
    // Current index of word
    const current = this.wordIndex % this.words.length;
    //Get full text of currency word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }else{
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Type Speed
    let typeSpeed = 120;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end 
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;        
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait)
}

//  <----- Header Size Scroll ----->

window.addEventListener("scroll", function(){
    var navigation = document.querySelector(".home__guide__list");
    navigation.classList.toggle("scroll", window.scrollY > 0);
})

//  <----- Header Navigation Scroll (JQuery) ----->

$('.home__guide .home__guide__list__anchor').click(function(e){
    // Removing hashtag of link
    e.preventDefault();
    var id = $(this).attr('href');
        // Return value top
        targetOffset = $(id).offset().top;
        // Verify value of top in console
        console.log(targetOffset);
    // Where do i want animation? 'html' and 'body'
    $('html, body').animate({
        // Who do i want to animate? 'top'
        scrollTop: targetOffset
    }, 500);
});
