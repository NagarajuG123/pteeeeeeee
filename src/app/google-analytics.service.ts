import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
declare var ga: Function;

@Injectable()
export class GoogleAnalyticsService {

  constructor(public router: Router) {
  }


  /**
   * Emit google analytics event
   * Fire event example:
   * this.emitEvent("testCategory", "testAction", "testLabel", 10);
   * @param {string} eventCategory
   * @param {string} eventAction
   * @param {string} eventLabel
   * @param {number} eventValue
   */
  public emitEvent(eventCategory: string,
   eventAction: string,
   eventLabel: string = null,
   eventValue: number = null) {
    if (typeof ga === 'function') {
      ga('send', 'event', {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });
    }
  }

  public appendGaTrackingCode(franchise_code, tracking_code, gtm_code, name) {
    try {
      if (typeof gtm_code !== 'undefined' && gtm_code !== null) {
        const script = document.createElement('script');
        script.setAttribute('id', 'tracking_code');
        script.type = 'text/javascript';
        script.innerHTML = `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create','${tracking_code}','auto',{'name': '${name}'});
          ga('require','displayfeatures');
          setTimeout(ga('send','event','Profitable Engagement','time on page more than 3 minutes'),180000);
          setTimeout(ga('${name}.send','event','Profitable Engagement','time on page more than 3 minutes'),180000)
        `;
        document.head.appendChild(script);
        const script_2 = document.createElement('script');
        script_2.setAttribute('id', 'gtm_code');
        script_2.type = 'text/javascript';
        script_2.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtm_code}');
        `;
        document.head.appendChild(script_2);

        const no_script = document.createElement('noscript');
        no_script.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtm_code}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.appendChild(no_script);
      } else {
        const script = document.createElement('script');
        script.setAttribute('id', 'tracking_code');
        script.type = 'text/javascript';
        script.innerHTML = `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create','${tracking_code}','auto',{'name': '${name}'});
          ga('${name}.send','pageview');
        `;
        document.head.appendChild(script);
      }
    } catch (ex) {
    }
  }

  public appendGaEventTrackingCode(tracking_code, socialNetwork, url, name) {
    try {
      const script = document.createElement('script');
      script.setAttribute('id', 'sharethis_event_tracking_code');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create','${tracking_code}','auto',{'name': '${name}'});
        ga('${name}.send', {
          hitType: 'social',
          socialNetwork: '${socialNetwork}',
          socialAction: 'share',
          socialTarget: '${url}'
        });
      `;
      document.head.appendChild(script);
    } catch (ex) {
    }
  }

  public appendGaEventOutboundLink(tracking_code, category, action, label, name) {
    try {
      const script = document.createElement('script');
      script.setAttribute('id', 'outbound_event_tracking_code');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '${tracking_code}', 'auto', {'name': '${name}'});
        ga('${name}.send', 'event', '${category}', '${action}', '${label}');
      `;
      document.head.appendChild(script);
    } catch (ex) {
    }
  }
}
