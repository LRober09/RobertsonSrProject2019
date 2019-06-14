import {productsUrl} from "./variables";
import {fetchWrapper} from "./fetchWrapper";

const fetchProducts = (onSuccess, onError, onStart, onComplete) => {
    fetchWrapper(null, productsUrl, 'GET', onSuccess, onError, onStart, onComplete);
};

export {fetchProducts};