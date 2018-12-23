import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 import { Plugins } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // public appPages = [
  //   {
  //     title: 'Home',
  //     url: '/home',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'Login',
  //     url: '/login',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'Products',
  //     url: '/products',
  //     icon: 'home'
  //   }
  // ];
  user = {
    'name': 'Ricardo',
    'img': 'https://firebasestorage.googleapis.com/v0/b/bits-bites.appspot.com/o/sausage-flyer.png?alt=media&token=311b87f6-c75f-450d-93e0-a34ff55589cb',
  }
  
  name: any;
  imageUrl: any = "https://firebasestorage.googleapis.com/v0/b/bits-bites.appspot.com/o/sausage-flyer.png?alt=media&token=311b87f6-c75f-450d-93e0-a34ff55589cb";
  rootPage: string = "HomePage";
  public uid: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    
  ) {
    this.uid = localStorage.getItem("uid");
    if (this.uid != null) {
      this.db
        .object("/users/" + this.uid)
        .valueChanges()
        .subscribe((res: any) => {
          this.name = res.name;
          this.imageUrl = res.image != "" && res.image != null ? res.image : "https://firebasestorage.googleapis.com/v0/b/bits-bites.appspot.com/o/sausage-flyer.png?alt=media&token=311b87f6-c75f-450d-93e0-a34ff55589cb";
        });
      }

    this.initializeApp();
  }
  isLoggedin() {
    return localStorage.getItem("uid") != null;
  }
  navigate(url: string) {
    return this.router.navigateByUrl(url);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
