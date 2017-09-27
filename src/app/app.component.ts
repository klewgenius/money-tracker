import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  ngAfterViewInit() {
    // Workaround for metis plugin.
    (<any>$('#side-menu')).metisMenu();
  }
}
