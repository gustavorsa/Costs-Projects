import style from './SubmitButtons.module.css'
//Forma de deixar o SubmitButton usavel em outro componentes
function SubmitButton({text}) {
    return (
        <div>
            <button className={style.btn}>{text}</button>
        </div>
    )
}

export default SubmitButton