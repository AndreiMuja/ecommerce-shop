import React, { useEffect } from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from '../collection/collection.component';
import { Route } from 'react-router-dom';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({fetchCollectionsStart,match,isCollectionFetching,collectionLoaded}) => {

    useEffect(() =>{
        fetchCollectionsStart();
    },[fetchCollectionsStart]);

    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!collectionLoaded} {...props} />} />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    collectionLoaded: selectIsCollectionLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);