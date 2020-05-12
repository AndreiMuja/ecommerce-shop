import React from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import CollectionPreview from '../preview-collection/preview-collection.component';
import {selectCollectionForPreview} from '../../redux/shop/shop.selectors';
import './collections-overview.styles.scss';

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
    {
         collections.map(({id,...otherProps}) =>(<CollectionPreview key={id} {...otherProps}/>))
    }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections:selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
