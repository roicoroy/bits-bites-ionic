import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WoocommerceProductsService, Product, ProductQuery } from 'src/services/woo/wooApi';
import { PopoverController, ModalController, Platform, AlertController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { WpApiPosts } from 'wp-api-angular';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

import * as firebase from "firebase/app";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
  slideOpts = {
    effect: 'flip',
    slidesPerView: 1
  };


  title = 'Home Sweet Home'
  products;
  posts;
  query:ProductQuery;
  wholeSale;
  
  user: any = {};
  url: any = "https://firebasestorage.googleapis.com/v0/b/bits-bites.appspot.com/o/sausage-flyer.png?alt=media&token=311b87f6-c75f-450d-93e0-a34ff55589cb";
  
  // public file: any = {};
  // public storageRef = firebase.storage();

  constructor(
        public activatedRoute: ActivatedRoute,
        private wooProducs: WoocommerceProductsService,
        public popoverController: PopoverController,
        private modalController: ModalController, 
        public plt: Platform,
        public alertController: AlertController,
        private wpApiPosts: WpApiPosts,
        public af: AngularFireAuth,
        public db: AngularFireDatabase,
        
      ) {
        // this.plt.ready().then(() => {
        //   if (this.plt.is('desktop')) {
        //     this.presentAlert();
        //   } else {
        //     // fallback to browser APIs
        //   }
        // });
        // this.getWholeSaleProducts();
        // this.getFeaturedProducts();
        // this.getPosts();
    }
    ngOnInit() {
      if (this.af.auth.currentUser) {
        this.db
          .object("/users/" + this.af.auth.currentUser.uid)
          .valueChanges()
          .subscribe((res: any) => {
            this.user = res;
            this.user.image = res.image ? res.image : "";
            this.url = res.image ? res.image : "https://firebasestorage.googleapis.com/v0/b/bits-bites.appspot.com/o/sausage-flyer.png?alt=media&token=311b87f6-c75f-450d-93e0-a34ff55589cb";
          });
      }
    }  
    isLoggedin() {
      return localStorage.getItem("uid") != null;
    }
    getPosts() {
        let headers = new Headers({
          'Content-Type': "text/html; charset=utf-8",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Max-Age': '1728000',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
          'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
        });
      this.wpApiPosts.getList( headers )
      .toPromise()
      .then( response => {
        let json: any = response.json();
        this.posts = json;
        console.log(this.posts);
      });
    }
    getFeaturedProducts(){
      this.query = {
        "featured": true,
      }
        this.wooProducs.retrieveProducts(this.query).subscribe((data) => {
          this.products = data.products
          console.log(this.products);
        },(err) => {
          console.log(err);
        }
      );
    }
    getWholeSaleProducts() {
      this.query = {
        "on_sale": true,
      }
      this.wooProducs.retrieveProducts(this.query).subscribe((data) => {
          this.wholeSale = data.products
          console.log(this.wholeSale);
        },(err) => {
          console.log(err);
        }
      );
    }
    
      // POP AND MODAL
      async openModal(id) {
        const modal = await this.modalController.create({
          component: ModalComponent,
          cssClass:"my-modal",
          componentProps: {
            id: id
          }
        });
        await modal.present();
      }
      async myPlatform (){
        if (this.plt.is('ios')) {
          // This will only print when on iOS
          console.log('I am an iOS device!');
        }
      } 
      async presentAlert() {
        const alert = await this.alertController.create({
          message: 'This website was designed for mobile screens...',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
    