import { readFileSync } from "https://deno.land/std@0.168.0/node/fs.ts";
import { FileSystem } from "./tree.mjs";

function isCommand(output) {
	return output.split(" ").at(0) === "$";
}
function getCommandDetails(output) {
	const commandSections = output.split(" ");
	const details = {
		type: commandSections.at(1),
		argument: commandSections.at(-1),
	};
	return details;
}
const CHANGE_DIR = "cd";
// BUILD A SIMPLE TREE WHERE EACH NODE REPRESENTS A DIRECTORY AND EACH NODE KNOWS THE FILES AND DIRS IT CONTAINS
/* Each node has:
    id - an identifier which is the directory it represents.
    filesList - an array of files in it, where each file is an object with a name and size.
    dirsList - an array of dirs contained in the node where each item is an object with a name and size.
    dirNodes - an object which links the directories it contains (by id) to its node. 
    parentNode - parent node || null for root dir
    size - size in bytes of the directory
/

/* // LOGIC FOR BUILDING TREE
FOR EACH OUTPUT - CHECK IF ITS A COMMAND:
    IF YES
        KEEP TRACK OF THE COMMAND TYPE - cd | ls
            IF COMMAND TYPE IS 'cd':
                IF ARGUMENT IS '..':
                    ADD DIRECTORY DATA TO 'dirList' of parent node
                    UPDATE 'dirSizes' of fileSystem with size of current directory
                    GO BACK UP ONE NODE
                ELSE:
                    CREATE A NODE REPRESENTING THE DIRECTORY
                    ADD NEW NODE (DIRECTORY) TO THE 'dirs' PROPERTY OF CURRENT NODE AND MOVE TO IT.
    ELSE (not command, list of files and dir)
        FOR EACH ITEMS IN THE DIR:
            IF ITEM IS A FILE:
                ADD ITS INFO TO filesList of the current node.
*/
const textDecoder = new TextDecoder();
const rawData = readFileSync("./input.txt");
const input = textDecoder.decode(rawData);
const outputList = input.split("\r\n");
const fileSystem = new FileSystem("/");
outputList.forEach((output, index) => {
	if (isCommand(output)) {
		const { type, argument } = getCommandDetails(output);
		if (type === CHANGE_DIR) {
			switch (argument) {
				case "/":
					break;
				case "..":
					fileSystem.moveUp();
					break;
				default:
					fileSystem.addDir(argument);
					fileSystem.moveToDir(argument);
					break;
			}
		}
	} else {
		const outputSections = output.split(" ");
		const showingFileData = outputSections.at(0) !== "dir";
		if (showingFileData) {
			fileSystem.currentNode.filesList.push({
				name: outputSections.at(1),
				size: +outputSections.at(0),
			});
		}
		if (index === outputList.length - 1) {
			fileSystem.moveToRoot();
		}
	}
});

const filteredDirs = Object.keys(fileSystem.dirsSize).filter((dirID) => {
	return fileSystem.dirsSize[dirID] <= 100000;
});
let filteredDirsSizeSum = 0;
filteredDirs.forEach((dir) => {
	filteredDirsSizeSum += fileSystem.dirsSize[dir];
});
console.log(filteredDirsSizeSum);
