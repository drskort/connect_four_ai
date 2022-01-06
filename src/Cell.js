import Disc from "./Disc";

function Cell(props) {
    let color;
    switch(props.state) {
        case "player1":
            color="#4ECDC4";
            break;
        case "player2":
            color="#FF6B6B";
            break;
        default:
            color="#FFFFFF";
            break;
    }
    return <div style={{position: "relative", width: "100px", height: "100px"}} onClick={(event) => props.onClickCell(props.r, props.c)}>
        <div className="slot" style={{backgroundColor: "#292F36", position:"absolute", top:0, left:0, zIndex:-2}}></div>
        <Disc color={color} zIndex={2}/>
    </div>;
}

export default Cell;