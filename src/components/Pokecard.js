import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { CARD_BG_COLOR, TYPE_BG_COLOR } from "../constants";

const Container = styled.article`
    padding: 16px 0;
    color: white;
    border-radius: 8px;
    background-color: ${({ firstType }) => CARD_BG_COLOR[firstType]};
    &:hover {
        cursor: pointer;
        filter: brightness(1.07)
    }
`

const Name = styled.h2`
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.75);
    &::first-letter {
        text-transform: uppercase;
    }
`

const Image = styled.img`
    width: 100%;
    height: auto;
`

const Types = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`

const TypeText = styled.span`
    padding: 3px 8px;
    border-radius: 5px;
    background-color: ${({ type }) => TYPE_BG_COLOR[type]};
`

function Pokecard(props) {
    const { url, openModal } = props

    const [pokemonDetails, setPokemonDetails] = useState(null)

    //Encontrar os dados do pokemon json para mockar através do console.log, colar a url da api do pokemon ex "https://pokeapi.co/api/v2/pokemon/18/" colar o endereço no navegador, copiar todo o conteudo e colar no arquivos js criado no projeto dentro do arquivo teste (pokecarMock.js) e criar um expor const "nome" = colar os dados copiados da url e salvar.
    // console.log('props', props)
    // console.log('url', url)
    // console.log("openModal", openModal)
    
    useEffect(() => {
        axios.get(url).then((response) => {
            setPokemonDetails(response.data)
        });
    }, [url]);

    if (!pokemonDetails) {
        return <p>Loading...</p>
    }

    const pokemonName = pokemonDetails.name
    const imageUrl = pokemonDetails.sprites.front_default
    const pokemonNumber = pokemonDetails.sprites.id
    const pokemonTypes = pokemonDetails.types.map(type => type.type.name)

    return (
        <Container firstType={pokemonTypes[0]} onClick={() => openModal(pokemonDetails)}>
            <Name>{pokemonName}</Name>
            
            <Image src={imageUrl} alt={pokemonName} />
            
            <Types>
                {pokemonTypes.map((type) => (
                    <TypeText key={pokemonNumber + type} type={type}>
                        {type}
                    </TypeText>
                ))}
            </Types>
        </Container>
    );
}

export default Pokecard;
