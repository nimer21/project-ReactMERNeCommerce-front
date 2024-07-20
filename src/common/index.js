//const backendDomain = "http://localhost:8000"
const backendDomain = "https://project-react-mer-ne-commerce-back.vercel.app";

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : 'POST'
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : 'POST'
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : 'GET'
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : 'GET'
    },
    allUsers : {
        url : `${backendDomain}/api/all-users`,
        method : 'GET'
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : 'PUT'
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : 'POST'
    },
    allProducts : {
        url : `${backendDomain}/api/get-products`,
        method : 'GET'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : 'PUT'
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : 'GET'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        headers: {
            'Content-Type': 'application/json',
        },
        method : 'POST'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'POST'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addtocart`,
        headers: {
            'Content-Type': 'application/json',
        },
        method : 'POST'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method : 'GET'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/view-cart-product`,
        headers: {
            'Content-Type': 'application/json',
        },
        method : 'GET'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        headers: {
            'Content-Type': 'application/json',
        },
        method : 'POST'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        headers: {
            'Content-Type': 'application/json',
        },
        method : 'POST'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'GET'
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'POST'
    }
}

export default SummaryApi
