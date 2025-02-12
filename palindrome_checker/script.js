const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');


const empty = () => {
    const textInput = document.getElementById('text-input').value;
    const text = textInput.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");
    if(text === '') {
        result.classList.add('hidden');
        return alert('Please input a value');
    }
}    
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