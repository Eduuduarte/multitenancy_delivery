import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/app';
import { useAuthContext } from '../../context/auth';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Cart.module.css';
import { Product } from '../../types/Products';
import { Tenant } from '../../types/tenant';
import { User } from '../../types/User';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useFormatter } from '../../libs/useFormatter';

const Cart = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  const [shippingInput, setShippingInput] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    setTenant(data.tenant);
    if (data.token != "") setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();

  const handleClickCalc = () => {

  }

  const handleFinish = () => {

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sacola | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title="Sacola"
      />

      <div className={styles.productsQuantity}>x itens</div>

      <div className={styles.productList}>

      </div>

      <div className={styles.shippingArea}>
        <div className={styles.shippingTitle}>Calcular frete e prazo</div>
        <div className={styles.shippingForm}>
          <InputField
            color={data.tenant.mainColor}
            placeholder="Digite seu frete"
            value={shippingInput}
            onChange={newValue => setShippingInput(newValue)}
          />
          <Button
            color={data.tenant.mainColor}
            label="OK"
            onClick={handleClickCalc}
          />
        </div>
        <div className={styles.shippingInfo}>
          <div className={styles.shippingAddress}>rua blab bla bla</div>
          <div className={styles.shippingTime}>
            <div className={styles.shippingTimeText}>Receba em até 20 minutos.</div>
            <div
              className={styles.shippingPrice}
              style={{ color: data.tenant.mainColor }}
            >
              {formatter.formtPrice(shippingPrice)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{formatter.formtPrice(subTotal)}</div>
        </div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>{shippingPrice > 0 ? formatter.formtPrice(shippingPrice) : '--'}</div>
        </div>
        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div
            className={styles.resumeRightBig}
            style={{ color: data.tenant. mainColor }}
          >{formatter.formtPrice(shippingPrice + subTotal)}</div>
        </div>
        <div className={styles.resumeButton}>
          <Button
            color={data.tenant.mainColor}
            label="Continuar"
            onClick={handleFinish}
            fill
          />
        </div>
      </div>


    </div>
  );
}

export default Cart;

type Props = {
  tenant: Tenant;
  products: Product[];
  token: string;
  user: User | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tanant
  const tenant = await api.getTenant();
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  }

  let token = ""

  if (hasCookie('token')) {
    token = getCookie('token', context) as string;
  }

  // Get Logged User
  // const token = context.req.cookies.token
  const user = await api.authorizeToken(token as string);

  // Get Products
  const products = await api.getAllProducts();

  return {
    props: {
      tenant,
      products,
      user,
      token
    }
  }
}