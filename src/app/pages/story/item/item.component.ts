import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  SimpleChange,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import 'lazysizes';
import { environment } from 'src/environments/environment';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
declare var ga: Function;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() details: any;
  @Input() trending: any;
  @Input() brandSlug = '1851';
  @Input() index: string;
  @Input() type: string;
  @Input() isLoading: boolean;
  @Input() socialImage: string;
  @Input() isSmallWindow: boolean;
  @Input() publication: any;
  @Input() mainNewsData: any;
  @Input() brandNewsData: any;

  @ViewChild('virtualScroll') virtualScroll: ElementRef;

  public isBrowser = false;
  public isServer: boolean;

  s3Url = environment.s3Url;
  faCaretDown = faCaretDown;
  id: string;
  title: string;
  short_description: string;
  content: string;
  category: string;
  author_name: string;
  date_time: Date;
  last_modified: Date;
  media: any;
  brandNews: any;
  newsShow = false;
  designation: any;
  author_media: any;
  url: string;
  shareDescription: string;
  shareHashtags: string;
  scrollbarOptions: any;
  openVideoPlayer = false;
  sponsorship = false;
  sponsorship_position: string;
  isViewComment: boolean;
  full_url;
  slideConfig: any;
  isBrand: boolean;
  adsImages: Array<object> = [];
  fb_url: string;
  default_fb_url: string;
  isDefault_fb = false;
  brand_id: string;
  sponsorContent = false;
  storyContent: any;
  mainNews: any;
  trendingNews: any;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isServer = isPlatformServer(platformId);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.storyContent = this.details.content;
    this.apiService
      .getAPI(`terms`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (typeof result !== 'undefined') {
          if (typeof result.data !== 'undefined' && result.data !== null) {
            result.data.forEach((brand) => {
              if (brand !== '' && brand !== null) {
                let brandRegex = new RegExp(brand);
                if (brandRegex.test(this.storyContent)) {
                  this.sponsorContent = true;
                }
              }
            });
          }
        }
      });
      
    this.shareHashtags = '1851, Social';
    this.isViewComment = false;
    this.isBrand = this.brandSlug === '1851' ? false : true;
    this.apiService
      .getAPI(`${this.brandSlug}/ads`)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((a_result) => {
        a_result['data'].forEach((ad) => {
          if (ad.type === 'Story Ad') {
            this.adsImages.push(ad);
          }
        });
      });
    this.default_fb_url = `https://www.facebook.com/plugins/page.php?href=${environment.fbUrl}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
    if (this.details.brand) {
      if (
        typeof this.details.brand.fb_page_url === 'undefined' ||
        this.details.brand.fb_page_url === null
      ) {
        this.fb_url = environment.fbUrl;
      } else {
        this.fb_url = this.details.brand.fb_page_url;
      }
    } else {
      this.fb_url = environment.fbUrl;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    const details: SimpleChange = changes.details;
    const trending: SimpleChange = changes.trending;
    const mainNewsData: SimpleChange = changes.mainNewsData;
    const brandNewsData: SimpleChange = changes.brandNewsData;
    if (
      typeof details !== 'undefined' &&
      typeof details.currentValue !== 'undefined'
    ) {
      this.id = details.currentValue.id;
      this.title = details.currentValue.title;
      this.shareDescription = details.currentValue.title;
      this.short_description = details.currentValue.short_description;
      this.content = details.currentValue.content;
      this.category = details.currentValue.category;
      this.author_name = details.currentValue.author
        ? details.currentValue.author.name
        : '';
      this.designation = details.currentValue.author
        ? details.currentValue.author.designation
        : '';
      this.author_media = details.currentValue.author
        ? details.currentValue.author.media
        : '';
      this.date_time = new Date(
        details.currentValue.posted_on.replace(/-/g, '/')
      );
      this.last_modified = new Date(
        details.currentValue.last_modified.replace(/-/g, '/')
      );
      this.media = details.currentValue.media;
      this.sponsorship = details.currentValue.sponsorship.is_sponsored;
      this.sponsorship_position = details.currentValue.sponsorship.position;
      if (typeof this.media !== 'undefined') {
        if (
          typeof this.media.type !== 'undefined' &&
          this.media.type === 'video'
        ) {
          this.url = this.media.url;
        } else {
          this.url = '';
        }
      } else {
        this.url = '';
      }
      if (this.isBrowser) {
        if (this.brandSlug !== '1851') {
          this.full_url = `${window.location.origin}/${this.brandSlug}`;
        } else {
          this.full_url = `${window.location.origin}/${this.details.slug}`;
        }
      }
    }
    if (
      typeof trending !== 'undefined' &&
      typeof trending.currentValue !== 'undefined'
    ) {
      this.trendingNews = trending.currentValue;
      this.newsShow = true;
    }
    if (
      typeof mainNewsData !== 'undefined' &&
      typeof mainNewsData.currentValue !== 'undefined'
    ) {
      this.mainNews = mainNewsData.currentValue;
    }
    if (
      typeof brandNewsData !== 'undefined' &&
      typeof brandNewsData.currentValue !== 'undefined'
    ) {
      this.brandNews = brandNewsData.currentValue;
    }
  }
  readMore(story: any, fragment) {
    let slug = '';
    if (typeof story?.brand !== 'undefined' && story?.brand?.slug !== '1851') {
      slug = `${story?.brand?.slug}/`;
    }
    return `${slug}${story?.slug}#${fragment}`;
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $('.modal').on('hidden.bs.modal', function () {
        $('.modal').hide();
        $('.modal iframe').attr('src', $('.modal iframe').attr('src'));
      });
      $('.tooltiptext').click(function (e) {
        e.preventDefault();
      });
      $('.tooltiptext-link').click(function (e) {
        e.preventDefault();
        window.location.href = '/home/termsofuse#sponsored';
      });
      window['__sharethis__'].load('inline-share-buttons', {
        alignment: 'left',
        id: `inline-buttons-${this.index}`,
        enabled: true,
        font_size: 15,
        padding: 8,
        radius: 0,
        networks: ['facebook', 'twitter', 'linkedin'],
        size: 50,
        url: this.shareUrl(),
        title: this.title,
        image: this.socialImage,
        description: this.shareDescription,
      });
      const fb_timer = setInterval(() => {
        if (!$(`#mobile_block_fb_link${this.id}`).length) {
          clearInterval(fb_timer);
          setTimeout(() => {
            if ($(`#mobile_fb_plugin${this.id}`).height() < 100) {
              this.isDefault_fb = true;
            }
          }, 10000);
        }
      }, 1000);

      // streams
      const click$ = fromEvent(
        $(`#inline-buttons-${this.index} .st-btn`),
        'click'
      );
      click$
        .pipe(
          map((i: any) => i.currentTarget),
          debounceTime(1000),
          takeUntil(this.onDestroy$)
        )
        .subscribe((val) => {
          const data = $(val).data();
          this.apiService
            .getAPI(`get-brand-by-slug/${this.brandSlug}`)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((result) => {
              if (typeof result.id !== 'undefined' && result.id !== null) {
                const brand_name = result.slug;
                const gaData = result['ga'];
                if (result.id !== '1851' && this.isBrowser) {
                  if (gaData) {
                    ga(`${brand_name}.send`, {
                      hitType: 'social',
                      socialNetwork: `ShareThis_${data.network}`,
                      socialAction: 'share',
                      socialTarget: this.shareUrl(),
                    });
                  }
                }
              } else {
                ga(`send`, {
                  hitType: 'social',
                  socialNetwork: `ShareThis_${data.network}`,
                  socialAction: 'share',
                  socialTarget: this.shareUrl(),
                });
              }
            });
        });
      this.apiService
        .getAPI(`get-brand-by-slug/${this.brandSlug}`)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((result) => {
          if (typeof result.id !== 'undefined' && result.id !== null) {
            this.brand_id = result.id;
          } else {
            this.brand_id = '1851';
          }
          const a_tags = document
            .getElementById(this.id)
            .getElementsByTagName('A');
          const category = `${this.id}+${this.brand_id}+${this.type}`;
          const vm = this;
          const gaData = result['ga'];
          for (let i = 0; i < a_tags.length; i++) {
            if (
              a_tags[i]['hostname'].toLowerCase() !==
              window.location.hostname.toLowerCase()
            ) {
              a_tags[i].addEventListener('click', function (event) {
                const action = a_tags[i]['hostname'].toLowerCase();
                if (this.brand_id === '1851') {
                  ga('send', 'event', category, action, vm.brand_id);
                } else {
                  if (gaData) {
                    ga(
                      `${vm.brandSlug}.send`,
                      'event',
                      category,
                      action,
                      vm.brand_id
                    );
                  }
                }
              });
            }
          }
        });
    }
  }

  nextArticle() {
    window.scrollTo(0,document.body.scrollHeight);
  }

  shareUrl() {
    const subUrl =
      this.brandSlug !== '1851'
        ? `${this.brandSlug}/${this.details.slug}`
        : `${this.details.slug}`;
    return `${window.location.origin}/${subUrl}`;
  }

  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
