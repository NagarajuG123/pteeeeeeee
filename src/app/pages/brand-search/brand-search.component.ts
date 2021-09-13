import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-search',
  templateUrl: './brand-search.component.html',
  styleUrls: ['./brand-search.component.scss'],
})
export class BrandSearchComponent implements OnInit {
  constructor() {}
  filterByIndustry = [
    'Automotive',
    'Beauty',
    'Consumer Goods',
    'Consumer Services',
    'Construction',
    'Education',
    'Facilities Services',
    'Finance',
    'Food & Beverage',
    'Health Care',
    'Health Wellness & Fitness',
    'Home Improvement',
    'Lawn Care',
    'Leisure Travel & Tourism',
    'Moving & Storage',
    'Pest Control',
    'Pet Care',
    'Real Estate',
    'Restaurant',
    'Retail',
    'Senior Care',
    'Telecom & Wireless',
    'Transportation',
    'Consultant',
    'Supplier',
  ];
  filterByInvestment = [
    '$0-$100,000',
    '$100,000-$250,000',
    '$250,000-$500,000',
    '$500,000-$1,000,000',
    '$1,000,000-$5,000,000',
  ];
  franchisees = [
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_2.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_1.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_3.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_5.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_4.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_6.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_7.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_8.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_9.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
    {
      BrandPage:
        '../../../assets/img/franchise-opportunites/franchise_logo_10.png',
      Investment: '$123,123  - $123,456',
      Industry: 'Lorem ipsum morbi tristia con flubet o lemase',
      LatestStory: 'Lorem ipsum morbi tristia con flubet o lemase',
    },
  ];
  ngOnInit(): void {}
}
