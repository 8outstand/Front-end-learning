import styles from './Alert.module.css'

export const Alert = ({children , type = 'success'}) =>{
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <p>{children}</p>
    </div>
  )
}