import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { BlockchainComponent } from "./pages/blockchain/blockchain.component";
import { TxDetailComponent } from "./pages/tx-detail/tx-detail.component";
import { BlockchainLandingComponent } from "./pages/blockchain-landing/blockchain-landing.component";

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
        path: 'blockchain',
        component: BlockchainComponent
    },
    {
        path: 'detail/:id',
        component: TxDetailComponent
    },
    {
        path: 'blockchain-explorer',
        component: BlockchainLandingComponent
    }
];

export const pages: Array<any> = [];
routes.forEach(route => pages.push(route.component));