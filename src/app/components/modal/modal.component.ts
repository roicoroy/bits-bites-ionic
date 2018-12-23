import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { WoocommerceProductsService } from 'src/services/woo/wooApi';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

   
  passedId = null;
  product;
  query;
  constructor(
    private navParams: NavParams, 
    private modalController: ModalController,
    private wooProducs: WoocommerceProductsService,
    ) { }


  ngOnInit() {
    this.passedId = this.navParams.get('id');
    this.wooProducs.retrieveProduct(this.passedId)
      .subscribe((data) => {
        this.product = data;
        console.log(this.product)  
      },
      (err) => {
        console.log(err);
      },
    
      () => {
        console.log("completed");
      }
    );
  }
 
  closeModal() {
    this.modalController.dismiss();
  }

}
