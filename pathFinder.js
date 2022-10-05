class PathFinder {
    getMinimumMoves = (position, target) => {
        let minMoves = 0;
        //si on n'a pas à bouger...
        if (position === target) {
            return minMoves;
        }
        //Il faut imaginer la grille de la table de 8 comme un tableau, à deux indices.
        //la colonne est l'indice col, la ligne est l'indice row
        let col = Math.floor((position - 1) / 8);
        let row = (position - 1) % 8;
        //L'endroit où l'on souhaite aller :
        let colTarget = Math.floor((target - 1) / 8);
        let rowTarget = (target - 1) % 8;
        //On avance jusqu'aux cas particuliers :
        while ((col < colTarget - 2 || col > colTarget + 2) || (row < rowTarget - 2 || row > colTarget + 2)) {
            //Il faut bouger
            //Le cavalier peut exécuter 8 mouvements différents. On va voir lequel est le plus adapté :
            //Haut ou bas ?
            let haut = (rowTarget - row > 0) ? false : true;
            if (rowTarget === row && row === 0) {
                //Cas particulier, on ne peut pas monter si on est sur la ligne du haut
                haut = false;
            }
            //Gauche ou droite ?
            // let gauche;
            let gauche = (colTarget - col > 0) ? false : true;
            if (colTarget === col && col === 0) {
                gauche = false;
            }
            //Nous avons nos directions haut et gauche, nous avons donc écarté 6 des 8 possibilités.
            //Reste à choisir laquelle des 2 est la plus adaptée
            if (Math.abs(rowTarget - row) > Math.abs(colTarget - col)) {
                //On monte ou on descend de 2 lignes
                row = (haut) ? row - 2 : row + 2;
                (gauche) ? col-- : col++;
            } else {
                //On se déplace à gauche ou à droite de 2 lignes
                col = (gauche) ? col - 2 : col + 2;
                (haut) ? row-- : row++;
            }
            //Ici, il est inutile de tester (Math.abs(rowTarget - row) === Math.abs(colTarget - col)) car les deux déplacements peuvent convenir
            //On incrémente
            minMoves++;
        }
        //Cas particuliers : nous sommes à proximité de la cible, on peut déterminer exactement selon les cas combien il reste de coups
        if (
            //Diagonales à 2 cases d'écart
            (Math.abs(rowTarget - row) === 2 && Math.abs(colTarget - col) === 2) ||
            //Sur la même ligne (ou même colonne) à 1 case d'écart
            (
                (Math.abs(rowTarget - row) === 1 && colTarget === col) ||
                (Math.abs(colTarget - col) === 1 && rowTarget === row)
            )
        ) {
            minMoves = minMoves + 3;
        } else if (
            //Sur la même ligne (ou même colonne) à 2 cases d'écart
            (
                (Math.abs(rowTarget - row) === 2 && colTarget === col) ||
                (Math.abs(colTarget - col) === 2 && rowTarget === row)
            ) ||
            //Diagonales à 1 case d'écart
            (Math.abs(rowTarget - row) === 1 && Math.abs(colTarget - col) === 1)
        ) {
            minMoves = minMoves + 2;
        } else if (
            //Sur les cases menant directement à la cible
            (Math.abs(rowTarget - row) === 2 && Math.abs(colTarget - col) === 1) ||
            (Math.abs(rowTarget - row) === 1 && Math.abs(colTarget - col) === 2)
        ) {
            minMoves++;
        }
        return minMoves;
    }
}

module.exports = PathFinder;