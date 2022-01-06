function Disc(props) {
    return <div className="disc" style={{backgroundColor: props.color, zIndex: props.zIndex, position:"absolute", top:10, left:10}}></div>;
}

export default Disc;