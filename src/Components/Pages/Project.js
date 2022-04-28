import { parse, v4 as uuidv4} from 'uuid'//importa um gerador de ID

import styles from './Project.module.css'

import Loading from '../Layout/Loading'
import Container from '../Layout/Container'
import ProjectForm from '../Project/ProjectForm'
import Message from '../Layout/Message'
import Services from '../Services/Services'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ServicesCard from '../Services/ServicesCard'

function Project() {
    const {id} = useParams()//vai dizer ao router que ele deve selecionar o ID que for informado nos projects

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
        .then((resp) => resp.json())//No primeiro then ele resgata a requisição e transforma em um objeto
        .then(data => {//no segundo é pego o objeto e pode acessar os dados
            setProject(data)
            setServices(data.services)//recebendo o objeto é preciso acessar o elementro dentro dele
        })
        .catch((err) => console.log(err))
        }, 0);
    }, [id])

    function editPost(project) {
        setMessage('')//serve para iniciar com a mensagem em branco, assim toda vez que editar ele muda o estado e apresenta a mensagem
        //budget validation
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false //vai parar as alteraçoes
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', //metodo usado para atualizar apenas oque está sendo alterado no projeto
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project), //enviando um json para o banco de dados
            })
        .then((resp) => resp.json())//No primeiro then ele resgata a requisição e transforma em um objeto json
        .then(data => {//no segundo é pego o objeto em json e pode manipular os dados
            setProject(data)//atualiza os dados na tela
            setShowProjectForm(false)//vai esconder o formulario assim que terminar a edição
            //mensagem
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch((err) => console.log(err))
    }

    function createService(project) { 
        setMessage('')  
        //ultimo serviço
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()//ele vai gerar e anexar um ID a esse array para renderizar no react

        const lastServiceCost = lastService.cost //vai pegar o custo do serviço adicionado no projeto

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost) //vai sobrar o valor do servidço adiciona e somar com o valor do projeto para dar o novo custo total do rpojeto
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado')
            setType('error')
            project.services.pop()
            return false
        }
        //adiciona o serviço e atualiza o custo total
        project.cost = newCost
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', //metodo usado para atualizar apenas oque está sendo alterado no projeto
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project), //enviando um json para o banco de dados
            })
        .then((resp) => resp.json())//No primeiro then ele resgata a requisição e transforma em um objeto json
        .then(data => {//no segundo é pego o objeto em json e pode manipular os dados
            console.log(data)
            setMessage('Serviço inserido!')
            setType('success')
            setShowServiceForm(false)
        })
        .catch((err) => console.log(err))
    }

    function removeService(id, cost) {
        setMessage('')
        const serviceUpdate = project.services.filter(
            (service) => service.id !== id//filter retorna um novo array com a condição, ou seja vai retorar o serviços que tem o id diferente do que está sendo excluido
        )

        const projectUpdate = project

        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(serviceUpdate.cost) - parseFloat(cost) //pega o valor atual do custo menos oque valor do serviço que está sendo retirado
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', //metodo usado para atualizar apenas oque está sendo alterado no projeto
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdate), //enviando um json para o banco de dados
            })
        .then((resp) => resp.json())//No primeiro then ele resgata a requisição e transforma em um objeto json
        .then(data => {//no segundo é pego o objeto em json e pode manipular os dados
            setProject(projectUpdate)
            setServices(serviceUpdate)
            setMessage('Serviço Removido!')
            setType('Success')
        })
        .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }
    //{message && <Message type={type} msg={message}/>} se tiver mensagem ele apresenta na tela
    return(
        <>
        {project.name ? 
        (<div  className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message}/>}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar' : 'Salvar'}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Orçamento:</span>R$ {project.budget}
                            </p>
                            <p>
                                <span>Valor utilizado:</span>R$ {project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm 
                            handleSubmit={editPost} 
                            btnText="Concluir Edição" 
                            projectData={project}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um Serviço:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm? 'Adicionar Serviço' : 'Salvar'}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && 
                        <Services
                            handleSubmit={createService}
                            btnText="Adicionar Serviço"
                            projectData={project}
                        />}
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                 {services.length > 0 &&
                    services.map((service) => (
                        <ServicesCard
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            key={service.id}
                            handleRemove={removeService}
                        />
                    ))
                 } 
                 {services.length === 0 && <p>Não existem serviços cadastros</p>}           
                </Container>
            </Container>
        </div>)
        : (<Loading />)}
        </>)
}
export default Project