
import './Tile.css'

interface Props {
    image?: string;
    number: number;
    mark?: boolean;
    selected?: boolean;
    x: number;
    y: number;   
}




export default function Tile({ number, image, mark, selected, x,y }: Props) {
    const className: string = ["tile", number % 2 === 0 && "black-tile", number % 2 !== 0 && "white-tile", mark && "tile-mark", image && "piece-tile"].filter(Boolean).join(' ');
    
    


    return (
        <div className={className} data-key={x} data-set={y} >
            {image && <div style={{ backgroundImage: `url(${image})` }} className="chessPiece"></div>} 
        </div>
    );


}