const fs = require('fs');
const acorn = require('acorn');

// 1. Load the target code string
const code = fs.readFileSync('Sample.js', 'utf8');

console.time('Acorn Lexer Execution Time');

// 2. Initialize Acorn's tokenizer
const tokenizer = acorn.tokenizer(code, { ecmaVersion: 2020 });
const tokens = [];

// 3. Loop through and extract all tokens
try {
    while (true) {
        const token = tokenizer.getToken();
        if (token.type === acorn.tokTypes.eof) break;
        
        tokens.push({
            type: token.type.label,
            value: token.value,
            start: token.start,
            end: token.end
        });
    }
} catch (err) {
    console.error("Syntax Error detected by Acorn:", err.message);
}

console.timeEnd('Acorn Lexer Execution Time');

// 4. Output the results
console.log(`\nTotal Tokens Found: ${tokens.length}`);
console.log('Sample of first 3 tokens:', tokens.slice(0, 3));