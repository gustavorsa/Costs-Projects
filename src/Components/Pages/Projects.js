import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import Message from "../Layout/Message"
import Container from "../Layout/Container"
import Loading from "../Layout/Loading"
import LinkButton from "./LinkButton"
import ProjectCard from "../Project/ProjectCard"

import styles from "./Projects.module.css"

function Projects(){
    const [projects, setProjects] = useState([])//recebe os projetos criando um array
    const [removeLoading, setRemoveLoading] = useState(false) //Nesse vai ser usado para a tela de loading, vem false para não apresentar logo no inicio
    const [projectMessage, setProjectMessage] = useState('') //Nesse caso vai ser criado uma mensagem, para ser usado em mais de um local deixamos em branco

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout (() => { //usando o settimeout ele vai realizar uma requisição maior pra carregar a tela
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',//espera receber json
                },
            }).then((resp) => resp.json())//transoforma a resposta em json
            .then(data => {//pega os dados que são retornados para algo
                setProjects(data)
                console.log(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))//pega o erro para debugar
            }, 100)//Aqui milesegundos para carregamento da pagina
    }, [])

    function removeProjects(id) {/*Para remover é preciso usar o metodo de deletar, usando o then ele faz um filtro do ID do projeto e depois usando um evento associado no arquivo filho ele vai deletar
    A requisão usando o fetch contém o ID do projeto, caso contrarior ele vai dar 404 not found*/
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
        .then(data => {
            setProjects(projects.filter((projects) => projects.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err))
    }
    /*{projects.length > 0 &&
        projects.map((project)=> ( é uma arrow function, que recebe os projetos em project e passa para o componente que está sendo usado abaixo
            <ProjectCard name={project.name}/>
        ))}*/
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Novo Projeto"/>
            </div>
                {message && <Message type="success" msg={message}/>}
                {projectMessage && <Message type="success" msg={projectMessage}/>}
                <Container customClass="start">
                    {projects.length > 0 &&
                    projects.map((project)=> (
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProjects}
                        />
                    ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos</p>
                    )}
                </Container>
        </div>
    )
}

export default Projects