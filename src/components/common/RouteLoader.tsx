import styles from '../../styles/Loader.module.css';

export function RouteLoader() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <span className={styles.loader} />
    </div>
  );
}
