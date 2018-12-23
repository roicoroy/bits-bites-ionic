import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { WoocommerceProductsService } from 'src/services/woo/wooApi';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})

export class PopoverComponent  implements OnInit {
  id
  product
  passedId = null;
  constructor(
    
    private popoverController: PopoverController,
    private activatedRoute: ActivatedRoute,
    private wooProducs: WoocommerceProductsService,
    private navParams: NavParams,
  ) { 

  }
  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }

  ionViewWillEnter(){
    let id: any = this.activatedRoute.snapshot.paramMap.get('custom_id');
    // this.product = this.wooProducs.retrieveProduct(id)
    // console.log(this.id)
  }
 
  closePopover() {
    this.popoverController.dismiss();
  }

}
