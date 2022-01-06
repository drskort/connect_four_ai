import Cell from "./Cell";

function Board(props) {
    let element;
    for (let r = 0; r < props.rows; r++) {
        let row;
        for (let c = 0; c < props.columns; c++) {
            let state;
            switch(props.values[props.rows - r - 1][props.columns - c - 1]) {
                case 1:
                    state = "player1";
                    break;
                case 2:
                    state = "player2";
                    break;
                default:
                    state = "empty";
                    break;
            }
            row = [
                <td key={"d_" + r * props.columns + c}><Cell state={state} r={props.rows - r - 1} c={props.columns - c - 1}
                onClickCell={(r, c) => props.onClickCell(r, c)}/></td>,
                row
            ]
        }
        element = [
            <tr key={"r_" + r}>{row}</tr>,
            element
        ]
    }
    return <table style={{marginLeft: "auto", marginRight: "auto"}}><tbody>{element}</tbody></table>;
}

export default Board;