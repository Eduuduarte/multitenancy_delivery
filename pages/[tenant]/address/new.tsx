import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/app';
import { useAuthContext } from '../../../context/auth';
import { useApi } from '../../../libs/useApi';
import styles from '../../../styles/NewAddress.module.css';
import { Tenant } from '../../../types/tenant';
import { User } from '../../../types/User';
import Head from 'next/head';
import { Header } from '../../../components/Header';
import { useFormatter } from '../../../libs/useFormatter';
import { CartItem } from '../../../types/CartItem';
import { useRouter } from 'next/router';
import { Button } from '../../../components/Button';
import { Address } from '../../../types/Address';
import { AddressItem } from '../../../components/AddressItem';
import { InputField } from '../../../components/InputField';


const newAddress = (data: Props) => {
  const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  useEffect(() => {
    setTenant(data.tenant);
    if (data.token != "") setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const router = useRouter();

  const [ addressCep, setAddressCep ] = useState<string>('');
  const [ addressStreet, setAddressStreet ] = useState<string>('');
  const [ addressNumber, setAddressNumber ] = useState<string>('');
  const [ addressNeighborhood, setAddressNeighborhood ] = useState<string>('');
  const [ addressCity, setAddressCity ] = useState<string>('');
  const [ addressState, setAddressState ] = useState<string>('');
  const [ addressComplement, setAddressComplement ] = useState<string>('');

  const handleNewAddress = () => {
    router.push(`/${data.tenant.slug}/newaddress/new`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Novo Endereço | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/checkout`}
        color={data.tenant.mainColor}
        title="Novo Endereço"
      />

      <div className={styles.inputs}>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.label}>CEP</div>
                <InputField 
                    color={data.tenant.mainColor}
                    placeholder="Digite um CEP"
                    value={addressCep}
                    onChange={value => setAddressCep(value)}
                />
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.label}>Rua</div>
                <InputField 
                    color={data.tenant.mainColor}
                    placeholder="Digite uma rua"
                    value={addressStreet}
                    onChange={value => setAddressStreet(value)}
                />
            </div>
            <div className={styles.column}>
                <div className={styles.label}>Número</div>
                <InputField 
                    color={data.tenant.mainColor}
                    placeholder="Digite um númeroa"
                    value={addressNumber}
                    onChange={value => setAddressNumber(value)}
                />
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.label}>Rua</div>
                <InputField 
                    color={data.tenant.mainColor}
                    placeholder="Digite um bairro"
                    value={addressNeighborhood}
                    onChange={value => setAddressNeighborhood(value)}
                />
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.label}>Cidade</div>
                <InputField 
                    color={data.tenant.mainColor}
                    placeholder="Digite uma cidade"
                    value={addressCity}
                    onChange={value => setAddressCity(value)}
                />
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.label}>Estado</div>
                <InputField 
                    color={data.tenant.mainColor}
                    placeholder="Digite um estado"
                    value={addressState}
                    onChange={value => setAddressState(value)}
                />
            </div>
        </div>

        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.label}>Complemento</div>
                <InputField 
                    color={data.tenant.mainColor}
                    placeholder="Digite um estado"
                    value={addressComplement}
                    onChange={value => setAddressComplement(value)}
                />
            </div>
        </div>
      </div>

      <div className={styles.btnArea}>
        <Button 
            color={data.tenant.mainColor}
            label="Adicionar"
            onClick={handleNewAddress}
            fill
        />
      </div>


    </div>
  );
}

export default newAddress;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  addresses: Address[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tanant
  const tenant = await api.getTenant();
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  }

  // Get Logged User
  const token = getCookie('token', context);
  const user = await api.authorizeToken(token as string);
  if(!user) {
    return { redirect: { destination: '/login', permanent: false} }
  }

  // Get Addresses from Logged User
  const addresses: Address[] = await api.getUserAddresses(user.email);


  return {
    props: {
      tenant,
      user,
      token,
      addresses
    }
  }
}