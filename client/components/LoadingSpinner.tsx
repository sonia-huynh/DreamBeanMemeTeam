import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
  return (
    <div>
    <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3415284/jelly-beans-clipart-md.png" className={styles.loading}
      aria-label="Loading..."
      aria-busy="true"
      aria-live="polite"/>
    </div>
  )
}
