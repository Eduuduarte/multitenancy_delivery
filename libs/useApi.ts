export type getTenantResponse = {
    name: string,
    mainColor: string,
    secondColor: string
}

export const useApi = () => ({

    getTenant: (tenantSlug: string): boolean | getTenantResponse => {
        switch(tenantSlug) {
            case 'D10Burger':
                return {
                    name: 'D10Burger',
                    mainColor: '#FF0000',
                    secondColor: '#00FF00'
                }
            break;

            case 'D10Pizza':
                return {
                    name: 'D10Pizza',
                    mainColor: '#0000FF',
                    secondColor: '#00FF00'
                }
            break;
            default: return false;
        }
          
    }

});