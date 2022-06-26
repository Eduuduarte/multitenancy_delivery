export type getTenantResponse = {
    name: string,
    mainColor: string,
    secondColor: string
}

export const useApi = () => ({

    getTenant: (tenantSlug: string): boolean | getTenantResponse => {
        switch(tenantSlug) {
            case 'd10burguer':
                return {
                    name: 'D10Burger',
                    mainColor: '#FF0000',
                    secondColor: '#00FF00'
                }
            break;

            case 'd10pizza':
                return {
                    name: 'D10Pizza',
                    mainColor: '#0000FF',
                    secondColor: '#FF0000'
                }
            break;
            default: return false;
        }
          
    }

});