import { CustomSquareProps } from "react-chessboard/dist/chessboard/types";
import { ReactElement, forwardRef, useContext } from "react";
import { OutsideCorners, CenterDot, SquareHighlight } from "./svg-components";
import { CustomSquareContext } from "./custom-square-context";

export const customSquareRenderer = forwardRef<
    HTMLDivElement,
    CustomSquareProps
>((props, ref) => {
    const { legalSquares, chess } = useContext(CustomSquareContext);

    let selectElement: ReactElement | null = null;
    let lastMoveHighlight: ReactElement | null = null;

    const lastMove = chess.getLastMove();
    if (
        lastMove !== undefined &&
        (lastMove.from === props.square || lastMove.to === props.square)
    ) {
        lastMoveHighlight = (
            <SquareHighlight
                height={props.style.height}
                width={props.style.width}
            />
        );
    }

    if (legalSquares.includes(props.square)) {
        // Square should be highlighted
        if (chess.getPiece(props.square) !== undefined) {
            // Square has a piece on it
            selectElement = (
                <OutsideCorners
                    height={props.style.height}
                    width={props.style.width}
                />
            );
        } else {
            //Square is empty
            selectElement = <CenterDot />;
        }
    }

    return (
        <div style={props.style} ref={ref}>
            {lastMoveHighlight}
            {selectElement}
            {props.children}
        </div>
    );
});
