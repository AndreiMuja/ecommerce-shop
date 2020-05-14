import {createSelector} from 'reselect';

const selectShop=state=>state.shop;

export const selectShopItems = createSelector(
    [selectShop], shop=>shop.collections
);

export const selectCollectionForPreview = createSelector(
    [selectShopItems],collections => collections ? Object.keys(collections).map(key=>collections[key]) : []
);

export const selectCollection=collectionUrlParam => createSelector(
    [selectShopItems], 
    //collections => collections.find(collection => collection.id===COLLECTION_ID_MAP[collectionUrlParam])
    collections => (collections ? collections[collectionUrlParam] : null)
);