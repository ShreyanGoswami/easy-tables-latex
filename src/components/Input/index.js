import React, { createRef, useState } from "react";
import { Wrapper, Content } from "./Input.styles";

const Input = () => {

    const input = createRef();
    const output = createRef();
    const tableName = createRef();

    const [delimiter, setDelimiter] = useState(",");

    const generateCode = () => {
        const data = input.current.value;
        let generatedCode = "\\begin{table}\n";
        const info = data.split("\n");
        const columnInfo = info[0].split(delimiter);
        const numberOfColumns = columnInfo.length;
        generatedCode += `\t\\caption{${tableName.current.value !== '' ? tableName.current.value : 'Table name'}}\n`
        generatedCode += "\t\\begin{tabular}{"
        // generate the number of columns
        for (let i = 0; i < numberOfColumns; i++) {
            if (i !== numberOfColumns - 1)
                generatedCode += "c|"
            else {
                generatedCode += "c}\n"
            }
        }
        generatedCode += "\t\\hline\\hline\n\t\t";
        // generate column names
        for (let i = 0; i < numberOfColumns; i++) {
            if (i !== numberOfColumns - 1)
                generatedCode += `${columnInfo[i]} & `
            else {
                generatedCode += `${columnInfo[i]} \\\\\n`
            }
        }
        generatedCode += "\t\t\\hline\n"
        // Generate the data for the table
        for (let i = 1; i < info.length; i++) {
            const row = info[i].split(delimiter);
            generatedCode += "\t\t"
            for (let j = 0; j < row.length; j++) {
                if (j !== row.length - 1) {
                    generatedCode += `${row[j]} & `;
                } else {
                    generatedCode += `${row[j]} \\\\\n`;
                }
            }
        }
        generatedCode += "\t\\hline\n\t\\end{tabular}\n\\end{table}"
        console.log(generatedCode);
        output.current.value = generatedCode;
    }

    return (
        <Wrapper>
            <Content>
                <input type="text" placeholder="Enter name of table" ref={tableName}></input>
                <textarea ref={input} />
                <button onClick={generateCode}>Create</button>
                <textarea ref={output}></textarea>
            </Content>
        </Wrapper>
    )
}

export default Input;
