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
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/_core/services/common.service';
declare var FB: any;
declare var ga: Function;

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  detailsData: any[] = [];
  publication: any = [];
  storySlug: any = '';
  storyId: any;
  brandId = '1851';
  isBrowser: boolean = false;
  scrollbarOptions: any;
  throttle = 1000;
  scrollDistance = 3;
  scrollUpDistance = 2;
  dataLoading: boolean;
  schema: any;
  footer: any = [];
  header: any = [];
  defaultArticleSection = 'aggregated articles';
  subject: Subject<any> = new Subject();
  storyIndex: boolean;
  pageType = 'details';
  isLoading: boolean;
  isFirstSEO: boolean;
  apiUrl = '';
  isBrand: boolean;
  brandList: any = [];
  type = '';
  brandSlug :string;
  originalUrl = '';
  gaVisitedUrls: Array<any> = [];
  storyApiUrl = '';
  isAuthorPage: boolean;
  defaultFbUrl: string;
  fbUrl: string;
  isDefaultFb = false;
  isRedirect: boolean;
  isServer: boolean;
  mainNews: any;
  brandNews: any;
hasMore:any;

  private onDestroySubject = new Subject();
  onDestroy$ = this.onDestroySubject.asObservable();
  metaData: any;
  first: boolean;
  duplicate: boolean;
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
    private location: Location,
    private meta: Meta,
    public commonService: CommonService

  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit(): void {
    this.getBrandList();
    this.setbrand();
    this.isLoading = false;
    this.dataLoading = false;
    this.isAuthorPage = false;
    this.storyIndex = false;
    this.duplicate = false;
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

            this.apiService
              .getAPI('1851/publication-instance')
              .pipe(takeUntil(this.onDestroy$))
              .subscribe((result) => {
                this.publication = result;
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
                forkJoin([
                  this.apiService.getAPI(`1851/spotlight/industry?limit=4&offset=0`),
                  this.apiService.getAPI(
                    `1851/latest?limit=4&offset=0`
                  ),
                ])
                  .pipe(takeUntil(this.onDestroy$))
                  .subscribe((result) => {
                    this.mainNews = result[0].data;
                    this.brandNews = result[1].data;
                  });
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
                      .getAPI2(`header`)
                      .subscribe((result) => {
                        let coverDate =
                          result.data.monthlyCover.coverUrl;
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
              });
          });
      });
  }
  initLoad() {
    let headerApi = 'header';
    if (this.brandSlug !== '1851') {
      headerApi = `header?slug=${this.brandSlug}`;
    }
    forkJoin([
      this.apiService.getAPI(`${this.storyApiUrl}`),
      this.apiService.getAPI2(headerApi),
      this.apiService.getAPI(`1851/publication-instance`),
      this.apiService.getAPI2(`footer`),
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.publication = result[2];
        this.footer = result[3];

        result['story'] = result[0];
        result['header'] = result[1]['data'];

        if (result['story'].data === null) {
          window.location.href = '404';
          return;
        }
        this.detailsData.push(this.htmlBinding(result['story'].data));
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
          let socialLinks = [];
          result['header'].socialMedia.forEach((item:any)=>{
            socialLinks.push(item.url);
          });
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
              url: `${environment.imageResizeUrl}/fit-in/500x261/${result['story'].data.media.path}`,
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
              sameAs: socialLinks,
            },
          };
          this.schema = json;
        } else {
          this.schema = {};
        }
        this.defaultFbUrl = `https://www.facebook.com/plugins/page.php?href=${environment.fbUrl}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
        if (result['story'].data.brand) {
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
          // const image_url = `${environment.imageResizeUrl}/fit-in/500x261/${encodeURIComponent(
          //   this.changeMaxResultImg(metas.og['media']['path'])
          // )}`;
          const image_url = `${environment.imageResizeUrl}/fit-in/500x261/${metas.og['media']['path']
          }`;
          this.meta.updateTag(
            { property: `og:image`, content: image_url },
            `property='og:image'`
          );
          this.meta.updateTag(
            { property: `og:image:secure_url`, content: image_url },
            `property='og:image:secure_url'`
          );
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
          const twitter_url = `${environment.imageResizeUrl}/fit-in/500x261/${metas.twitter['media']['path']
          }`;
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

  addItems(limit, offset) {
    if (this.pageType === 'details' && !this.isLoading && this.apiUrl) {
      this.isLoading = true;
      this.hasMore = false;
      this.apiService
        .getAPI(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
        .subscribe((result) => {
          let storyId;
          this.isLoading = false;
          if (typeof result !== 'undefined') {
            this.hasMore = true;
            if (
              this.type === 'dynamicpage' ||
              (this.type === 'brand-latest-stories' && this.brandId === '1851')
            ) {
              storyId = result.data.stories[0].id;
            } else if (this.type === 'brand') {
              storyId = result.data.articles[0].id;
            } else {
              storyId = result.data[0].id;
            }
          if (
            this.detailsData.find((o) => o.id == storyId) &&
            !this.duplicate
          ) {
            this.addItems(1, this.detailsData.length);
            this.duplicate = true;
            return;
          } else if (this.detailsData.find((o) => o.id !== storyId)) {
            let url = this.brandSlug
              ? `${this.brandSlug}/story/${storyId}`
              : `story/${storyId}`;
            this.apiService.getAPI(`${url}`).subscribe((result) => {
              this.detailsData.push(this.htmlBinding(result.data));
            });
          } else {
            if (this.detailsData.length == 1) {
              this.addItems(1, 1);
              this.first = true;
              return;
            }
          }
        }
       
          this.storyIndex = true;
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

  onScrollDown() {
    if (!this.dataLoading && this.apiUrl) {
      this.dataLoading = true;
      let offset;
      if (this.first || this.duplicate) {
        offset = this.detailsData.length;
      } else {
        offset = this.detailsData.length - 1;
      }
      this.storyIndex ? this.addItems(1, offset) : this.addItems(1, 0);
    }
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
    const elemView = elemTop + 1400;

    return elemBottom <= docViewBottom && elemView >= docViewTop;
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
