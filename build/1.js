webpackJsonp([1],{

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfilePageModule", function() { return UserProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_profile__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var UserProfilePageModule = /** @class */ (function () {
    function UserProfilePageModule() {
    }
    UserProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__user_profile__["a" /* UserProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user_profile__["a" /* UserProfilePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], UserProfilePageModule);
    return UserProfilePageModule;
}());

//# sourceMappingURL=user-profile.module.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserProfilePage = /** @class */ (function () {
    function UserProfilePage(navCtrl, navParams, authService, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.userService = userService;
        this.canEdit = false;
    }
    UserProfilePage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    UserProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userService.currentUser.subscribe(function (user) {
            _this.user = user;
        });
    };
    UserProfilePage.prototype.onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.photo) {
            var uploadTesk_1 = this.userService.uploadPhoto(this.photo, this.user.$key);
            uploadTesk_1.on('state_changed', function (snapshot) {
                _this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, function (error) {
            }, function () {
                _this.editUser(uploadTesk_1.snapshot.downloadURL);
            });
        }
        else {
            this.editUser();
        }
    };
    UserProfilePage.prototype.onPhoto = function (event) {
        this.photo = event.target.files[0];
    };
    UserProfilePage.prototype.editUser = function (photoUrl) {
        var _this = this;
        this.userService.edit({ name: this.user.name, username: this.user.username, photo: photoUrl || this.user.photo || '' }).then(function () {
            _this.canEdit = false;
            _this.photo = undefined;
            _this.uploadProgress = 0;
        });
    };
    UserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-profile',template:/*ion-inline-start:"/home/luidi/Desktop/projetos/ionic3-chat-firebase/src/pages/user-profile/user-profile.html"*/'<ion-header>\n  <logged-header [title]="\'User Profile\'"></logged-header>\n</ion-header>\n\n<ion-content padding>\n  <user-info [user]="user"></user-info>\n\n  <button ion-button block (click)="canEdit = !canEdit">Edit</button>\n\n  <form (ngSubmit)="onSubmit($event)" *ngIf="canEdit" #profileForm="ngForm">\n    <ion-item>\n      <ion-icon name="person" item-left></ion-icon>\n      <ion-input type="text" placeholder="Name" name="name" [(ngModel)]="user.name" required minlenght="3"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="at" item-left></ion-icon>\n      <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="user.username" required minlenght="3"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="image" item-left></ion-icon>\n      <input type="file" accept="image/*" (change)="onPhoto($event)">\n    </ion-item>\n\n    <progress-bar *ngIf="uploadProgress" [progress]="uploadProgress"></progress-bar><br>\n\n    <button ion-button block type="submit" [disabled]="profileForm.form.invalid">Save</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/luidi/Desktop/projetos/ionic3-chat-firebase/src/pages/user-profile/user-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserService */]])
    ], UserProfilePage);
    return UserProfilePage;
}());

//# sourceMappingURL=user-profile.js.map

/***/ })

});
//# sourceMappingURL=1.js.map