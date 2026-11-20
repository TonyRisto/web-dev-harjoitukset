function evenNumbers(limit) {
    const evenNumbers = [];
    let number = Number(limit);
    
    for (let i = 0; i <= number; i++) {
        if (i % 2 == 0) {
            evenNumbers.push(i);
        }
    }
}