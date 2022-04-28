import { useState, useEffect } from 'react'

import styles from './Message.module.css'

function Message ({type, msg}) {

    const [visible, setvisible] = useState(false)//vai determinar se a mensagem aparece ou não dependendo da condição, no caso cosmeça false
    //usando o styles[type] ele vai condicionar o estilo com o tipo da mensagem

    useEffect(() => {

        if(!msg) {//quando não ter mensagem ele não apresenta nada
            setvisible(false)
            return
        }
        else setvisible(true)
        const timer = setTimeout(() => {//quando tiver mensagem, ela vai ser apresentada
            setvisible(false)
        }, 3000)//passado 3 segundos ela some da tela

        return () => clearTimeout(timer)//finaliza ao mesmo tempo de sumir a tela de mensagem

    }, [msg])

    return (<>
        {visible && (
        <div className={`${styles.message} ${styles[type]}`}>
            {msg}
        </div>
        )}
    </>)
}

export default Message