import styles from './Home.module.css'
import savings from '../../img/savings.svg' //Importa a imagem da pasta
import LinkButton from './LinkButton'

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem vindo ao <span>Costs</span>
            </h1>
            <p>Comece a gerenciar seus projetos</p>
            <LinkButton to="/newproject" text="Novo Projeto"/>
            <img src={savings} alt="Costs"/>
        </section>
    )
}

export default Home