import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/app';
import { useAuthContext } from '../../context/auth';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/MyAddresses.module.css';
import { Tenant } from '../../types/tenant';
import { User } from '../../types/User';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { useFormatter } from '../../libs/useFormatter';
import { useRouter } from 'next/router';
import { Button } from '../../components/Button';
import { Address } from '../../types/Address';
import { AddressItem } from '../../components/AddressItem';


const MyAddresses = (data: Props) => {
  const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  useEffect(() => {
    setTenant(data.tenant);
    if (data.token != "") setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const formatter = useFormatter();
  const router = useRouter();
  const api = useApi(data.tenant.slug);

  const handleAddressSelect = async (address: Address) => {
    const price = await api.getShippingPrice(address);

    if(price) {
      setShippingAddress(address);
      setShippingPrice(price);

      router.push(`/${data.tenant.slug}/checkout`);
    }
  }

  const handleAddressEdit = (id: number) => {
    router.push(`/${data.tenant.slug}/address/${id}`)
  }

  const handleAddressDelete = async (id: number) => {
    await api.deleteUserAddress(id);
    router.reload();
  }

  const handleNewAddress = () => {
    router.push(`/${data.tenant.slug}/address/new`);
  }

  // Menu Events
  const [menuOpened, setMenuOpened] = useState(0);
  const handleMenuEvent = (event: MouseEvent) => {
    const tagName = (event.target as Element).tagName;
    if(!['path', 'svg'].includes(tagName)){
        setMenuOpened(0);
    }
  }
  useEffect(() => {
    window.removeEventListener('click', handleMenuEvent);
    window.addEventListener('click', handleMenuEvent);

    return () => window.removeEventListener('click', handleMenuEvent);
  }, [menuOpened])

  return (
    <div className={styles.container}>
      <Head>
        <title>Meus Endereços | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/checkout`}
        color={data.tenant.mainColor}
        title="Meus Endereços"
      />

      <div className={styles.list}>
        {data.addresses.map((item, index) => (
            <AddressItem
                key={index}
                color={data.tenant.mainColor}
                address={item}
                onSelect={handleAddressSelect}
                onEdit={handleAddressEdit}
                onDelete={handleAddressDelete}
                menuOpened={menuOpened}
                setMenuOpened={setMenuOpened}
            />
        ))}
      </div>

      <div className={styles.btnArea}>
        <Button 
            color={data.tenant.mainColor}
            label="Novo Endereço"
            onClick={handleNewAddress}
            fill
        />
      </div>


    </div>
  );
}

export default MyAddresses;

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