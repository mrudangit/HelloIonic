import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PickerController} from '@ionic/angular';
import {FxMarketData} from './FxMarketData';

@Component({
  selector: 'app-fx.tiles',
  templateUrl: './fx.tiles.component.html',
  styleUrls: ['./fx.tiles.component.scss'],
})
export class FxTilesComponent implements OnInit {
  public folder: string;
  rows: FxMarketData[] = [];
  defaultColumnOptions = [
    [
      'EUR/GBP',
      'USD/CAD',
      'USD/PHP',
      'USD/KRW',
      'USD/TWD'
    ]
  ];
  private timer: any;

  constructor(private activatedRoute: ActivatedRoute, private pickerController: PickerController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // this.rows.push({Symbol: 'EUR/USD', Qty: '100', Bid: 100.5, Ask: 102.5});
    // this.rows.push({Symbol: 'USD/JPY', Qty: '2000', Bid: 200.5, Ask: 302.5});
    this.timer = setInterval(() => {
      if (this.rows.length > 0) {
        this.rows.forEach(value => {
          value.Bid = Math.floor(Math.random() * 100);
          value.Ask = Math.floor(Math.random() * 100);

        });
      }
    }, 1000);
  }

  async openPicker($event: MouseEvent) {
    await this.openPickerAsync();
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    const options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      });
    }

    return options;
  }
  getColumns(numColumns, numOptions, columnOptions) {
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: 'Symbol',
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  async openPickerAsync(numColumns = 1, numOptions = 5, columnOptions = this.defaultColumnOptions) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value : ${value.Symbol.text}`);
            const md = new FxMarketData();
            md.Symbol = value.Symbol.text;
            md.Qty = Math.floor(Math.random() * 1000);
            this.rows.push(md);
          }
        }
      ]
    });

    await picker.present();
  }

}
