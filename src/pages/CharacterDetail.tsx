// src/pages/CharacterDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";

interface CharacterDetailData {
	id: number;
	name: string;
	imageUrl: string;
	films: string[];
	sourceUrl: string;
}

const CharacterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	padding: 20px;
`;

const CharacterImage = styled.img`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	object-fit: cover;
	margin-bottom: 20px;
`;

const CharacterName = styled.h1`
	font-size: 24px;
	margin-bottom: 10px;
`;

const FilmList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	margin-top: 20px;
`;

const FilmItem = styled.div`
	background-color: white;
	color: #222;
	padding: 5px 10px;
	border-radius: 15px;
	font-size: 14px;
	text-align: center;
`;

const fetchCharacterDetail = async (id: string): Promise<CharacterDetailData> => {
	const res = await fetch(`https://disney_api.nomadcoders.workers.dev/characters/${id}`);
	return res.json();
};

const CharacterDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, error } = useQuery(["character", id], () => fetchCharacterDetail(id!));

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading character data.</p>;

	return (
		<CharacterContainer>
			<CharacterImage src={data?.imageUrl} alt={data?.name} />
			<CharacterName>{data?.name}</CharacterName>
			<h2>Films</h2>
			<FilmList>
				{data?.films.length ? data.films.map((film, index) => <FilmItem key={index}>{film}</FilmItem>) : <p>No films available</p>}
			</FilmList>
		</CharacterContainer>
	);
};

export default CharacterDetail;
