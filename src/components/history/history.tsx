import { useHistory } from '../../hooks/useHistory.tsx';
import { useTypedDispatch } from '../../hooks/useTypedDispatch.tsx';
import styles from './history.module.css';
import SmallCard from '../card/smallCard.tsx';

export default function History() {
  const { history, handleResetHistory } = useHistory();
  const dispatch = useTypedDispatch();
  const array = new Uint32Array(1);
  return (
    <div className={styles.wrapper}>
      {history.length ? (
        <>
          <button onClick={handleResetHistory} className={styles.button}>
            Clear history
          </button>
          {history.map((h) => (
            <SmallCard
              historicalData={h}
              key={window.crypto.getRandomValues(array)}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
