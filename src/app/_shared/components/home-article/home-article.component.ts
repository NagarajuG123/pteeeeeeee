import { isPlatformBrowser } from '@angular/common';
import { Component, Input,Inject, OnInit,PLATFORM_ID } from '@angular/core';
import { CommonService } from 'src/app/_core/services/common.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-article',
  templateUrl: './home-article.component.html',
  styleUrls: ['./home-article.component.scss']
})
export class HomeArticleComponent implements OnInit {
  @Input() contents: any;
  @Input() typeSlug!: string;
  @Input() col!: string;
  @Input() class!: string;
  @Input() type!: string;
  @Input() column!: string;

  rowClass: string;
  isBrowser: boolean;
  s3Url = environment.s3Url;
  openVideoPlayer: boolean;
  url: string;

  constructor(
    public commonService: CommonService  ,
     @Inject(PLATFORM_ID) platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit(): void {
  }
  updateVideoUrl(url: string) {
    this.openVideoPlayer = true;
    this.url = url;
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      $(document).ready(function() {
        var $videoSrc;
        $('.video-btn').click(function() {
            $videoSrc = $(this).data("src");
        });
        $('#editorialModal').on('hide.bs.modal', function(e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    }
  }
}
