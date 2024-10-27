// src/pages/Home.tsx
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Character {
	id: number;
	name: string;
	imageUrl: string;
}

const CharacterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20px;
	padding: 20px;
`;

const CharacterCard = styled.div`
	text-align: center;
	border: 1px solid #ccc;
	padding: 20px;
	border-radius: 10px;
	background-color: #222;
	color: white;
	height: 250px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	transition: background-color 0.3s ease, color 0.3s ease; /* 애니메이션 추가 */

	&:hover {
		background-color: white;
		color: #222; /* 텍스트 색상도 변경 */
	}
`;

const CharacterImage = styled.img`
	width: 200px;
	height: 200px;
	border-radius: 50%; /* 원형 이미지 */
	object-fit: cover; /* 이미지 비율 유지 */
`;

const fetchCharacters = async (): Promise<Character[]> => {
	const res = await fetch("https://disney_api.nomadcoders.workers.dev/characters");
	return res.json();
};

const Home: React.FC = () => {
	const { data, isLoading, error } = useQuery("characters", fetchCharacters);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading data.</p>;

	return (
		<CharacterGrid>
			{data?.map((character) => (
				<Link to={`/character/${character.id}`} key={character.id}>
					<CharacterCard>
						<CharacterImage src={character.imageUrl} alt={character.name} />
						<p>{character.name}</p>
					</CharacterCard>
				</Link>
			))}
		</CharacterGrid>
	);
};

export default Home;
