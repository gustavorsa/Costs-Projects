import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButtons'

import styles from '../Project/ProjectForm.module.css'

function Services ({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)/*Faz alteração do objeto */
        handleSubmit(projectData)//Metodo para alteração usando handlesubmit
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value}) //Usando o sprid operator(...) vai pegar oque passou com name e o valor passado no placeholder
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text"
                text="Nome do Serviço"
                name="name"
                placeholder="Digite o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input 
                type="number"
                text="Valor do Serviço"
                name="cost"
                placeholder="Insira o valor do serviço"
                handleOnChange={handleChange}
            />
            <Input 
                type="text"
                text="Descrição do Serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton
                text={btnText}
            />
        </form>
    )
}

export default Services