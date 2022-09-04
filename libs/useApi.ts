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


export const useApi = (tenantSlug: string) => ({

    getTenant: async () => {
        switch(tenantSlug) {
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
        
        return {...TEMPORARYoneProduct, id};
    },

    authorizeToken: async (token: string): Promise<User | false> => {
        if(!token) return false;

        return {
            name: 'Eduardo',
            email: 'eduardo@gmail.com.br'
        }
    }

});