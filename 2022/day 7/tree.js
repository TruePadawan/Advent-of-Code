import { createUID } from "../../../utils/utils.js";

export class FileSystemNode {
	id;
	name;
	filesList = [];
	dirsList = [];
	dirNodes = {};
	parentNode = null;
	constructor(_name, parent = null) {
		this.id = createUID(4);
		this.name = _name;
		this.parentNode = parent;
	}
	getSize() {
		let size = 0;
		this.filesList.forEach((file) => (size += file.size));
		this.dirsList.forEach((dir) => (size += dir.size));
		return size;
	}
}

export class FileSystem {
	rootNode = new FileSystemNode(null);
	currentNode = new FileSystemNode(null);
	dirsSize = {};
	constructor(rootDirName) {
		this.rootNode = new FileSystemNode(rootDirName);
		this.currentNode = this.rootNode;
	}
	addDir(dirName) {
		const dirNode = new FileSystemNode(dirName, this.currentNode);
		this.currentNode.dirNodes[dirName] = dirNode;
	}
	moveToDir(dirName) {
		this.currentNode = this.currentNode.dirNodes[dirName];
	}
	moveUp() {
		const currentDirSize = this.currentNode.getSize();
		const atRootNode = this.currentNode.parentNode === null;
		if (!atRootNode) {
			this.currentNode.parentNode.dirsList.push({
				name: this.currentNode.name,
				size: currentDirSize,
			});
		}
		this.dirsSize[this.currentNode.id] = currentDirSize;
		this.currentNode = this.currentNode.parentNode;
	}
	moveToRoot() {
		while (this.currentNode !== null) {
			this.moveUp();
		}
		this.currentNode = this.rootNode;
	}
}
