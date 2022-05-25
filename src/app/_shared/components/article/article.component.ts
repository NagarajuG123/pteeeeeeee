import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() contents: any;
  @Input() type = '';
  @Input() typeSlug!: string;
  @Input() col!: string;
  @Input() class!: string;

  s3Url = environment.s3Url;
  isBrowser: boolean;
  openVideoPlayer: boolean;
  url: string;

  constructor(public commonService: CommonService,
    @Inject(PLATFORM_ID) platformId: Object) {
      this.isBrowser = isPlatformBrowser(platformId);
    }
 
  ngOnInit(): void {}

  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
    console.log(this.url);
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $(document).ready(function() {
        var $videoSrc;
        $('.video-btn').click(function() {
            $videoSrc = $(this).data("src");
        });
        $("#editorialModal").on('hide.bs.modal', function (e) {
          $("#editorialModal iframe").attr("src", $("#editorialModal iframe").attr("src"));
      });
    });
    }
  }
}
