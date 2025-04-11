import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { Savefile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    name: string;
    destination: string;
}


export class ServerApp {




    static run({base, limit, showTable, destination, name}: RunOptions ){
        console.log('Server running...');
        
        const table = new CreateTable().execute({base, limit})
        const wasSaved = new Savefile().execute({ fileContent: table, filename: name, path: destination })

        if (showTable) console.log(table);
        
    }

}



