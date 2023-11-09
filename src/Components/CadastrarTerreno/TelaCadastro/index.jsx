import styles from './TelaCadastro.module.sass'
import image from '../../../../public/image.png'
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

// Router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useState, useEffect } from 'react'

// Axios
import axios from "axios"

export default function Cadastro() {
    const navigate = useNavigate()

    const url = 'http://localhost:3000/terreno'
    const [terrenos, setTerrenos] = useState([])
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setTerrenos((response.data))
            })
            .catch(error => console.log(error))
    }, [terrenos])

    const id = terrenos.length + 1
    const nome = `Terreno #${terrenos.length + 1}`

    const handleSave = () => {
        axios.post('http://localhost:3000/terreno', {
            id: id,
            nome: nome,
            hectares: 42,
            cidade: 'Sorriso',
            estado: 'Mato Grosso',
            pais: 'Brasil',
            imagem: 'https://cataas.com/cat',
            latitude: '-20.329511',
            longitude: '-40.287098',
            clima: {
                temperaturaHoje: 28,
                temperaturaSuperficie: 22,
                temperaturaSoloAbaixo: 20,
                umidadeSolo: 0.1
            },
            ndvi: {
                max: 0.78,
                mean: 0.28,
                median: 0.20,
                min: 0.06,
                deviation: 0.21,
                num: 46773
            },
            uv: {
                max: 0.9,
                mean: 0.6,
                median: 0.58,
                min: 0.32,
                deviation: 0.21,
                num: 1238
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    

    return (
        <div className={styles.main}>
            <h1>Novo Terreno</h1>
            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={image} />
                </div>
                <div className={styles.form}>
                    <input type="text" placeholder='Nome' />
                    <input type="number" placeholder='Aréa (Em hectares)' />
                    <AlertDialog.Action>
                        <Button onClick={() => handleSave()}>Salvar</Button>
                    </AlertDialog.Action>
                </div>
            </div>
        </div>
    )
}
