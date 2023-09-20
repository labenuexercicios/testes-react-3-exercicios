/* Exercício 2
Agora crie testes para garantir a renderização dos elementos do Pokecard (não precisa testar interação).
Lembre-se de mockar o axios! */

import axios from "axios";
import { pokemonMock } from "./PokemonMock";
import Pokecard from "../components/Pokecard";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("axios"); // Mock da biblioteca axios

const urlMock = "www.urlmock.com/bulbasaur-mock";
const openModalMock = jest.fn(); // Função de mock para abrir o modal

// Recebemos a resposta dentro do data. Lembram? res.data
const axiosResponseMock = {
    data: pokemonMock
}

describe("Testando Pokecard", () => {

    test("Deve renderizar Pokecard", async () => {
        // Mock da chamada para axios.get, retornando a resposta pré-definida
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        // Renderiza o componente Pokecard com os parâmetros de URL e função de abertura de modal
        render(<Pokecard url={urlMock} openModal={openModalMock} />);

        // Verifica se os dados estão renderizados na tela após a espera
        await waitFor(() => {
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        });
    });

    test("Deve abrir o modal", async () => {
        const user = userEvent.setup();

        // Mock da chamada para axios.get, retornando a resposta pré-definida
        axios.get.mockResolvedValueOnce(axiosResponseMock);

        // Renderiza o componente Pokecard com os parâmetros de URL e função de abertura de modal
        render(<Pokecard url={urlMock} openModal={openModalMock} />);

        // Espera pela renderização dos dados na tela
        await waitFor(() => { });

        // Log para debug e entender o ciclo de vida da aplicação
        screen.debug();
        screen.logTestingPlaygroundURL();

        // Seleciona o card do Pokecard
        const card = screen.getByRole('article');

        // Simula o clique no card para abrir o modal
        await user.click(card);

        // Verifica se a função de abertura de modal foi chamada uma vez
        expect(openModalMock).toHaveBeenCalledTimes(1);
    });
});
