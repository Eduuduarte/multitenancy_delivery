import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';
import { useFormatter } from '../../libs/useFormatter';
import { Product } from '../../types/Products';
import styles from './styles.module.css';

type Props ={
    data: Product;
}

export const ProductItem = ({data}: Props) => {
    const { tenant } = useAppContext();

    const formatter = useFormatter();

    return (
        <Link href={`/d7burger/product/${data.id}`}>
            <a className={styles.container}>
                <div className={styles.head} style={{background: tenant?.secondColor}}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <img  src={data.image} alt="" />
                    </div>
                    <div className={styles.catName}>{data.categoryName}</div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.price} style={{color: tenant?.mainColor}}>{formatter.formtPrice(data.price)}</div>
                </div>
            </a>
        </Link>  
    );
}