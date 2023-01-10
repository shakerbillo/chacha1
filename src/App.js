import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

const playingCards = [
	{ src: 'img/ace.png', match: false },
	{ src: 'img/jack.png', match: false },
	{ src: 'img/diamond.png', match: false },
	{ src: 'img/king.png', match: false },
	{ src: 'img/heart.png', match: false },
	{ src: 'img/queen.png', match: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false)

	// shuffling card
	const shuffledCard = () => {
		const shuffledCards = [...playingCards, ...playingCards]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({
				...card,
				id: Math.random(),
			}));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	};

	// handle choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	// reset choices and increase turn
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false)
	};

 
	// game reset
	useEffect(() => {
		shuffledCard()
	}, [])




	// compare 2 selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, match: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				setTimeout(() => {
					resetTurn();
				}, 1000);
			}
		}
	}, [choiceOne, choiceTwo]);
	console.log(cards);

	return (
		<div className="App">
			<h1>CHACHA</h1>
			<button onClick={shuffledCard}>New Game</button>

			<div className="card-grid">
				{cards.map((card) => (
					<SingleCard
						card={card}
						key={card.id}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.match}
						disabled={disabled}
					/>
				))}
				
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
