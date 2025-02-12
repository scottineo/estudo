const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');

// Function to check if the input is empty
const empty = () => {
    const textInput = document.getElementById('text-input').value;
    const text = textInput.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");
    if(text === '') {
        result.classList.add('hidden');
        return alert('Please input a value');
    }
}
// Function to check if the word is a palindrome
const checkPalindrome = () => {
    const textInput = document.getElementById('text-input').value;
    const text = textInput.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const textReversed = text.split('').reverse().join('');

    if(text === textReversed && text !== '') {
        result.classList.remove('hidden');
        result.textContent = `${textInput} is a palindrome`;
    }
    else if(text !== textReversed){
        result.classList.remove('hidden');
        result.textContent = `${textInput} is not a palindrome`;}
    else{
        empty();
    }}
checkButton.addEventListener('click', checkPalindrome);

//Function to animate the title
const animateTitle = () => {
    const title = document.getElementById('title');
    const titleText = title.textContent;

    title.innerHTML = "";
  
    for (let i = 0; i < titleText.length; i++) {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = titleText[i];
      title.appendChild(letterSpan);
    }
  
    const letters = document.querySelectorAll('span');

    letters.forEach((letter, idx) => {
      letter.style.animationDelay = `${idx * 50}ms`;
    }
);
letters[1].style.width = "7px";
letters[4].style.width = "7px";

  }
    animateTitle();