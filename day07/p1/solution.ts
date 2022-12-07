import * as fs from 'fs';

interface File {
    name: string,
    size: number
};

class Folder {
    files: Array<File>;
    folders: Map<string, Folder>;
    parentFolder: Folder;
    name: string;
    size: number;

    constructor(foldername: string) {
        this.name = foldername;
        this.files = [];
        this.folders = new Map();
        this.parentFolder = null;
        this.size = -1;
    }

    getSize(): number {
        if (this.size < 0) {
            let size = 0;
            for (let file of this.files) {
                size += file.size;
            }
            for (let folder of this.folders.values()) {
                size += folder.getSize();
            }
            this.size = size;
        }
        return this.size;
    }
}

fs.readFile("/dev/AOC_22/day07/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let con_lines = data.split('\n');
    let rootFolder = new Folder("Root");
    let currentFolder = rootFolder;
    let flatFolders = [];
    // First line is CD into root
    for (let i = 1; i < con_lines.length; i++) {
        let line = con_lines[i];
        if (line === "$ ls") {
            // populate current folder
            line = con_lines[i+1];
            while (line && !line.startsWith("$")) {
                let splitline = line.split(" ");
                if (line.startsWith("dir")) {
                    //console.log(`Adding folder ${splitline[1]} to ${currentFolder.name}`);
                    let newFolder = new Folder(splitline[1]);
                    newFolder.parentFolder = currentFolder;
                    currentFolder.folders.set(splitline[1], newFolder);
                    flatFolders.push(newFolder);
                }
                else {
                    //console.log(`Adding file ${splitline[1]} to ${currentFolder.name}`);
                    let file = {
                        "size" : parseInt(splitline[0], 10),
                        "name" : splitline[1] 
                    };
                    currentFolder.files.push(file);
                }
                i++;
                if (i >= con_lines.length) {
                    break;
                }
                line = con_lines[i+1];
            }
        }
        else if (line.startsWith("$ cd ")) {
            let target = line.split(" ")[2];
            console.log(`Change target to ${target}`)
            if (target === "/") {
                currentFolder = rootFolder;
            }
            else if (target === "..") {
                currentFolder = currentFolder.parentFolder;
            }
            else {
                currentFolder = currentFolder.folders.get(target);
            }
        }
    }

    //console.log(JSON.stringify(rootFolder, null, 2))
    let sizeSum = 0;
    flatFolders.map((folder) => {
        if (folder.getSize() <= 100000) {
            sizeSum += folder.getSize();
        }
    });
    console.log(`Sum of size of folders at most 100000 is ${sizeSum}`)

});