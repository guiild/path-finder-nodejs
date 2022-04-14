class PathFinder {
    /*Declaration du plateau de jeu
    */
   N = 8;

    /*  Declaration des valeurs en fonction des déplacement possibles
        up-up-right = -15 (position - (2*8) +1)
        up-up-left = -17 (position - (2*8) -1)
        down-down-right = 17 (position + (2*8) +1)
        down-down-left = 15 (position + (2*8) -1)
        right-right-up = -6 ((position +2) - (1*8) )
        right-right-down = 10 ((position+2) +(1*8))
        left-left-down = 6 ((position -2) + (1*8))
        left-left-up = -10 ((position -2 ) - (1*8))
    */
    MOVES = [((-2*this.N)+1), ((-2*this.N)-1),((2*this.N) +1),((2*this.N) -1), (2 -(1*this.N)), (2+(1*this.N)), (-2 + (1*this.N)), (-2 - (1*this.N))]

    /* On ajoute la position aux valeurs possible pour avoir la nouvelle position après le déplacement
        @function
        INPUT : 1) pos = la position depuis laquelle on va se déplacer
                2) MOVES = valeurs possible
        OUTPUT : resultMove = la nouvelle position en fonction du déplacement effectué
    */
    moveInAnydirection(pos, MOVES) {
        let resultMove = [];
        MOVES.forEach(num => {
            resultMove.push(num + pos)
        })
        return resultMove
    };

    /* Filtre en fonction des nouvelles positions , qui permet de retirer les positions hors plateau de jeu
        @Function
        INPUT : resultMove = la nouvelle position après avoir éfféctué un déplacement
        OUTPUT: resultMinusOutOfBounds = les positions possible qui ne se trouvent pas en dehors du plateau de jeu
    */
    sortOutOfBounds(resultMove) {
        let resultMinusOutOfBounds = [];
        resultMove.map((newPos => {
            if (newPos > (this.N*this.N)) return
            if (newPos < (this.N/this.N)) return
            resultMinusOutOfBounds.push(newPos)
        }))
        return resultMinusOutOfBounds
    };

    /* Filtre en fonction de la col de depart et des cols de la new pos, qui permet de retirer les positions hors de portée des mouvements associés
        @Function
        INPUT:  1) pos = la position depuis laquelle on va se déplacer
                2) resultMinusOfBounds = les positions possibles qui ne se trouvent pas en dehors du plateau de jeu
        OUTPUT: le résultat des valeurs possibles contenus dans resultMinusOfBounds mois les valeurs hors de portée des mouvements  
    */
    sortByCol(pos, resultMinusOutOfBounds) {
        // Calcul de la colonne en fonction de la position 
        let colPos = pos % this.N;
        // console.log({ colPos });
        switch (true) {
            case (colPos === (this.N / this.N)):
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % this.N === ((colPos + 1) % this.N) || newPos % this.N === ((colPos + 2) % this.N) // Left impossible, +2 right MAX
                }));
                break;
            case ((colPos) === (this.N / this.N) + 1):
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % this.N === ((colPos - 1) % this.N) || newPos % this.N === ((colPos + 1) % this.N) || newPos % this.N === ((colPos + 2) % this.N) // -1 Left Max, +2 Right Max
                }));
                break;
            case ((colPos) === (this.N - 1)):
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % this.N === ((colPos - 2) % this.N) || newPos % this.N === ((colPos - 1) % this.N) || newPos % this.N === ((colPos + 1) % this.N) // -2 Left max, +1 Right Max
                }));
                break;
            case ((colPos) === 0):
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % this.N === ((colPos + this.N - 2) % this.N) || newPos % this.N === ((colPos + this.N - 1) % this.N) // Right impossible , -2 Left Max
                }));
                break;
            default:
                return resultMinusOutOfBounds.filter((newPos => {
                    return newPos % this.N === ((colPos - 2) % this.N) || newPos % this.N === ((colPos - 1) % this.N) || newPos % this.N === ((colPos + 1) % this.N) || newPos % ((colPos + 2) % 8) === 5 // -2 Left Max, +2 Right Max
                }));
                break;
        };
    };

    /*Fonction qui prend le tableau des pos precedentes, applique les déplacements depuis chaque pos et filtre les résultats 
        @Function
        INPUT: prevPos = number ou array des positions precedentes depuis lesquelles on a pu se déplacer 
        OUTPUT: result = array contenant un array filtré par position
    */
    applyFilterPosByPos(prevPos) {
        let result = []
        // console.log({ prevPos });
        if (typeof prevPos !== "number") {
            prevPos.forEach((pos => {
                // console.log(pos);
                let newPos = (this.moveInAnydirection(pos, this.MOVES))
                // console.log({newPos});
                let newPosSortByOut = this.sortOutOfBounds(newPos)
                // console.log({pos,newPosSortByOut});
                let newPosSortByCol = this.sortByCol(pos, newPosSortByOut)
                // console.log({newPosSortByCol});
                result.push(newPosSortByCol)
            }))
        } else {
            let newPos = (this.moveInAnydirection(prevPos, this.MOVES))
            let newPosSortByOut = this.sortOutOfBounds(newPos)
            let newPosSortByCol = this.sortByCol(prevPos, newPosSortByOut)
            result.push(newPosSortByCol)
        }
        return result
    };

    /* function qui applatit les tableaux et supprime les doublons
        @Function
        INPUT: arr = array contenant les array filtrés
        OUTPUT: arrWithoutDouble = un array dans lequel les doublons de positions possibles ont été supprimés
    */
    flatAndDeleteDoubleValue(arr) {
        let flatArr = arr.flat(arr.length)
        let arrWithoutDouble = [...new Set(flatArr)]
        return arrWithoutDouble
    };

    /*  Function recursive qui simule les tours de jeu et incrémente un compteur a chaque tour jusqu'a arriver sur la cible finale
    @Function
    INPUT:  1) position = number ou array , position depuis laquelle faire les mouvements
            2) target = cible finale
            3) compteur = compteur permettant de connaitre le nombre de coups necessaire
            4) INITPOS = position initiale servant a logger la phrase de FIN
    OUTPUT: compteur = le nombre de coups qu'il a fallu pour atteindre la cible depuis notre position
    */
    game(position, target, compteur, INITPOS) {
        if (position == target) return 0;
        let filterMove = this.applyFilterPosByPos(position)
        let resultMove = this.flatAndDeleteDoubleValue(filterMove)
        console.log({ resultMove });
        if (resultMove.includes(target)) {
            console.log(`Le minimum de coup pour atteindre ${target} depuis ${INITPOS} est ${compteur} `)
            return compteur
        } else {
            compteur++
            return this.game(resultMove, target, compteur, INITPOS)
        }
    };

    /* function qui donne le resultat 
        @Function
        INPUT:  1) pos = position actuelle
                2) target = position sur laquelle on doit se retrouver
        OUTPUT: un nombre indiquant le nombre de coups possible pour arriver a la position target
    */
    getMinimumMoves = (position, target) => {
        const INITPOS = position
        let compteur = 1;
        return this.game(position, target, compteur, INITPOS)
    }
};

let myPathFinder = new PathFinder();
console.log(myPathFinder.getMinimumMoves(8, 57));


module.exports = PathFinder;
