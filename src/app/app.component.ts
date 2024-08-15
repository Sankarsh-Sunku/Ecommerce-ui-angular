import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet , RouterModule} from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink ,RouterModule, HeaderComponent, SellerAuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ecommerce-angular';

}
