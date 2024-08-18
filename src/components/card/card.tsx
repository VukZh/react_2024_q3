import styles from './card.module.css';
import { useFormRHF } from '../../hooks/useFormRHF.tsx';
import { useFormU } from '../../hooks/useFormU.tsx';

type CardPropsType = {
  isRHF: boolean;
};
export default function Card({ isRHF }: CardPropsType) {
  const { formDataU } = useFormU();
  const { formDataRHF } = useFormRHF();
  const formData = isRHF ? formDataRHF : formDataU;
  return (
    <>
      <div
        className={styles.card}
        style={{
          borderColor: !formData.name ? '#242424' : isRHF ? 'green' : 'tomato',
        }}>
        {formData.name ? (
          <>
            <div>Name: {formData.name}</div>
            <div>Age: {formData.age}</div>
            <div>Email: {formData.email}</div>
            <div>Password: {formData.password[0] + '.....'}</div>
            <div>Gender: {formData.gender}</div>
            <div>Country: {formData.country}</div>
            <img src={formData.picture} alt="Uploaded" width="300" />
          </>
        ) : null}
      </div>
    </>
  );
}
