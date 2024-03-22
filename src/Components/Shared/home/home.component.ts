import { FooterComponent } from '../../Layout/footer/footer.component';
import { HeaderComponent } from '../../Layout/header/header.component';
import { CourseSectionComponent } from './course-section/course-section.component';
import { EventSectionComponent } from './event-section/event-section.component';
import { FactSectionComponent } from './fact-section/fact-section.component';
import { OfferSectionComponent } from './offer-section/offer-section.component';
import { ProductSectionComponent } from './product-section/product-section.component';
import { ReviewSectionComponent } from './review-section/review-section.component';
import { TopBannerComponent } from './top-banner/top-banner.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,TopBannerComponent,CourseSectionComponent,FactSectionComponent,ProductSectionComponent,OfferSectionComponent,EventSectionComponent,ReviewSectionComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
