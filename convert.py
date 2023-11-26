import json
import codecs

def transformFile(inputFile, outputFile):
    with codecs.open(inputFile, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    results = []

    for line in lines:
        line = line.strip()

        if line != "":
            user_input = input(line + " : ")

            if user_input == "--" : 
                results.append(["--", 0])
                user_input = input(line + " : ")

            results.append([line, int(user_input)])

            with open(outputFile, 'w', encoding='utf-8') as json_file:
                json.dump(results, json_file, indent=2, ensure_ascii=False)
        



if __name__ == "__main__":
    inputFile = "text.txt"
    outputFile = "resultats.json"

    transformFile(inputFile, outputFile)

