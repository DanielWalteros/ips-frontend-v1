import { Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { ServicesComponent } from './containers/services/services.component';
import { AboutComponent } from './containers/about/about.component';
import { PolicyDetailComponent } from './containers/policy-detail/policy-detail.component';
import { UserGuideComponent } from './containers/user-guide/user-guide.component';
import { InformationDetailComponent } from './containers/information-detail/information-detail.component';
//TODO: Revisar Lazy loading
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', redirectTo: '', pathMatch: 'full' },
  { path: 'nuestros-servicios', component: ServicesComponent },
  { path: 'sobre-nuestra-ips', component: AboutComponent },
  { path: 'sobre-nuestra-ips/:policyId', component: PolicyDetailComponent },
  { path: 'guia-para-el-usuario', component: UserGuideComponent },
  { path: 'guia-para-el-usuario/:path', component: InformationDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route para 404
];
