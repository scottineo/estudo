const checkButton = document.getElementById('check-btn');
const empty = () => {
    if(document.getElementById('text-input').value === '') {
        return alert('Please input a value');
    }
}    
const checkPalindrome = () => {
    empty();
    const text = document.getElementById('text-input').value;
    const textReversed = text.split('').reverse().join('');
    if(text === textReversed) {
        return alert('It is a palindrome');
    }
    return alert('It is not a palindrome');
}
checkButton.addEventListener('click', checkPalindrome);