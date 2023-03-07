import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Pokecard from "../components/Pokecard";
import { pokeCardMock } from "./pokecardMock";

jest.mock("axios")

//Props Mockadas
const urlMock = "https://pokeapi.co/api/v2/pokemon/18/"

const openModalMock = jest.fn()

//Resposta do axios .getMockado
const axiosResponseMock ={
    data: pokeCardMock
}

describe("PokeCard.js", ()=>{
    // test("Tentar PokeCard renderiza", async ()=>{
    //     axios.get.mockResolvedValueOnce({
    //         data: pokeCardMock
    //     })

    //     render(<Pokecard
    //         url={urlMock}
    //         openModal={openModalMock}/>)
    //         screen.debug()

    //         await waitFor(() => {})
    //         screen.debug() 
    // })

    test("Card renderiza após carregamento", async()=>{
        axios.get.mockResolvedValueOnce({
            data: pokeCardMock
        })

        render(<Pokecard
            url={urlMock}
            openModal={openModalMock}/>)

            const loading = screen.getByText(/loading\.\.\./i)
            
            expect(loading).toBeInTheDocument()
            await waitFor(() => {
            const namePoke = screen.getByRole('heading', {name: /pidgeot/i})
            const imgPoke = screen.getByRole('img', {name: /pidgeot/i})
            const type1 = screen.getByText(/normal/i)
            const type2 = screen.getByText(/flying/i)
            
            expect(namePoke).toBeInTheDocument()
            expect(imgPoke).toBeInTheDocument()
            expect(type1).toBeInTheDocument()
            expect(type2).toBeInTheDocument()
            expect(loading).not.toBeInTheDocument()
        })
            // screen.logTestingPlaygroundURL()
    })
})


