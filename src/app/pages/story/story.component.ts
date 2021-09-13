import { Component, OnInit, HostListener } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  faFacebookFIcon = faFacebookF;
  faLinkedinInIcon = faLinkedinIn;
  faYoutubeIcon = faYoutube;
  faInstagramIcon = faInstagram;
  faCaretDown = faCaretDown;
  enableScroll = true;
  tabnewsList = tabnewsList;

  articlesList = [0];

  relatedArticles = [
    {
      media: '../../../assets/dummy-images/Rectangle 221.jpg',
      title: 'Lorem ipsum morbi tristia con flubet o lemase...',
      by: 'LOREM IPSUM',
    },
    {
      media: '../../../assets/dummy-images/Rectangle 222.jpg',
      title: 'Lorem ipsum morbi tristia con flubet o lemase...',
      by: 'LOREM IPSUM',
    },
    {
      media: '../../../assets/dummy-images/Rectangle 223.jpg',
      title: 'Lorem ipsum morbi tristia con flubet o lemase...',
      by: 'LOREM IPSUM',
    },
    {
      media: '../../../assets/dummy-images/Rectangle 224.jpg',
      title: 'Lorem ipsum morbi tristia con flubet o lemase...',
      by: 'LOREM IPSUM',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll', [])
  async onScroll() {
    if (this.bottomReached() && this.enableScroll) {
      this.enableScroll = false;
      if (this.articlesList.length < 5) {
        // this.articlesList = [...this.articlesList, this.articlesList.length];
        await this.loadArticles('');
        window.scrollTo(0, window.scrollY - 50);
        setTimeout(() => {
          this.enableScroll = true;
        }, 1000);
      }
    }
  }

  bottomReached(): boolean {
    // let footer: any = document.querySelector('footer');
    // featureNews.offsetHeight
    return (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight
    );
  }

  async loadArticles(val: any) {
    // In this function you can call more article api or you add article in list
    if (this.articlesList.length < 5) {
      this.articlesList = [...this.articlesList, this.articlesList.length];
    }
    if (val === 'next') {
      let ArticlesNewsSection: any = document.querySelector(
        '.ArticlesNewsSection'
      );
      window.scrollTo(0, window.scrollY + ArticlesNewsSection.offsetHeight);
    }
  }
}

const tabnewsList = [
  {
    media: '../../../assets/dummy-images/f1.jpg',
    title: 'Title Lorem Ipsum',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun...',
    by: 'Lorem, ipsum',
  },
  {
    media: '../../../assets/dummy-images/f2.jpg',
    title: 'Title Lorem Ipsum',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun...',
    by: 'Lorem, ipsum',
  },
  {
    media: '../../../assets/dummy-images/f3.jpg',
    title: 'Title Lorem Ipsum',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun...',
    by: 'Lorem, ipsum',
  },
  {
    media: '../../../assets/dummy-images/f4.jpg',
    title: 'Title Lorem Ipsum',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod tempor incididun...',
    by: 'Lorem, ipsum',
  },
];
