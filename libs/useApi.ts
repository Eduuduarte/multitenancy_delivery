import { Address } from "../types/Address";
import { CartItem } from "../types/CartItem";
import { Order } from "../types/Order";
import { Product } from "../types/Products";
import { Tenant } from "../types/tenant";
import { User } from "../types/User";

const TEMPORARYoneProduct: Product = {
    id: 1,
    image: '/tmp/burger.png',
    categoryName: 'Tradicional',
    name: 'Texas Burge',
    price: 25.50,
    description: "2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal"
}

const TEMPORARYorder: Order = {
    id: 123,
    status: 'sent',
    orderDate: '2022-12-04',
    userid: '123',
    shippingAddress: {
        id: 2,
        street: 'Rua das flores',
        number: '200',
        cep: '58433001',
        city: 'São paulo',
        neighborhood: 'Jardins',
        state: 'SP'
    },
    shippingPrice: 9.14,
    paymentType: 'card',
    cupom: 'ABC',
    cupomDiscount: 14.3,
    products: [
        { product: {...TEMPORARYoneProduct, id: 1}, qt: 1},
        { product: {...TEMPORARYoneProduct, id: 2}, qt: 2},
        { product: {...TEMPORARYoneProduct, id: 3}, qt: 1},
    ],
    subtotal: 204,
    total: 198.84
}


export const useApi = (tenantSlug: string) => ({

    getTenant: async () => {
        switch (tenantSlug) {
            case 'd10burguer':
                return {
                    slug: 'd10burguer',
                    name: 'D10Burger',
                    mainColor: '#FB9400',
                    secondColor: '#FFF9F2'
                }
                break;

            case 'd10pizza':
                return {
                    slug: 'd10pizza',
                    name: 'D10Pizza',
                    mainColor: '#6AB70A',
                    secondColor: '#E0E0E0'
                }
                break;
            default: return false;
        }

    },

    getAllProducts: async () => {
        let products = [];
        for (let q = 0; q < 10; q++) {
            products.push({
                ...TEMPORARYoneProduct,
                id: q + 1
            });
        }
        return products;
    },

    getProduct: async (id: number) => {

        return { ...TEMPORARYoneProduct, id };
    },

    authorizeToken: async (token: string): Promise<User | false> => {
        if (!token) return false;

        return {
            name: 'Eduardo',
            email: 'eduardo@gmail.com.br'
        }
    },

    getCartProducts: async (cartCookie: string) => {
        let cart: CartItem[] = [];
        if (!cartCookie) return cart;

        const cartJson = JSON.parse(cartCookie);
        for (let i in cartJson) {
            if (cartJson[i].id && cartJson[i].qt) {
                const product = {
                    ...TEMPORARYoneProduct,
                    id: cartJson[i].id
                }
                cart.push({
                    qt: cartJson[i].qt,
                    product
                });
            }
        }

        return cart;
    },

    getUserAddresses: async (email: string) => {
        const addresses: Address[] = [];

        for (let i = 0; i < 4; i++) {
            addresses.push({
                id: i + 1,
                street: 'Rua das Flores',
                number: `${i + 1}00`,
                cep: '999999999',
                city: 'São Paulo',
                neighborhood: 'Jardins',
                state: 'SP'
            });
        }

        return addresses;
    },

    getUserAddress: async (addressid: number) => {
        let address: Address = {
            id: addressid,
            street: 'Rua das Flores',
            number: `${addressid}00`,
            cep: '999999999',
            city: 'São Paulo',
            neighborhood: 'Jardins',
            state: 'SP'
        }
        return address;
    },

    editUserAddress: async (newAddressData: Address) => {
        return true;
    },

    deleteUserAddress: async (addressId: number) => {
        return true;
    },

    addUserAddress: async (address: Address) => {
        return { ...address, id: 9 };
    },

    getShippingPrice: async (address: Address) => {
        return 9.16;
    },

    setOrder: async (
        address: Address,
        paymentType: 'money' | 'card',
        paymentChange: number,
        cupom: string,
        cart: CartItem[]
    ) => {
        return TEMPORARYorder;
    },

    getOrder: async (orderid: number) => {
        return TEMPORARYorder;
    }
});