import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/auth';
import { Tenant } from '../../types/tenant';
import { Button } from '../Button';
import { SidebasMenuItem } from '../SidebarMenuItem';
import styles from './styles.module.css';

type Props = {
    tenant: Tenant;
    open: boolean;
    onClose: () => void;
}

export const Sidebar = ({ tenant, open, onClose }: Props) => {
    const { user, setToken } = useAuthContext();

    const router = useRouter();

    return (
        <div
            className={styles.container}
            style={{
                width: open ? '100vw' : '0'
            }}
        >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div
                        className={styles.loginArea}
                        style={{ borderBottomColor: tenant.mainColor }}
                    >
                        {user &&
                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                Último pedido há x semana
                            </div>
                        }
                        {!user &&
                            <Button
                                color={tenant.mainColor}
                                label="Fazer Login"
                                onClick={() => router.push(`/${tenant.slug}/login`)}
                                fill
                            />
                        }
                    </div>
                    <div
                        className={styles.closeBtn}
                        style={{ color: tenant.mainColor }}
                        onClick={onClose}
                    >X</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.menu}>
                    <SidebasMenuItem
                        color={'#6A7D8B'}
                        icon="menu"
                        label='Cardápio'
                        onClick={onClose}
                    />
                    <SidebasMenuItem
                        color={'#6A7D8B'}
                        icon="cart"
                        label='Sacola'
                        onClick={() => router.push(`/${tenant.slug}/cart`)}
                    />
                    <SidebasMenuItem
                        color={'#6A7D8B'}
                        icon="fav"
                        label='Favoritos'
                        onClick={() => { }}
                        disabled
                    />
                    <SidebasMenuItem
                        color={'#6A7D8B'}
                        icon="order"
                        label='Meus Pedidos'
                        onClick={() => router.push(`/${tenant.slug}/orders`)}
                    />
                    <SidebasMenuItem
                        color={'#6A7D8B'}
                        icon="config"
                        label='Configurações'
                        onClick={() => { }}
                        disabled
                    />
                </div>
                <div className={styles.menuButtom}>
                    {user &&
                        <SidebasMenuItem
                            color={'#6A7D8B'}
                            icon="logout"
                            label='Sair'
                            onClick={() => {
                                setToken('');
                                onClose();
                             }}
                        />
                    }
                </div>
            </div>
        </div>
    )
}