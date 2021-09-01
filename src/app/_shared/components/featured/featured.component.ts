import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  PLATFORM_ID,
  Inject,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { CommonService } from 'src/app/_core/services/common.service';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const RESULT_KEY = makeStateKey<any>(`featuredState`);

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() slug = '1851';
  @Input() apiUrl!: any;
  @Input() type = '';
  @ViewChild('brandLeft') brandLeft: ElementRef | undefined;
  @ViewChild('brandRight') brandRight: ElementRef | undefined;
  @ViewChild('virtualScroll') virtualScroll: ElementRef | any;

  featuredData: any = [];
  highlight: any = [];
  scrollbarOptions: any;
  isBrowser!: boolean;
  highlightImageload!: boolean;
  scrollOffset: number = 0;
  isCall = false;

  constructor(
    private renderer: Renderer2,
    private apiService: ApiService,
    private commonService: CommonService,
    private tstate: TransferState,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.scrollbarOptions = {
      axis: 'y',
      theme: 'minimal-dark',
      callbacks: {
        onTotalScroll: () => {
          if (!this.isCall) {
            this.getMoreItem();
          }
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.apiUrl = changes.apiUrl.currentValue;
    this.getFeatured();
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      this.ajustHeight();
    }
  }
  getFeatured() {
    if (this.tstate.hasKey(RESULT_KEY)) {
      const featuredData = this.tstate.get(RESULT_KEY, {});
      this.highlight = featuredData['highlight'];
      this.featuredData = featuredData['data'];
    }
    else{
      const featuredData = {};
    this.apiService
      .getAPI(`${this.apiUrl}?limit=10&offset=${this.scrollOffset}`)
      .subscribe((response) => {
        if (response.data != null) {
          featuredData['highlight'] = response.data[0];
          featuredData['data'] = response.data.slice(1);
        }
      });
      this.tstate.set(RESULT_KEY, featuredData);
    } 
  }
  readMore(item: any) {
    return this.commonService.readMore(item);
  }
  isVideo(item: any) {
    return this.commonService.isVideo(item);
  }
  getMoreItem() {
    this.isCall = true;
    this.apiService
      .getAPI(`${this.apiUrl}?limit=10&offset=${this.scrollOffset + 10}`)
      .subscribe((result) => {
        result['data'].forEach((article: any) => {
          this.featuredData.push(article);
        });
        this.scrollOffset += 10;
        this.isCall = false;
      });
  }

  onResize(event: any) {
    this.highlightImageload = true;
    this.ajustHeight();
  }
  ajustHeight() {
    const vm = this;
    const timer = setInterval(() => {
      if (
        typeof vm.brandLeft !== 'undefined' &&
        typeof vm.brandRight !== 'undefined' &&
        vm.highlightImageload
      ) {
        vm.renderer.setStyle(
          vm.brandRight.nativeElement,
          'height',
          `${vm.brandLeft.nativeElement.offsetHeight}px`
        );
        vm.renderer.setStyle(
          vm.virtualScroll.nativeElement,
          'height',
          `${vm.brandLeft.nativeElement.offsetHeight}px`
        );
        vm.highlightImageload = false;
        clearInterval(timer);
      }
    }, 100);
  }
}
