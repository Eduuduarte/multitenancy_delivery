import { Tenant } from "../types/tenant";


export const useApi = () => ({

    getTenant: (tenantSlug: string): boolean | Tenant => {
        switch(tenantSlug) {
            case 'd10burguer':
                return {
                    slug: 'd10burguer',
                    name: 'D10Burger',
                    mainColor: '#FF0000',
                    secondColor: '#00FF00'
                }
            break;

            case 'd10pizza':
                return {
                    slug: 'd10pizza',
                    name: 'D10Pizza',
                    mainColor: '#0000FF',
                    secondColor: '#FF0000'
                }
            break;
            default: return false;
        }
          
    }

});