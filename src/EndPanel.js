

// Game States
// const GAME_IN_PROGRESS = 0;
const PLAYER_1_WIN = 1;
const PLAYER_2_WIN = 2;
const DRAW = 3;

function EndPanel(props) {
    let message;
     switch(props.gameState) {
         case PLAYER_1_WIN:
             message = "Player 1 won!";
             break;
         case PLAYER_2_WIN:
             message = "Player 2 won!";
             break;
         case DRAW:
             message = "It's a draw!";
             break;
         default:
             message = "Ooops, something went wrong :(";
             break;

     }
    return <div className={"panel"} style={{top: "200px", width:"300px", height:"200px", zIndex: "4", position: "relative"}}>
        <p>{message}</p>
        <div className={"button-holder"}>
            <div className={"button"} onClick={(event) => props.restart()}>Retry</div>
        </div>
     </div>
}

export default EndPanel;