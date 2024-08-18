import styles from './smallCard.module.css';
import { HistoryFormDataType } from '../../types/types.ts';

type CardPropsType = {
  historicalData: HistoryFormDataType;
};
export default function SmallCard({ historicalData }: CardPropsType) {
  return (
    <>
      <div
        className={styles.card}
        style={{
          borderColor: historicalData?.formType === 'rhf' ? 'green' : 'tomato',
        }}>
        {historicalData.name ? (
          <>
            <div>Name: {historicalData.name}</div>
            <div>Age: {historicalData.age}</div>
            <div>Email: {historicalData.email}</div>
            <div>Password: {historicalData.password[0] + '.....'}</div>
            <div>Gender: {historicalData.gender}</div>
            <div>Country: {historicalData.country}</div>
            <img src={historicalData.picture} alt="history" width="100" />
          </>
        ) : null}
      </div>
    </>
  );
}
