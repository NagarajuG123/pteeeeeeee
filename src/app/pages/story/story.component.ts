import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  RendererFactory2,
  ViewEncapsulation,
} from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from 'src/app/_core/services/meta.service';
import {
  DOCUMENT,
  isPlatformBrowser,
  isPlatformServer,
  Location,
} from '@angular/common';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, forkJoin } from 'rxjs';
import { EmbedService } from 'src/app/_core/services/embed.service';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { BrandNews } from 'src/app/_core/models/brandNews';
import { DetailsData } from 'src/app/_core/models/detailsData';
import { CommonService } from 'src/app/_core/services/common.service';
declare var FB: any;
declare var ga: Function;

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  detailsData: DetailsData[] = [];
  newsData: BrandNews[] = [];
  adsData: any = [];
  publication: any = [];
  storySlug: any = '';
  storyId: any;
  brandId = '1851';
  isBrowser: boolean = false;
  scrollbarOptions: any;
  throttle = 1000;
  scrollDistance = 3;
  scrollUpDistance = 2;
  dataLoading: boolean = false;
  schema: any;
  footer: any = [];
  header: any = [];
  defaultArticleSection = 'aggregated articles';
  scrollEvent = new BehaviorSubject<boolean>(false);
  subject: Subject<any> = new Subject();
  storyIndex: boolean;
  pageType = 'details';
  isLoading: boolean = false;
  isFirstSEO: boolean;
  apiUrl = '';
  isBrand: boolean;
  brandList: any = [];
  type = '';
  brandSlug = '1851';
  originalUrl = '';
  gaVisitedUrls: Array<any> = [];
  storyApiUrl = '';
  isAuthorPage: boolean = false;
  defaultFbUrl: string;
  fbUrl: string;
  newsTitle = '';
  isDefaultFb = false;
  isRedirect: boolean;
  isServer: boolean;
  redirectUrl: string;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  metaData: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private metaService: MetaService,
    private embedService: EmbedService,
    @Inject(PLATFORM_ID) platformId: Object,
    private sanitizer: DomSanitizer,
    private googleAnalyticsService: GoogleAnalyticsService,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private dom,
    private commonService: CommonService,
    private location: Location,
    private meta: Meta
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit(): void {
    this.setConfig();
    this.setScrollEvent();
    this.getBrandList();
    this.setbrand();
  }

  setbrand() {
    this.route.queryParams
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((query) => {
        this.route.paramMap
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(async (params) => {
            if (
              this.router.url.includes('story/details') ||
              this.router.url.includes('storypage/preview')
            ) {
              this.pageType = 'preview';
              this.brandSlug = '1851';
              this.brandId = '1851';
              if (this.router.url.includes('story/details')) {
                this.storyId = query['id'];
              } else {
                this.storyId = params.get('storyId');
              }
              this.type = '';
            } else {
              if (this.router.url.includes('#')) {
                this.type = this.router.url.slice(
                  this.router.url.lastIndexOf('#') + 1,
                  this.router.url.length
                );
              } else {
                this.type = 'stories';
              }
              this.brandSlug = params.get('brandSlug')
                ? params.get('brandSlug')
                : '1851';
              this.storySlug = params.get('storySlug');
              this.storyId = params.get('storySlug');
              this.storyId = this.storyId
                ? this.storyId.slice(
                    this.storyId.lastIndexOf('-') + 1,
                    this.storyId.length
                  )
                : '';
            }
            this.storyApiUrl = this.brandSlug
              ? `${this.brandSlug}/story/${this.storyId}`
              : `story/${this.storyId}`;
            let isAuthorPage = false;
            this.isBrand = this.brandSlug === '1851' ? false : true;

            this.getAds();

            this.apiService
              .getAPI('1851/publication-instance')
              .pipe(takeUntil(this.onDestroy$))
              .subscribe((result) => {
                this.publication = result;
                this.getNewsTitle(this.publication.id);
              });

            this.apiService
              .getAPI(`get-brand-by-slug/${this.brandSlug}`)
              .pipe(takeUntil(this.onDestroy$))
              .subscribe((result) => {
                if (typeof result.id !== 'undefined' && result.id !== null) {
                  this.brandId = result.id;
                  if (
                    this.brandId !== '1851' &&
                    this.isBrowser &&
                    result['ga']
                  ) {
                    this.googleAnalyticsService.appendGaTrackingCode(
                      result['ga']['1851_franchise'],
                      result['ga']['tracking_code'],
                      result['ga']['gtm_code'],
                      result.slug
                    );
                  }
                } else {
                  this.brandId = '1851';
                  this.brandSlug = '1851';
                }
                switch (this.type) {
                  case 'stories':
                    this.apiUrl = `${this.brandId}/featured-articles`;
                    break;
                  case 'trending':
                    this.apiUrl = `${this.brandId}/trending`;
                    break;

                  case 'columns':
                    this.apiUrl = `${this.brandId}/columns`;
                    break;

                  case 'franbuzz':
                    this.apiUrl = `${this.brandId}/news?lean=true`;
                    break;

                  case 'trending-sponsored':
                    this.apiUrl = `${this.brandId}/trending/sponsored`;
                    break;

                  case 'people':
                    this.apiUrl = `${this.brandId}/spotlight/people`;
                    break;

                  case 'franchisee':
                    this.apiUrl = `${this.brandId}/spotlight/franchisee`;
                    break;

                  case 'franchisor':
                    this.apiUrl = `${this.brandId}/spotlight/franchisor`;
                    break;

                  case 'home-envy':
                    this.apiUrl = `${this.brandId}/spotlight/home-envy`;
                    break;

                  case 'home-buzz':
                    this.apiUrl = `${this.brandId}/spotlight/home-buzz`;
                    break;

                  case 'homes-to-own':
                    this.apiUrl = `${this.brandId}/spotlight/homes-to-own`;
                    break;

                  case 'celebrities':
                    this.apiUrl = `${this.brandId}/spotlight/celebrities`;
                    break;

                  case 'products':
                    this.apiUrl = `${this.brandId}/spotlight/products`;
                    break;

                  case 'destinations':
                    this.apiUrl = `${this.brandId}/spotlight/destinations`;
                    break;

                  case 'industry':
                    this.apiUrl = `${this.brandId}/spotlight/industry`;
                    break;

                  case 'brand-news':
                    this.apiUrl = `${this.brandId}/brand-news/most-recent`;
                    break;

                  case 'dynamicpage':
                    this.apiUrl = `home-page-featured-content`;
                    break;

                  case 'brand-latest-stories':
                    if (this.brandId === '1851') {
                      this.apiUrl = `brand-latest-stories`;
                    } else {
                      this.apiUrl = `${this.brandId}/brand-latest-stories`;
                    }
                    break;

                  case 'most-recent':
                    this.apiUrl = `${this.brandId}/people/most-recent`;
                    break;

                  case 'monthlydetailspage':
                    this.apiService
                      .getAPI('1851/header')
                      .subscribe((result) => {
                        let coverDate =
                          result.data['monthly-cover'].media.url.cover_url;
                        let data = coverDate.split('/monthlydetails/').pop();
                        this.apiUrl = `${this.brandId}/journal/cover-details/${data}`;
                      });
                    break;

                  case 'editorials':
                    isAuthorPage = true;
                    this.apiService
                      .getAPI(`1851/story/${this.storyId}`)
                      .pipe(takeUntil(this.onDestroy$))
                      .subscribe((s_result) => {
                        this.apiUrl = `author/${s_result.data.author.slug}/editorials`;
                        this.initLoad();
                      });
                    break;

                  case 'branded-contents':
                    isAuthorPage = true;
                    this.apiService
                      .getAPI(`1851/story/${this.storyId}`)
                      .pipe(takeUntil(this.onDestroy$))
                      .subscribe((s_result) => {
                        this.apiUrl = `author/${s_result.data.author.slug}/branded-contents`;
                        this.initLoad();
                      });
                    break;

                  case 'brand':
                    this.apiUrl = `${this.brandId}/brand-view`;
                    break;

                  case 'category-banner':
                    this.apiUrl = `${this.brandId}/people/featured`;
                    break;

                  case 'featured':
                    this.apiUrl = `${this.brandId}/featured-articles`;
                    break;

                  case 'frannews':
                    this.apiUrl = `${this.brandId}/news`;
                    break;

                  case 'trendingbrandbuzz':
                    this.apiUrl = `${this.brandId}/trending-buzz`;
                    break;

                  case 'category-trending':
                    this.apiUrl = `${this.brandId}/people/trending`;
                    break;

                  default:
                    break;
                }
                if (!isAuthorPage) {
                  this.initLoad();
                }

                this.apiService
                  .getAPI(`${this.brandId}/news?lean=true&limit=10&offset=0`)
                  .pipe(takeUntil(this.onDestroy$))
                  .subscribe((n_result) => {
                    this.newsData = n_result.data;
                  });
              });
          });
      });
  }
  initLoad() {
    forkJoin([
      this.apiService.getAPI(`${this.storyApiUrl}`),
      this.apiService.getAPI(`${this.brandSlug}/header`),
      this.apiService.getAPI(`1851/publication-instance`),
      this.apiService.getAPI(`1851/footer`),
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.publication = result[2];

        result['story'] = result[0];
        result['header'] = result[1]['data'];

        if (
          result['header']['logo'] &&
          result['header']['logo']['width'] > 240
        ) {
          result['header']['logo']['width'] = 240;
          result['header']['logo']['height'] = 24;
        }

        if (result['story'].data === null) {
          window.location.href = '404';
          return;
        }
        this.detailsData.push(this.htmlBinding(result['story'].data));
        this.detailsData = Object.assign([], this.detailsData);
        if (
          typeof result['story'].meta !== 'undefined' &&
          result['story'].meta !== null
        ) {
          let posted_date = new Date(result['story'].data.posted_on);
          let hoursDiff =
            posted_date.getHours() - posted_date.getTimezoneOffset() / 60;
          let minutesDiff =
            (posted_date.getHours() - posted_date.getTimezoneOffset()) % 60;
          posted_date.setHours(hoursDiff);
          posted_date.setMinutes(minutesDiff);
          let modified_date = new Date(result['story'].data.last_modified);
          let hours =
            modified_date.getHours() - modified_date.getTimezoneOffset() / 60;
          let minutes =
            (modified_date.getHours() - modified_date.getTimezoneOffset()) % 60;
          modified_date.setHours(hours);
          modified_date.setMinutes(minutes);
          const json = {
            '@context': 'https://schema.org/',
            '@type': 'Article',
            headline: result['story'].meta.seo.title,
            name: this.publication.title,
            url: `${environment.appUrl}${this.router.url}`,
            datePublished:
              posted_date.toISOString().replace(/.\d+Z$/g, '') + '-05:00',
            dateModified:
              modified_date.toISOString().replace(/.\d+Z$/g, '') + '-05:00',
            articleSection: result['story'].data.category.name
              ? result['story'].data.category.name
              : this.defaultArticleSection,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${environment.appUrl}${this.router.url}`,
            },
            author: {
              '@type': 'Person',
              name:
                result['story'].data.author === null ||
                typeof result['story'].data.author === 'undefined'
                  ? ''
                  : result['story'].data.author.name,
            },
            image: {
              '@type': 'ImageObject',
              url:
                result['story'].data.media.type === 'image'
                  ? `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/${result['story'].data.media.url}`
                  : `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/${result['story'].data.media.placeholder}`,
              width: 802,
              height: 451,
            },
            publisher: {
              '@type': 'Organization',
              name: this.publication.title,
              logo: {
                '@type': 'ImageObject',
                url: result['header']['logo']['url'],
                width: result['header']['logo']['width'],
                height: result['header']['logo']['height'],
              },
              sameAs: [
                result[3].data['learn-more']['social-media']['fb-url'],
                result[3].data['learn-more']['social-media']['twitter-url'],
                result[3].data['learn-more']['social-media']['instagram-url'],
                result[3].data['learn-more']['social-media']['linkedin-url'],
              ],
            },
          };
          this.schema = json;
        } else {
          this.schema = {};
        }
        // tslint:disable-next-line:max-line-length
        this.defaultFbUrl = `https://www.facebook.com/plugins/page.php?href=${environment.fbUrl}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
        if (result['story'].data.brand) {
          // tslint:disable-next-line:max-line-length
          if (
            typeof result['story'].data.brand.fb_page_url === 'undefined' ||
            result['story'].data.brand.fb_page_url === null ||
            result['story'].data.brand.fb_page_url === ''
          ) {
            this.fbUrl = environment.fbUrl;
          } else {
            this.fbUrl = result['story'].data.brand.fb_page_url;
          }
        } else {
          this.fbUrl = environment.fbUrl;
        }
        if (this.isBrowser) {
          this.isDefaultFb = true;
          this.checkFacebookPagePlugin(3000);
          // if (
          //   window.location.pathname !==
          //   `${
          //     result['story'].data.brand.slug === '1851'
          //       ? ''
          //       : `/${result['story'].data.brand.slug}`
          //   }/${result['story'].data.slug}`
          // ) {
          //   window.location.href = `${window.location.origin}${
          //     result['story'].data.brand.slug === '1851'
          //       ? ''
          //       : `/${result['story'].data.brand.slug}`
          //   }/${result['story'].data.slug}${window.location.hash}`;
          // }
        }
        if (!this.isFirstSEO) {
          this.isFirstSEO = true;
          this.metaData = result['story'].meta;

          if (
            this.router.url.includes('story/details') ||
            this.router.url.includes('storypage/preview')
          ) {
            this.meta.updateTag(
              { name: 'robots', content: 'noindex' },
              `name='robots'`
            );
            this.meta.updateTag(
              { name: 'googlebot', content: 'noindex' },
              `name='googlebot'`
            );
          } else {
            if (
              typeof this.metaData !== 'undefined' &&
              this.metaData !== null
            ) {
              this.setMeta(this.metaData);
            }
          }
        }
        if (this.pageType === 'details') {
          this.addItems(1, 0);
        }
        let url = '';
        if (this.brandId === '1851') {
          url = `${environment.appUrl}${
            result['story'].data.brand.slug === '1851' ||
            result['story'].data.brand.slug === ''
              ? ''
              : `/${result['story'].data.brand.slug}`
          }${this.router.url}`;
        } else if (this.brandId !== '1851') {
          url = `${environment.appUrl}${
            result['story'].data.brand.slug === '1851' ||
            result['story'].data.brand.slug === ''
              ? `/${this.storySlug}`
              : this.router.url
          }`;
        }
        this.createCanonicalURL(url);
      });
  }

  setMeta(metas) {
    if (typeof metas === 'undefined' || metas === null) {
      return;
    }
    if (metas.seo) {
      const seoKeys = Object.keys(metas.seo);
      for (const key of seoKeys) {
        if (key === 'robots') {
          continue;
        } else if (key === 'indexable') {
          if (metas.seo.indexable) {
            this.meta.updateTag({ name: 'robots', content: 'index, follow' });
          } else {
            this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
          }
        } else if (key === 'title') {
          this.metaService.setTitle(metas.seo.title);
        } else if (metas.seo[key] !== null) {
          this.meta.updateTag(
            { name: key, content: metas.seo[key] },
            `name='${key}'`
          );
        }
      }
    }
    if (metas.og) {
      const ogKeys = Object.keys(metas.og);
      for (const key of ogKeys) {
        if (key === 'media' && metas.og[key] !== null) {
          // tslint:disable-next-line:max-line-length
          const image_url = `${
            environment.imageResizeUrl
          }/insecure/fill/500/261/no/0/plain/${encodeURIComponent(
            this.changeMaxResultImg(metas.og['media']['url'])
          )}`;
          this.meta.updateTag(
            { property: `og:image`, content: image_url },
            `property='og:image'`
          );
          this.meta.updateTag(
            { property: `og:image:secure_url`, content: image_url },
            `property='og:image:secure_url'`
          );
          // this.meta.updateTag({property: `og:image`, content: `${metas.og['media']['url']}`}, `property='og:image'`);
          // tslint:disable-next-line:max-line-length
          // this.meta.updateTag({property: `og:image:secure_url`, content: `${metas.og['media']['url']}`}, `property='og:image:secure_url'`);
        } else if (metas.og[key] !== null) {
          this.meta.updateTag(
            { property: `og:${key}`, content: metas.og[key] },
            `property='og:${key}'`
          );
        }
      }
      this.meta.updateTag(
        { property: `og:type`, content: `article` },
        `property='og:type'`
      );
      this.meta.updateTag(
        { property: `og:image:width`, content: `500` },
        `property='og:image:width'`
      );
      this.meta.updateTag(
        { property: `og:image:height`, content: `261` },
        `property='og:image:height'`
      );
    }
    if (metas.twitter) {
      const twitterKeys = Object.keys(metas.twitter);
      for (const key of twitterKeys) {
        if (key === 'media' && metas.twitter[key] !== null) {
          // tslint:disable-next-line:max-line-length
          const twitter_url = `${
            environment.imageResizeUrl
          }/insecure/fill/500/261/no/0/plain/${encodeURIComponent(
            this.changeMaxResultImg(metas.twitter['media']['url'])
          )}`;
          this.meta.updateTag(
            { name: `twitter:image`, content: twitter_url },
            `name='twitter:image'`
          );
        } else if (metas.twitter[key] !== null) {
          this.meta.updateTag(
            { name: `twitter:${key}`, content: metas.twitter[key] },
            `name='twitter:${key}'`
          );
        }
      }
    }
    if (metas['fb-app-id']) {
      this.meta.updateTag(
        { property: 'fb:app_id', content: metas['fb-app-id'] },
        `property='fb:app_id'`
      );
    }
  }
  changeMaxResultImg(media) {
    if (media.includes('maxresdefault')) {
      media = media.replace('maxresdefault', 'hqdefault');
    } else if (media.includes('sddefault')) {
      media = media.replace('sddefault', 'hqdefault');
    }
    return encodeURIComponent(media);
  }

  checkFacebookPagePlugin(delay) {
    setTimeout(() => {
      if ($('#block_fb_link').length === 1) {
        FB.XFBML.parse();
        this.checkFacebookPagePlugin(delay + 1500);
      }
    }, delay);
  }

  //brand list for check terms in main site story
  getBrandList() {
    this.apiService.getAPI(`terms`).subscribe((result) => {
      if (typeof result !== 'undefined') {
        if (typeof result.data !== 'undefined' && result.data !== null) {
          result.data.forEach((brand) => {
            if (brand !== '' && brand !== null) {
              if (brand.includes("'")) {
                const regex = new RegExp("'");
                const regex_brand = brand.replace(regex, '’');

                this.brandList.push(regex_brand);
              }
              this.brandList.push(brand);
            }
          });
          this.brandList.sort();
          this.brandList.reverse();
        }
      }
    });
  }
  //scroll stroy
  setScrollEvent() {
    this.scrollEvent.subscribe((res) => {
      if (res && this.detailsData) {
        this.storyIndex
          ? this.addItems(1, this.detailsData.length + 1)
          : this.addItems(1, this.detailsData.length);
      }
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.subject
        .pipe(debounceTime(500), takeUntil(this.onDestroy$))
        .subscribe(() => {
          const distance = this.adsData.length ? 900 : 500;
          $(window).scroll(function () {
            if (
              $(document).height() -
                $(window).scrollTop() -
                $('#footer').outerHeight() >
              $('#banner_brandNews').outerHeight()
            ) {
              if ($(window).scrollTop() > distance) {
                $('#banner_brandNews').addClass('sticky_branner_header');
                $('#banner_brandNews').removeClass('sticky_branner_bottom');
              } else {
                $('#banner_brandNews').removeClass('sticky_branner_header');
                $('#banner_brandNews').removeClass('sticky_branner_bottom');
              }
            } else {
              if ($(window).scrollTop() > distance) {
                $('#banner_brandNews').addClass('sticky_branner_bottom');
                $('#banner_brandNews').removeClass('sticky_branner_header');
              } else {
                $('#banner_brandNews').removeClass('sticky_branner_bottom');
                $('#banner_brandNews').removeClass('sticky_branner_header');
              }
            }
          });
        });
    }
  }
  addItems(limit, offset) {
    if (this.pageType === 'details') {
      this.isLoading = true;
      this.apiService
        .getAPI(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
        .subscribe((result) => {
          let response;
          this.isLoading = false;
          if (typeof result !== 'undefined') {
            if (
              this.type === 'dynamicpage' ||
              (this.type === 'brand-latest-stories' && this.brandId === '1851')
            ) {
              response = result.data.stories;
            } else if (this.type === 'brand') {
              response = result.data.articles;
            } else {
              response = result.data;
            }
          }
          response.forEach((item) => {
            if (parseInt(this.storyId, 10) !== item.id) {
              this.detailsData.push(this.htmlBinding(item));
            } else {
              if (limit === 1) {
                this.addItems(limit, offset + 1);
                this.storyIndex = true;
                return;
              }
            }
          });
          this.detailsData = Object.assign([], this.detailsData);
          this.dataLoading = false;
          if (!this.isFirstSEO) {
            this.isFirstSEO = true;
            for (let i = 0; i < this.detailsData.length; i++) {
              if (typeof this.detailsData[i]['meta'] !== 'undefined') {
                this.metaData = this.detailsData[i]['meta'];

                break;
              }
              if (
                typeof this.metaData !== 'undefined' &&
                this.metaData !== null
              ) {
                this.setMeta(this.metaData);
              }
            }
          }
        });
    }
  }
  createCanonicalURL(url) {
    const renderer = this.rendererFactory.createRenderer(this.dom, {
      id: '-1',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {},
    });
    const link = renderer.createElement('link');
    const head = this.dom.head;
    renderer.setAttribute(link, 'rel', 'canonical');
    renderer.setAttribute(link, 'href', url);
    renderer.appendChild(head, link);
  }
  readMore(item: any) {
    return this.commonService.readMore(item);
  }
  //Add tooltip and embed video
  htmlBinding(data) {
    if (typeof data === 'undefined' || data.content === null) {
      return;
    }
    if (data.content.changingThisBreaksApplicationSecurity) {
      data.content = data.content.changingThisBreaksApplicationSecurity;
    }
    if (!this.isBrand) {
      this.brandList.sort((a, b) => a.localeCompare(b));
      for (let i = 0; i < this.brandList.length; i++) {
        const existing_tooltip = `<span style="color:#EC0044 !important;">${this.brandList[i]}*</span>`;
        data.content = data.content.replace(
          existing_tooltip,
          this.brandList[i]
        );
        this.brandList[i] = this.brandList[i].replace(/&/g, '&amp;');
        let regex = new RegExp(this.brandList[i]);
        const tooltip = `<span style="color:#EC0044 !important;">brandlist_${i}_*</span>`;
        data.content = data.content.replace(regex, tooltip);
      }
      for (let j = 0; j < this.brandList.length; j++) {
        const regex_tooltip = new RegExp(`brandlist_${j}_`);
        const brand_tooltip = `${this.brandList[j]}`;
        data.content = data.content.replace(regex_tooltip, brand_tooltip);
      }
    }

    data.content = data.content.replace(/href=/g, 'target="_blank" href=');

    data.content = this.embedService.embedYoutube(data.content);
    data.content = this.embedService.embedVimeo(data.content);
    const bypassHTML = data;
    bypassHTML.content = this.sanitizer.bypassSecurityTrustHtml(
      bypassHTML.content
    );
    return bypassHTML;
  }
  setConfig() {
    this.scrollbarOptions = {
      axis: 'y',
      theme: 'minimal-dark',
      callbacks: {
        onTotalScroll: () => {},
      },
    };
  }

  getAds() {
    this.apiService.getAPI(`${this.brandSlug}/ads`).subscribe((result) => {
      result.data.forEach((ads: { type: string }) => {
        if (ads.type === 'Story Ad' || ads.type === 'story_ad') {
          this.adsData.push(ads);
        }
      });
      this.subject.next();
    });
  }
  getNews() {
    this.apiService
      .getAPI(`${this.brandId}/news?limit=10&offset=0`)
      .subscribe((result) => {
        this.newsData = result.data;
      });
  }
  getPublication() {
    this.apiService
      .getAPI('1851/publication-instance')
      .subscribe((response) => {
        this.publication = response;
        this.getNewsTitle(this.publication.id);
      });
  }
  getNewsTitle(id) {
    if (id == '1851') {
      this.newsTitle = 'Franchise Q&A ';
    } else if (id == 'EE') {
      this.newsTitle = 'Real Estate Q&A';
    } else {
      this.newsTitle = 'Travel Q&A';
    }
  }
  onScrollDown() {
    if (!this.dataLoading) {
      this.dataLoading = true;
      this.scrollEvent.next(true);
    }
  }
  getFooter() {
    this.apiService.getAPI(`1851/footer`).subscribe((response) => {
      this.footer = response.data;
    });
  }
  getHeader() {
    this.apiService
      .getAPI(`${this.brandSlug}/header`)
      .subscribe(async (response) => {
        this.header = response.data;
      });
  }
  setSchema() {
    this.apiService.getAPI(`${this.storyApiUrl}`).subscribe((result) => {
      if (typeof result.meta !== 'undefined' && result.meta !== null) {
        let posted_date = new Date(result.data.posted_on);
        let hoursDiff =
          posted_date.getHours() - posted_date.getTimezoneOffset() / 60;
        let minutesDiff =
          (posted_date.getHours() - posted_date.getTimezoneOffset()) % 60;
        posted_date.setHours(hoursDiff);
        posted_date.setMinutes(minutesDiff);
        this.schema = {
          '@context': 'https://schema.org/',
          '@type': 'Article',
          headline: result.meta.seo.title,
          name: this.publication.title,
          url: `${environment.appUrl}${this.router.url}`,
          datePublished:
            posted_date.toISOString().replace(/.\d+Z$/g, '') + '-05:00',
          dateModified:
            posted_date.toISOString().replace(/.\d+Z$/g, '') + '-05:00',
          articleSection: result.data.category.name
            ? result.data.category.name
            : this.defaultArticleSection,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${environment.appUrl}${this.router.url}`,
          },
          author: {
            '@type': 'Person',
            name:
              result.data.author === null ||
              typeof result.data.author === 'undefined'
                ? ''
                : result.data.author.name,
          },
          image: {
            '@type': 'ImageObject',
            url:
              result.data.media.type === 'image'
                ? `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/${result.data.media.url}`
                : `${environment.imageResizeUrl}/insecure/fill/500/261/no/0/plain/${result.data.media.placeholder}`,
            width: 802,
            height: 451,
          },
          publisher: {
            '@type': 'Organization',
            name: this.publication.title,
            logo: {
              '@type': 'ImageObject',
              url: this.header['logo']['url'],
              width: this.header['logo']['width'],
              height: this.header['logo']['height'],
            },
            sameAs: [
              this.footer.data['learn-more']['social-media']['fb-url'],
              this.footer.data['learn-more']['social-media']['twitter-url'],
              this.footer.data['learn-more']['social-media']['instagram-url'],
              this.footer.data['learn-more']['social-media']['linkedin-url'],
            ],
          },
        };
      } else {
        this.schema = {};
      }

      //facebook
      this.setFbUrl(result);
    });
  }
  setFbUrl(result) {
    this.defaultFbUrl = `https://www.facebook.com/plugins/page.php?href=${environment.fbUrl}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
    if (result.data.brand) {
      if (
        typeof result.data.brand.fb_page_url === 'undefined' ||
        result.data.brand.fb_page_url === null ||
        result.data.brand.fb_page_url === ''
      ) {
        this.fbUrl = environment.fbUrl;
      } else {
        this.fbUrl = result.data.brand.fb_page_url;
      }
    } else {
      this.fbUrl = environment.fbUrl;
    }
  }

  isScrolledIntoView(elem) {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();

    const elemTop = $(elem).offset().top;
    const elemBottom = elemTop + $(elem).height();

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    $('.element').each((index, element) => {
      if (this.pageType === 'details') {
        if (this.isScrolledIntoView(element)) {
          if (typeof $(element).data('id') !== 'undefined') {
            let newUrl =
              this.brandSlug !== '1851' && this.brandSlug
                ? `/${this.brandSlug}/${$(element).data('title')}`
                : `/${$(element).data('title')}`;
            newUrl =
              this.type && this.type !== 'featured-articles'
                ? `${newUrl}#${this.type}`
                : newUrl;
            if (this.originalUrl !== newUrl) {
              this.originalUrl = newUrl;
              if (this.isBrowser) {
                for (let i = 0; i < this.gaVisitedUrls.length; i++) {
                  if (this.gaVisitedUrls[i] === newUrl) {
                    return;
                  }
                }
                ga('set', 'page', newUrl);
                ga('send', 'pageview');
                ga(`${this.brandSlug}.set`, 'page', newUrl);
                ga(`${this.brandSlug}.send`, 'pageview');
                this.gaVisitedUrls.push(newUrl);
              }
            }
            this.location.replaceState(newUrl);
          }
        }
      }
    });
  }
  ngOnDestroy() {
    this.onDestroySubject.next(true);
    this.onDestroySubject.complete();
  }
}
