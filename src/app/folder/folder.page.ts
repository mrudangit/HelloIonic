import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PickerController} from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
    rows: any = [];
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
    this.rows.push({Symbol: 'EUR/USD', Qty: '100', Bid: 100.5, Ask: 102.5});
    this.rows.push({Symbol: 'USD/JPY', Qty: '2000', Bid: 200.5, Ask: 302.5});
    this.timer = setInterval(() => {
      this.rows[0].Bid = Math.floor(Math.random() * 100);
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
          }
        }
      ]
    });

    await picker.present();
  }
}
