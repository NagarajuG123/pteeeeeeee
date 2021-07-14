import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from 'src/app/_core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/_core/services/common.service';
import { HttpClient } from '@angular/common/http';
import { MetaService } from 'src/app/_core/services/meta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/_core/services/validation.service';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  brandInfo: any = [];
  items: any;
  brandSlug: any;
  categories: any = [];
  validData = [];
  staticContent: any;
  pdf: any;
  selectedIndex: number = 0;
  inquireForm: any;
  isStory: boolean = false;
  isInfo: boolean = false;
  isBought: boolean = false;
  isExecutive: boolean = false;
  isMarket: boolean = false;
  company!: string;
  geoJson: any;
  infoData: any;
  staticData: any;
  latestData: any;
  isEmailSubmit: boolean = false;
  emailSubMessage: string;
  emailSubValid: boolean = false;
  pdfForm: any;
  isBrowser: boolean = false;
  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object,
    private httpClient: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.pdfForm = fb.group({
      emailInput: [
        '',
        Validators.compose([
          Validators.required,
          ValidationService.emailValidator,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.setInit();
  }
  setInit() {
    this.route.paramMap.subscribe((params) => {
      this.brandSlug = params.get('brandSlug');
      this.apiService
        .getAPI(`get-brand-by-slug/${this.brandSlug}`)
        .subscribe((response) => {
          if (response.status === 404) {
            this.router.navigateByUrl('/404');
          } else {
            this.company = response.name;
            this.apiService
              .getAPI(`${this.brandSlug}/brand-view`)
              .subscribe((response) => {
                this.brandInfo = response.data;
              });
            this.setTab();
            this.getContents(params.get('item'));
          }
        });
    });
    this.categories = [
      { name: 'BRAND INFO', value: 'info' },
      { name: 'DOWNLOAD BRAND PDF', value: 'brand_pdf' },
      { name: 'LATEST STORIES', value: 'latest_stories' },
      { name: 'Why I BOUGHT', value: 'why-i-bought' },
      { name: 'EXECUTIVE Q&A', value: 'executive' },
      { name: 'AVAILABLE MARKETS', value: 'available-markets' },
    ];
    this.staticContent = ['why-i-bought', 'executive', 'available-markets'];
    this.apiService
      .getAPI(`${this.brandSlug}/brand-pdf`)
      .subscribe((response) => {
        if (response.data != '') {
          this.pdf = response.data;
        }
      });
  }
  changeDownPDFUrl(url: any) {
    return url?.replace('api.', '');
  }
  isVideo(item: any) {
    return this.commonService.isVideo(item);
  }
  getInquiry() {
    this.apiService
      .getAPI(`${this.brandSlug}/brand/inquire`)
      .subscribe((response) => {
        this.inquireForm = response.schema;
      });
  }

  setTab() {
    this.apiService
      .getAPI(`${this.brandSlug}/brand-info`)
      .subscribe(async (response) => {
        let info = response.data.length > 0 ? true : false;
        this.validData.push(info);
        let pdf = this.pdf != '' ? true : false;
        this.validData.push(pdf);
        this.apiService
          .getAPI(`${this.brandSlug}/brand-latest-stories`)
          .subscribe(async (response) => {
            let latest = response.data.length > 0 ? true : false;
            this.validData.push(latest);
            this.apiService
              .getAPI(`${this.brandSlug}/brand-static-content`)
              .subscribe(async (response) => {
                let bought = response.data.find(
                  (o: any) => o.slug === 'why-i-bought'
                )
                  ? true
                  : false;

                this.validData.push(bought);
                let qa = response.data.find((o: any) => o.slug === 'executive')
                  ? true
                  : false;
                this.validData.push(qa);
                let market = response.data.find(
                  (o: any) => o.slug === 'available-markets'
                )
                  ? true
                  : false;
                this.validData.push(market);
              });
          });
      });
  }
  getContents(item: string | null) {
    let path;
    if (item === 'info') {
      path = 'brand-info';
      this.isInfo = true;
      this.selectedIndex = 0;
    } else if (item === 'latest_stories') {
      path = 'brand-latest-stories';
      this.isStory = true;
      this.selectedIndex = 2;
    } else if (this.staticContent.includes(item)) {
      path = 'brand-static-content';
    }
    this.apiService
      .getAPI(`${this.brandSlug}/${path}`)
      .subscribe((response) => {
        this.items = response;

        if (
          item === 'why-i-bought' &&
          this.items.data.find((o: any) => o.slug === 'why-i-bought')
        ) {
          this.items = this.items.data.find(
            (o: any) => o.slug === 'why-i-bought'
          );
          this.metaService.setSeo(this.items.meta);
          this.apiService.getAPI(`1851/publication-instance`).subscribe((result) => {
            this.metaService.setTitle(`${this.items.meta.seo.title} | ${result.title}`);
          });
          this.isBought = true;
          this.selectedIndex = 3;
        } else if (
          item === 'executive' &&
          this.items.data.find((o: any) => o.slug === 'executive')
        ) {
          this.items = this.items.data.find((o: any) => o.slug === 'executive');
          this.metaService.setSeo(this.items.meta);
          this.apiService.getAPI(`1851/publication-instance`).subscribe((result) => {
            this.metaService.setTitle(`${this.items.meta.seo.title} | ${result.title}`);
          });
          this.isExecutive = true;
          this.selectedIndex = 4;
        } else if (
          item === 'available-markets' &&
          this.items.data.find((o: any) => o.slug === 'available-markets')
        ) {
          this.items = this.items.data.find(
            (o: any) => o.slug === 'available-markets'
          );
          this.metaService.setSeo(this.items.meta);
          this.apiService.getAPI(`1851/publication-instance`).subscribe((result) => {
            this.metaService.setTitle(`${this.items.meta.seo.title} | ${result.title}`);
          });
          this.isMarket = true;
          this.selectedIndex = 5;

          const states = [];
          this.items['available-markets'].forEach((marketData) => {
            marketData.countries.forEach((m) => {
              states.push(m);
            });
          });
          const vm = this;
          this.httpClient
            .get('../../../assets/js/us-states.json')
            .subscribe((json: any) => {
              this.geoJson = json;
              vm.drawMap(this.items);
              window.onresize = function () {};
            });
        }
      });
  }
  emailSubscribe(pdfform: FormGroup) {
    this.isEmailSubmit = true;
    this.emailSubMessage = '';
    if (!pdfform.valid) {
      return;
    }
    const payload = {
      email: pdfform.controls['emailInput'].value,
    };
    this.apiService
      .postAPI(`${this.brandSlug}/brand-pdf`, payload)
      .subscribe((res) => {
        $('#pdfModal').hide();
        if (res.success) {
          window.open(this.pdf.media.url.replace('api.', ''), '_blank');
        } else {
          this.emailSubValid = true;
          this.emailSubMessage = res.message;
        }
      });
  }
  shareUrl() {
    return window.location.href;
  }
  marketingColor(state, items) {
    if (items['available-markets'] === null) {
      return '#bcb29a';
    }
    for (let n = 0; n < items['available-markets'].length; n++) {
      for (let i = 0; i < items['available-markets'][n].countries.length; i++) {
        if (
          state.properties.abbr ===
          items['available-markets'][n].countries[i].iso2_code
        ) {
          return items['available-markets'][n].color;
        }
      }
    }
    return '#bcb29a';
  }
  drawMap(items) {
    const isMobile = window.outerWidth < 600 ? true : false;
    const vm = this;
    let gadget_projection,
      gadget_path,
      gadget_svg,
      gadget_g,
      gadget_states,
      gadget_labels;
    gadget_projection = d3
      .geoAlbersUsa()
      .scale(isMobile ? 400 : 1000)
      .translate([0, 0]);
    gadget_path = d3.geoPath().projection(gadget_projection);
    gadget_svg = d3.selectAll('#map');
    if (isMobile) {
      gadget_svg.attr('width', 345).attr('height', 300);
    }
    gadget_g = gadget_svg
      .append('g')
      .attr(
        'transform',
        isMobile ? 'translate(150, 130)' : 'translate(370, 230)'
      )
      .append('g')
      .attr('class', 'states');
    gadget_states = gadget_g
      .selectAll('path')
      .data(this.geoJson.features)
      .enter()
      .append('path')
      .attr('d', gadget_path)
      .style('stroke', '#000')
      .style('stroke-width', '1')
      .attr('name', function (d) {
        return 'path-' + d.properties.abbr;
      })
      .style('fill', function (d) {
        return vm.marketingColor(d, items);
      });
    gadget_g
      .selectAll('rect')
      .data(this.geoJson.features)
      .enter()
      .filter(function (d) {
        if (
          !isMobile &&
          (d.properties.abbr === 'MA' ||
            d.properties.abbr === 'RI' ||
            d.properties.abbr === 'NJ' ||
            d.properties.abbr === 'CT' ||
            d.properties.abbr === 'HI' ||
            d.properties.abbr === 'NJ' ||
            d.properties.abbr === 'DE' ||
            d.properties.abbr === 'MD' ||
            d.properties.abbr === 'DC' ||
            d.properties.abbr === 'VT' ||
            d.properties.abbr === 'NH')
        ) {
          return true;
        }
        return false;
      })
      .append('rect')
      .attr('transform', function (d) {
        if (!isMobile && d.properties.abbr === 'HI') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] + 30) +
            ',' +
            gadget_path.centroid(d)[1] +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'VT') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] - 40) +
            ',' +
            (gadget_path.centroid(d)[1] - 40) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'NH') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] - 40) +
            ',' +
            (gadget_path.centroid(d)[1] - 70) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'MA') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] - 30) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'RI') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] - 15) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'CT') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] + 5) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'DE') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] + 27) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'MD') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            gadget_path.centroid(d)[1] +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'DC') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] + 45) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'NJ') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 35) +
            ',' +
            (gadget_path.centroid(d)[1] + 1) +
            ')'
          );
        }
        return (
          'translate(' +
          gadget_path.centroid(d)[0] +
          ',' +
          (gadget_path.centroid(d)[1] - 15) +
          ')'
        );
      })
      .attr('width', function (d) {
        return 30;
      })
      .attr('height', function (d) {
        return 20;
      })
      .attr('stroke', '#000000')
      .attr('stroke-width', '2')
      .style('fill', function (d) {
        return vm.marketingColor(d, items);
      });
    gadget_labels = gadget_g
      .selectAll('text')
      .data(this.geoJson.features)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('stroke', '#f2f2f2')
      .attr('font-size', '12px')
      .attr('transform', function (d) {
        if (!isMobile && d.properties.abbr === 'HI') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] + 40) +
            ',' +
            (gadget_path.centroid(d)[1] + 15) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'VT') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] - 32) +
            ',' +
            (gadget_path.centroid(d)[1] - 25) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'NH') {
          return (
            'translate(' +
            (gadget_path.centroid(d)[0] - 32) +
            ',' +
            (gadget_path.centroid(d)[1] - 55) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'MA') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] - 15) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'RI') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            gadget_path.centroid(d)[1] +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'CT') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 20) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'DE') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 42) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'MD') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 15) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'DC') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 60) +
            ')'
          );
        }
        if (!isMobile && d.properties.abbr === 'NJ') {
          return (
            'translate(' +
            ($('#map').width() / 2 - 27) +
            ',' +
            (gadget_path.centroid(d)[1] + 16) +
            ')'
          );
        }
        return 'translate(' + gadget_path.centroid(d) + ')';
      })
      .text(function (d) {
        return d.properties.abbr;
      })
      .call(this.getBB);
  }

  getBB(selection) {
    selection.each(function (d) {
      d.bbox = this.getBBox();
    });
  }
}
