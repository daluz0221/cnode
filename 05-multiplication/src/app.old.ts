import * as fs from "fs"
import { yarg } from "./config/plugins/yargs.plugin";

console.log(yarg);

const { b:base, l:limit, s:show } = yarg




let outputMessage = '';
let header = `
============================================
Tabla del ${base}
============================================
`





// solución buena, pero acoplada, hace dos cosas en lugar de una, mostrar en pantalla y grabar, ademas del caclulo, son 3 cosas que hace
// for (let index = 1; index < 11; index++) {
//     console.log(`${multiply} x ${index} = ${multiply * index}`);
//     fs.appendFileSync(`output/tabla-${multiply}.txt`, `\n${multiply} x ${index} = ${multiply * index}`)
    
// }


for (let i = 1; i < limit + 1; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`
}

outputMessage = header + outputMessage

if (show) {
    console.log(outputMessage);
}

const outoputPath = `outputs`

fs.mkdirSync(outoputPath, { recursive:true })
fs.writeFileSync(`${outoputPath}/tabla-${base}.txt`, outputMessage);
console.log('File created.');




