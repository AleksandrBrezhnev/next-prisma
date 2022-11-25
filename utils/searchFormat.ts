import { DEFAULT_QUERY } from "./constants"

const formatQuery = (
    rawPage:number = 1,
    rawPerPage: number = 20,
    rawSortBy:string | string[] = 'id',
    rawSortDirection:string | string[] = 'straight'
) => {

const data ={     
   page: rawPage? Number(rawPage) : DEFAULT_QUERY.page,
   perPage: rawPerPage? Number(rawPerPage) : DEFAULT_QUERY.perPage,
   sortBy: rawSortBy? rawSortBy: DEFAULT_QUERY.sortBy,
   sortDirection: rawSortDirection? rawSortDirection: DEFAULT_QUERY.sortDirection
}
const {page, perPage, sortBy, sortDirection} = data;
console.log(data)
    const pagination = {
        skip: (page - 1) * perPage,
        take: perPage,
    }
        const orderBy = {
            [`${sortBy}`]: sortDirection === 'straight' ? 'asc' : 'desc'
        } 

        return {
            ...pagination,
            orderBy
        }
    }

export default formatQuery;