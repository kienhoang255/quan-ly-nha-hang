import React, { useEffect } from 'react';
import ContentLayout from '~/layout/ContentLayout/ContentLayout';

const OrderServices = () => {
    useEffect(() => {
        document.title = 'Order Services';
    });
    return <ContentLayout title="Order Services">OrderServices</ContentLayout>;
};

export default OrderServices;
