const depth = 6;

let visitedNodesAB = 0;
let visitedNodes = 0;
const useAlphaBeta = true;

function nextTurn(values) {
    let max = -Number.MAX_VALUE;
    let bestC = 0;
    for (let c = 0; c < values[0].length; c++) {
        if (values[0][c] !== 0) continue;
        let val = (useAlphaBeta)? alphaBeta(makeTurn(values, c, 2), -Number.MAX_VALUE, Number.MAX_VALUE, depth, false) : minimax(makeTurn(values, c, 2), depth, false);
        if (val > max) {
            max = val;
            bestC = c;
        }
    }
    if (useAlphaBeta) console.log("Nodes visited: " + visitedNodes + ", value: " + max);
    else console.log("Nodes visited: " + visitedNodesAB + ", value: " + max);
    visitedNodesAB = 0;
    visitedNodes = 0;
    return bestC;
}

function alphaBeta(values, alpha, beta, depth, max) {
    visitedNodesAB++;
    values = values.map(function(arr) {
        return arr.slice();
    });
    if (depth === 0 || checkWin(values)) {
        return evaluate(values);
    } else if (max) {
        let value = -Number.MAX_VALUE;
        for (let c = 0; c < values[0].length; c++) {
            if (values[0][c] !== 0) continue;
            value = Math.max(value, alphaBeta(makeTurn(values, c, 2), alpha, beta, depth - 1, false));
            alpha = Math.max(value, alpha);
            if (value >= beta) {
                break;
            }
        }
        return value;
    } else {
        let value = Number.MAX_VALUE;
        for (let c = 0; c < values[0].length; c++) {
            if (values[0][c] !== 0) continue;
            value = Math.min(value, alphaBeta(makeTurn(values, c, 1), alpha, beta,depth - 1, true));
            beta = Math.min(value, beta);
            if (value <= alpha) {
                break;
            }
        }
        return value;
    }
}

function minimax(values, depth, max) {
    visitedNodes++;
    values = values.map(function(arr) {
        return arr.slice();
    });
    if (depth === 0 || checkWin(values)) {
        return evaluate(values);
    } else if (max) {
        let value = -Number.MAX_VALUE;
        for (let c = 0; c < values[0].length; c++) {
            if (values[0][c] !== 0) continue;
            value = Math.max(value, minimax(makeTurn(values, c, 2), depth - 1, false));
        }
        return value;
    } else {
        let value = Number.MAX_VALUE;
        for (let c = 0; c < values[0].length; c++) {
            if (values[0][c] !== 0) continue;
            value = Math.min(value, minimax(makeTurn(values, c, 1), depth - 1, true));
        }
        return value;
    }
}

// Return board after a player put
function makeTurn(values, c, player) {
    let newValues = values.map(function(arr) {
        return arr.slice();
    });
    let i = values.length - 1;
    while(i > 0 && values[i][c] !== 0) {
        i--;
    }
    newValues[i][c] = player;
    return newValues;
}

// Returns true if at least one of the players won
function checkWin(values) {
    let betterValues = values.map(function(arr) {
        return arr.slice();
    });
    // Transform Values
    for (let r = 0; r < values.length; r++) {
        for (let c = 0; c < values[0].length; c++) {
            let val = 0;
            if (values[r][c] === 2) val = 1;
            if (values[r][c] === 1) val = -1;
            betterValues[r][c] = val;
        }
    }
    // Verticals
    for (let r = 0; r < values.length - 3; r++) {
        for (let c = 0; c < values[0].length; c++) {
            let neighbors = betterValues[r][c] + betterValues[r+1][c] + betterValues[r+2][c] + betterValues[r+3][c];
            if (neighbors === 4 || neighbors === -4 ) return true ;
        }
    }
    // Horizontals
    for (let r = 0; r < values.length; r++) {
        for (let c = 0; c < values[0].length - 3; c++) {
            let neighbors = betterValues[r][c] + betterValues[r][c+1] + betterValues[r][c+2] + betterValues[r][c+3];
            if (neighbors === 4 || neighbors === -4 ) return true ;
        }
    }
    // Diagonals TL
    for (let r = 0; r < values.length - 3; r++) {
        for (let c = 0; c < values[0].length - 3; c++) {
            let neighbors = betterValues[r][c] + betterValues[r+1][c+1] + betterValues[r+2][c+2] + betterValues[r+3][c+3];
            if (neighbors === 4 || neighbors === -4 ) return true ;
        }
    }
    // Diagonals TR
    for (let r = 0; r < values.length - 3; r++) {
        for (let c = 0; c < values[0].length - 3; c++) {
            let neighbors = betterValues[r][c+3] + betterValues[r+1][c+2] + betterValues[r+2][c+1] + betterValues[r+3][c];
            if (neighbors === 4 || neighbors === -4 ) return true ;
        }
    }
    return false;
}

// Evaluation function for a board
function evaluate(values, max) {
    let sum = 0;
    let betterValues = values.map(function(arr) {
        return arr.slice();
    });
    let minWin = false;
    let maxWin = false;

    // Transform Values
    for (let r = 0; r < values.length; r++) {
        for (let c = 0; c < values[0].length; c++) {
            let val = 0;
            if (values[r][c] === 2) val = 1;
            if (values[r][c] === 1) val = -1;
            betterValues[r][c] = val;
        }
    }
    // Verticals
    for (let r = 0; r < values.length - 3; r++) {
        for (let c = 0; c < values[0].length; c++) {
            let neighbors = betterValues[r][c] + betterValues[r+1][c] + betterValues[r+2][c] + betterValues[r+3][c];
            let maxOpportunity = Math.min(betterValues[r][c], betterValues[r+1][c], betterValues[r+2][c], betterValues[r+3][c]) === 0;
            let minOpportunity = Math.max(betterValues[r][c], betterValues[r+1][c], betterValues[r+2][c], betterValues[r+3][c]) === 0
            if (neighbors === 4) maxWin = true;
            if (neighbors === -4) minWin = true;
            if (!maxOpportunity || !minOpportunity) sum += score(neighbors);
        }
    }
    // Horizontals
    for (let r = 0; r < values.length; r++) {
        for (let c = 0; c < values[0].length - 3; c++) {
            let neighbors = betterValues[r][c] + betterValues[r][c+1] + betterValues[r][c+2] + betterValues[r][c+3];
            let maxOpportunity = Math.min(betterValues[r][c], betterValues[r][c+1], betterValues[r][c+2], betterValues[r][c+3]) === 0;
            let minOpportunity = Math.max(betterValues[r][c], betterValues[r][c+1], betterValues[r][c+2], betterValues[r][c+3]) === 0;
            if (neighbors === 4) maxWin = true;
            if (neighbors === -4) minWin = true;
            if (!maxOpportunity || !minOpportunity) sum += score(neighbors);
        }
    }
    // Diagonals TL
    for (let r = 0; r < values.length - 3; r++) {
        for (let c = 0; c < values[0].length - 3; c++) {
            let neighbors = betterValues[r][c] + betterValues[r+1][c+1] + betterValues[r+2][c+2] + betterValues[r+3][c+3];
            let maxOpportunity = Math.min(betterValues[r][c], betterValues[r+1][c+1], betterValues[r+2][c+2], betterValues[r+3][c+3]) === 0;
            let minOpportunity = Math.max(betterValues[r][c], betterValues[r+1][c+1], betterValues[r+2][c+2], betterValues[r+3][c+3]) === 0;
            if (neighbors === 4) maxWin = true;
            if (neighbors === -4) minWin = true;
            if (!maxOpportunity || !minOpportunity) sum += score(neighbors);
        }
    }
    // Diagonals TR
    for (let r = 0; r < values.length - 3; r++) {
        for (let c = 0; c < values[0].length - 3; c++) {
            let neighbors = betterValues[r][c+3] + betterValues[r+1][c+2] + betterValues[r+2][c+1] + betterValues[r+3][c];
            let maxOpportunity = Math.min(betterValues[r][c+3], betterValues[r+1][c+2], betterValues[r+2][c+1], betterValues[r+3][c]) === 0;
            let minOpportunity = Math.max(betterValues[r][c+3], betterValues[r+1][c+2], betterValues[r+2][c+1], betterValues[r+3][c]) === 0;
            if (neighbors === 4) maxWin = true;
            if (neighbors === -4) minWin = true;
            if (!maxOpportunity || !minOpportunity) sum += score(neighbors);
        }
    }

    if (maxWin && minWin) {
        if (max) return Number.MAX_VALUE;
        else return -Number.MAX_VALUE;
    }
    if (minWin) return -Number.MAX_VALUE;
    if (maxWin) return Number.MAX_VALUE;
    return sum;
}

// Returns a score based on the number of neiugbours
function score(neighbors) {
    switch (neighbors) {
        case -3:
            return -4;
        case -2:
            return -2;
        case -1:
            return -1;
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
            return 4;
        default:
            return 0;
    }
}

export default nextTurn;