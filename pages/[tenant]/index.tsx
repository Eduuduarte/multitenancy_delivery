import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import { SearchInput } from '../../components/SearchInput';
import { Sidebar } from '../../components/Sidebar';
import { useAppContext } from '../../context/app';
import { useAuthContext } from '../../context/auth';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Home.module.css';
import { Product } from '../../types/Products';
import { Tenant } from '../../types/tenant';
import { User } from '../../types/User';
import NoItemsIcon from '../../public/assets/noitems.svg';

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const { setToken, setUser } = useAuthContext();

  useEffect(() => {
    setTenant(data.tenant);
    if (data.token != "") setToken(data.token);
    if (data.user) setUser(data.user);
  }, []);

  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search
  const [filterProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const handleSearch = (value: string) => setSearchText(value);
  useEffect(() => {
    let newFilteredProducts: Product[] = [];
    for (let product of data.products) {
      if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        newFilteredProducts.push(product);
      }
    }
    setFilteredProducts(newFilteredProducts);

  }, [searchText])

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
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
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

      {searchText &&
        <>
          <div className={styles.searchText}>
            Procurando por: <strong>{searchText}</strong>
          </div>

          {filterProducts.length > 0 &&
            <div className={styles.grid}>

              {filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  data={item}
                />
              ))}
            </div>
          }

          {filterProducts.length === 0 && 
            <div className={styles.noProducts}>
              <NoItemsIcon color="#E0E0E0"/>
              <div className={styles.noProductsText}>Ops! Não há itens com este nome</div>
            </div>
          }
        </>
      }

      {!searchText &&
        <>
          <Banner />

          <div className={styles.grid}>

            {products.map((item, index) => (
              <ProductItem
                key={index}
                data={item}
              />
            ))}
          </div>
        </>
      }
    </div>
  );
}

export default Home;

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

  let token = getCookie('token', context);

  if(hasCookie('token')){
    token = getCookie('token', context) as string;
  } else {
    token="";
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