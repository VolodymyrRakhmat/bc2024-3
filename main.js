const { program } = require('commander');
const fs = require('node:fs');

function max(data){
    let max = data[0].rate_per_unit;
    for (let i = 0; i < data.length; i++) {
        if (data[i].rate_per_unit > max) max = data[i].rate_per_unit;
    }
    return max
}

program
    .option('-i, --input <path>', 'read data from the file')
    .option('-o, --output <path>', 'write result to the file')
    .option('-d, --display', 'display result in console');

program.parse()

const options = program.opts();

if (options.input == undefined) console.log("Please, specify input file")
else {
    try {
        const data = JSON.parse(fs.readFileSync(options.input, 'utf8')); 
        if (options.output != undefined) fs.writeFileSync(options.output, String(max(data)));
        if (options.display) console.log(max(data));
    }
    catch (err) { 
        console.log('Cannot find input file');
    }
}