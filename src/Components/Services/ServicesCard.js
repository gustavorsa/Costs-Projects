import styles from '../Project/ProjectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs'

function ServicesCard({id, name, cost, description,key, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <div>
                <p>
                    <span>Custo do serviço:</span> R$ {cost}
                </p>
                <p>{description}</p>
                <div className={styles.project_card_actions}>
                    <button onClick={remove}>
                        <BsFillTrashFill/>Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServicesCard