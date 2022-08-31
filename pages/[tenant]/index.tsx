import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import { SearchInput } from '../../components/SearchInput';
import { Sidebar } from '../../components/Sidebar';
import { useAppContext } from '../../context/app';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Home.module.css';
import { Product } from '../../types/Products';
import { Tenant } from '../../types/tenant';

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() =>{
    setTenant(data.tenant);
  }, []);

  const [ products, setProducts ] = useState<Product[]>(data.products);
  const [sidebarOpen, setSidebarOpen ] = useState(false);

  const handleSearch = (SearchValue: string) => {
    console.log(`Você está buscando por: ${SearchValue}`);
  }

  return (
    <div 
      className={styles.container}
    >
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem Vindo (a) 👋</div>
            <div className={styles.headerSubTitle}>O que deseja para hoje?</div>
          </div>
          <div className={styles.headerTopRight}>
            <div 
              className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
            >
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
            </div>
            
            <Sidebar
              tenant={data.tenant}
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

          </div>
        </div>
        
        <div className={styles.headerBotton}>
          <SearchInput 
            onSearch={handleSearch}
          />
        </div>

        
      </header>

      <Banner />

      <div className={styles.grid}>

        {products.map((item, index) => (
          <ProductItem
          key={index}
          data={item}
        />
        ))}
      </div>
    </div>
  );
}

export default Home;

type Props = {
    tenant: Tenant,
    products: Product[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  // Get Tanant
  const tenant = await api.getTenant();
  if(!tenant) {
    return { redirect: { destination: '/', permanent: false} }
  }

  // Get Products
  const products = await api.getAllProducts();

  return {
    props: {
        tenant,
        products
    }
  }
}