const convertBtn = document.getElementById('convert-btn');
const number = document.getElementById('number');
const output = document.getElementById('output');


// Event listener for the convert button
convertBtn.addEventListener('click', () => {

    if(number.value === ""){
        output.classList.remove('hidden');
        output.innerHTML = "Please enter a valid number";

    }else if(number.value < 1){
        output.classList.remove('hidden');
        output.innerHTML = "Please enter a number greater than or equal to 1";
    }
    else if(number.value >= 4000){
        output.classList.remove('hidden');
        output.innerHTML = "Please enter a number less than or equal to 3999";
    }
    else{
        // Call the function to convert the number
        output.classList.remove('hidden');
        output.innerHTML = ArabicToRoman(number.value)
    //criar função para converter
}})

// Função para converter números Arabicos em arábicos
function ArabicToRoman(number) {
    const romanNumeral = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    let roman = "";

    for (let key in romanNumeral) {
        while (number >= romanNumeral[key]) {
            roman += key;
            number -= romanNumeral[key];
        }
    }
    return roman;
}