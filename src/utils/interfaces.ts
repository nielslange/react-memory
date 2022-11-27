export interface ButtonProps {
	number?: number;
	iconPack?: string;
}

export interface ControlsProps {
	shuffleCards: ( { number, iconPack }: ButtonProps ) => void;
	number?: number;
	iconPack?: string;
}

export interface ImageProps {
	difficulty: string;
	src: string;
	matched: boolean;
	id?: number;
}

export interface CardProps {
	card: ImageProps;
	handleChoice: ( card: ImageProps ) => void;
	flipped: boolean;
	disabled: boolean;
	matched: boolean;
}

export interface BoardProps {
	cards: ImageProps[];
	choiceOne: ImageProps;
	choiceTwo: ImageProps;
	handleChoice: ( card: ImageProps ) => void;
	disabled: boolean;
}
