import {useState, useEffect} from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButtons'
import styles from './ProjectForm.module.css'

function ProjectForm ({handleSubmit, btnText, projectData}) {
    //projectData - vai ser usado para conferir se os dados vão estar presentes ou não

    const [project, setProject] = useState(projectData || {})//Ele vai aguardar o preenchimento do formulario, mas com caso não venha usando o objeto vazio ele entende que vou preencher
    const [categories, setCategories] = useState ([])

    useEffect(() => {
        fetch('http://localhost:5000/categories', {//fazer um request de get
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',//espera receber json
        },
    })
    .then((resp)=> resp.json())
    .then((data) => {
            setCategories(data)
        })
    .catch(err => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)//vai esperar receber oque esta preenchido no project
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})//vai inserir oque está sendo enviando ao input do project
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})//vai inserir oque está sendo enviando ao input do project
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text" 
            text="Nome do Projeto" 
            name="name" 
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            value = {project.name}
            />
            <Input 
            type="number" 
            text="Orçamento do Projeto" 
            name="budget" 
            placeholder="Insira o valor do projeto"
            handleOnChange={handleChange}
            value = {project.budget}
            />
            <Select 
            text="Selecione uma categoria" 
            name="cetegory_id" 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm