import './CapturedPieces.css'

interface Props {
    image?: string;
    className: string;
}

export default function CapturedPieces({ image }: Props) {
    
    return (
        <div className="CapturedPiece">
            {image && <div style={{ backgroundImage: `url(${image})` }} className="capturedChessPiece"></div>}
        </div>
    );


}