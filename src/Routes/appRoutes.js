import Main from "../components/Main.vue";
import Cart from "../components/Cart.vue";
import Favorites from "../components/Favorites.vue";
import Auth from "../components/Auth.vue";
import Signup from "../components/Signup.vue";
import Checkout from "../components/Checkout.vue";
import Orders from "../components/Orders.vue";
import Me from "../components/Me.vue";

const appRoutes = [
    {
        path: '/',
        name: 'main',
        component: Main
    },
    {
        path: '/me',
        name: 'me',
        component: Me
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    },
    {
        path: '/order/:id',
        name: 'order',
        component: Checkout
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders
    },
]

export default appRoutes