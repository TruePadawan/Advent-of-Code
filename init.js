import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

export default function readInput(filePath, inputFileName = "input.txt") {
	const __filename = fileURLToPath(filePath);
	const __dirname = dirname(__filename);
	return readFileSync(join(__dirname, inputFileName), "utf8").toString();
}