import styles from './Container.module.css'
//Container nesse caso vai encapsular o elemento para que ele possa sofrer alteraçoes
//styles[props.customClass adiciona a classe que é criado junto a props
function Container(props){
    return(
        <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>
    )
}

export default Container