import styles from './NewProject.module.css'
import ProjectForm from '../Project/ProjectForm'
import {useNavigate} from 'react-router-dom'

function NewProject(){

    const navigate  = useNavigate()//vai ser usado para redirecionar para uma nova pagina


    //initialize cost and services
    function createPost(project) {
        project.cost = 0 //vai inserir o valor do projeto
        project.services = [] //vai guardar os valores

        fetch('http://localhost:5000/projects', {//fazer um request
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',//espera receber json
            },
            body: JSON.stringify(project),
            /*nesse caso está sendo enviado os dados do projeto para o endereço 
            acima usando o metodo post enviado para o backend*/
        })
        .then((resp) => resp.json()) //Transforma os dados em JSON
        .then((data) => {
            console.log(data)//Nesse caso ele mostra oque está trasendo do backend
            //redirect
            navigate('/projects', { state: {message: 'Projeto criado com sucesso!'} })
        })
        .catch(err => console.log(err))//erro que retona do servidor
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar  Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost}/*Passando o metodo Post para a propriedade*/ btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject