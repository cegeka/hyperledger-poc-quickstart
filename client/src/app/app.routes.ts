import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/admin/home/home.component";
import { CustomerComponent } from "./pages/customer/customer-home/customer.component";
import { BlockchainComponent } from "./pages/blockchain/blockchain.component";
import { TxDetailComponent } from "./pages/tx-detail/tx-detail.component";

export const routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: HomeComponent
    },
    {
        path: 'customer',
        component: CustomerComponent
    },
    {
        path: 'blockchain',
        component: BlockchainComponent
    },
    {
        path: 'detail/:id',
        component: TxDetailComponent
    }
];

export const pages: Array<any> = [];
routes.forEach(route => pages.push(route.component));