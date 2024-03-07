import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
  return (
    <div>
    <img src="https://images.bonanzastatic.com/afu/images/b5f5/d113/ea03_7960949134/s-l1600.jpg" className={styles.loading}
      aria-label="Loading..."
      aria-busy="true"
      aria-live="polite"/>
    </div>
  )
}
