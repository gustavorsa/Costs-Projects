import styles from './Select.module.css'
//Forma de deixar o select usavel em outro componentes
function Select({text, name, options, handleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select 
            name={name} 
            id={name} 
            onChange={handleOnChange} 
            value={value || ''}>
                <option>Selecione uma opção</option>
                {options.map((options) => (
                    <option value={options.id} key={options.id}>{options.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select