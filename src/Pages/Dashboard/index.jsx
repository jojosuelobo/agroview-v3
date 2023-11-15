/* eslint-disable no-unused-vars */
import styles from './Dashboard.module.sass'
import image from '../../../public/image.png'
import vazio from '../../../public/empty.svg'

// Axios
import axios from "axios";

// React
import { useState, useEffect } from 'react'

// Icons
import { HiOutlineArrowsExpand } from 'react-icons/hi'
import { TiDeleteOutline } from 'react-icons/ti'
import { AiOutlineEdit } from 'react-icons/ai'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Components
import Deletar from '../../Components/DeletarTerreno';

//APIs
import { getPolygons } from '../../API/getPolygons';
import { getImages } from '../../API/getImagens';

export default function Dashboard() {

  //const urlApiMonitoring = 'http://localhost:3000/terreno'
  //const TOKEN = '4b7b5649b5da1e01de5366896e27eb72'
  //const urlApiMonitoring = `http://api.agromonitoring.com/agro/1.0/polygons?appid=${TOKEN}`
  const [urlImagemTerreno, setUrlImagemTerreno] = useState('')

  const [terrenos, setPolygons] = useState([])
  const [imagemTerrenos, setImagemTerrenos] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const polygonsData = await getPolygons();
  //     setTerrenos(polygonsData)
  // }}, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const polygonsData = await getPolygons();
  //       setPolygons(polygonsData);

  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData() 
  // }, []);


  // useEffect(() => {
  //   axios.get(urlImagemTerreno)
  //     .then(response => {
  //       //console.log(response.data)
  //       setImagemTerrenos({
  //         trueColor: response.data.image.truecolor,
  //         falsecolor: response.data.image.falsecolor,
  //         ndvi: response.data.image.ndvi,
  //         evi: response.data.image.evi,
  //         evi2: response.data.image.evi2,
  //         nri: response.data.image.nri,
  //         dswi: response.data.image.dswi,
  //         ndwi: response.data.image.ndwi,
  //       })
  //     })
  //     .catch(error => console.log(error))
  // }, [])

  // useEffect(() => {
  //   axios.get(urlApiMonitoring)
  //     .then(response => {
  //       console.log(response.data)

  //       // Mapeia os terrenos e atualiza o state terrenos
  //       setTerrenos(response.data)

  //       // Mapeia os terrenos para obter as URLs das imagens
  //       const imagensPromises = response.data.map(terreno => {
  //         const imageUrl = `http://api.agromonitoring.com/agro/1.0/image/search?start=1483218000&end=1700066763&polyid=${terreno.id}&appid=${TOKEN}`
  //         console.log(terreno.id)
  //         return axios.get(imageUrl)
  //       })

  //       // Executa todas as requisições em paralelo usando Promise.all
  //       Promise.all(imagensPromises)
  //         .then(imagensResponses => {
  //           // Mapeia as respostas das imagens e atualiza o state imagemTerrenos
  //           const novoImagemTerrenos = imagensResponses.reduce((acc, imagemResponse, index) => {
  //             const tipoImagem = Object.keys(imagemResponse.data)[0]
  //             acc[tipoImagem] = imagemResponse.data[tipoImagem].url
  //             return acc
  //           }, {})

  //           setImagemTerrenos(novoImagemTerrenos)
  //         })
  //         .catch(error => console.log(error))
  //     })
  //     .catch(error => console.log(error))
  // }, [])

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const polygonsData = await getPolygons();
        setPolygons(polygonsData);
        return polygonsData; // Retorne os dados para encadear o then
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propague o erro para interromper a execução
      }
    };
  
    const fetchData2 = async (polygonsData) => {
      try {
        const imagensPromises = polygonsData.map(terreno => getImages(terreno.id));
        const imagensResponses = await Promise.all(imagensPromises);
  
        console.log("AQUIII CARALHO")
        console.log(imagensResponses);
  
        const novoImagemTerrenos = imagensResponses.reduce((acc, imagemResponse, index) => {
          acc = { ...acc, ...imagemResponse };
          return acc;
        }, {});
  
        setImagemTerrenos(novoImagemTerrenos);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData1()
      .then(fetchData2)
      .catch(error => console.error('Erro durante o encadeamento:', error));
  }, []);

  const navigate = useNavigate()

  console.log(imagemTerrenos)

  return (
    <div className={styles.dashboard}>
      <div className={styles.list}>
        {terrenos.length === 0 ? (
          <img src={vazio} />
        ) : (
          terrenos.map((terreno) =>
            <div className={styles.terreno} key={terreno.id}>
              <nav>
                <HiOutlineArrowsExpand className={styles.icon} />
                <h1>{terreno.name}</h1>
                <div className={styles.crud}>
                  {/*<TiDeleteOutline className={styles.icon_delete} />*/}
                  <Deletar terreno={terreno} />
                  <AiOutlineEdit className={styles.icon_edit} />
                </div>
              </nav>
              <div className={styles.content}>
                {/* <img className={styles.imagem} src={terreno.imagem} /> */}
                <img className={styles.imagem} src={ imagemTerrenos.image.truecolor  } />
                <div className={styles.info}>
                  <p>Hectares: {terreno.area} ha</p>
                  <p>Temperatura:  ºC</p>
                  <p>{terreno.cidade}, {terreno.estado}</p>
                  <button className={styles.buttonOpen} onClick={() => navigate(`/terreno/${terreno.id}`)}>Exibir</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}
