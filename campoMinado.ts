type square = {
    row : number;
    column : number;
    state : string;
    hasMine : boolean;
    nearMines : number;
}

const criarCampo = (linhas : number, colunas : number) : string[][] => {
    let campo : string[][] = [];
    for (let i : number = 0; i < linhas; i++) {
        let linhaArray : string[] = [];
        for (let j : number = 0; j < colunas; j++) {
            let novoSquare: string = `${i},${j}`;
            linhaArray.push(novoSquare);
        }
        campo.push(linhaArray);
    }
    return campo;
};

const sortearMinas = (campo, qtdMinas : number) : void=> {
    let linhas : number = campo.length;
    let colunas : number = campo[0].length;
    let minasColocadas : number = 0;

    while (minasColocadas < qtdMinas) {
        let linha : number = Math.floor(Math.random() * linhas);
        let coluna : number = Math.floor(Math.random() * colunas);

        if (!campo[linha][coluna].hasMine) {
            campo[linha][coluna].hasMine = true;
            minasColocadas++;
        }
    }
};

const contarMinasVolta = (campo, linha, coluna) : number=> {
    let linhas : number = campo.length;
    let colunas : number = campo[0].length;
    let qtdMinas : number = 0;

    for (let i : number = -1; i <= 1; i++) {
        for (let j : number = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            let novaLinha : number = linha + i;
            let novaColuna : number = coluna + j;

            if (novaLinha >= 0 && novaLinha < linhas && novaColuna >= 0 && novaColuna < colunas) {
                if (campo[novaLinha][novaColuna].hasMine) {
                    qtdMinas++;
                }
            }
        }
    }

    return qtdMinas;
};

const contarTotMinas = (campo) : number => {
    let linha : number = campo.length;
    let coluna : number = campo[0].length;
    let tot : number = 0;

    for(let i : number= 0; i < linha; i++){
        for(let j : number = 0; j < coluna; j++)
            tot += contarMinasVolta(campo, i, j)
    }
    return tot;
}

const imprimirMatriz = (campo) : void => {
    let linhas : number = campo.length;
    let colunas : number = campo[0].length;

    for (let i : number = 0; i < linhas; i++) {
        let linhaString : string = "";
        for (let j : number = 0; j < colunas; j++) {
            let square : square = campo[i][j];
            if (square.hasMine) {
                linhaString += "[*]";
            } else {
                if (square.nearMines === 0) {
                    linhaString += "[ ]";
                } else {
                    linhaString += `[${square.nearMines}]`;
                }
            }
        }
        console.log(linhaString);
    }
};

const campoMinado = criarCampo(10, 10);
sortearMinas(campoMinado, 10);
imprimirMatriz(campoMinado)
