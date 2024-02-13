webpackJsonp([0],{

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_chat_chat__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_chat_model__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, userService, authService, chatService, menuCtrl) {
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.authService = authService;
        this.chatService = chatService;
        this.menuCtrl = menuCtrl;
        this.view = "chats";
    }
    HomePage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.users = this.userService.users;
        this.chats = this.chatService.chats;
        this.menuCtrl.enable(true, 'user-menu');
    };
    HomePage.prototype.onChatCreate = function (user) {
        var _this = this;
        this.userService.currentUser.first().subscribe(function (currentUser) {
            _this.chatService.getChat(currentUser.$key, user.$key).first().subscribe(function (chat) {
                if (chat.hasOwnProperty("$value")) {
                    var timestamp = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database.ServerValue.TIMESTAMP;
                    var chat1 = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */]('', timestamp, user.name, '');
                    _this.chatService.create(chat1, currentUser.$key, user.$key);
                    var chat2 = new __WEBPACK_IMPORTED_MODULE_5__models_chat_model__["a" /* Chat */]('', timestamp, user.name, '');
                    _this.chatService.create(chat2, user.$key, currentUser.$key);
                }
            });
        });
        this.navCtrl.push("ChatPage", { user: user });
    };
    HomePage.prototype.onSignUp = function () {
        this.navCtrl.push("SignupPage");
    };
    HomePage.prototype.onChat = function (chat) {
        var _this = this;
        var userId = chat.$key;
        this.userService.getUserById(userId).first().subscribe(function (user) {
            _this.navCtrl.push("ChatPage", { user: user });
        });
    };
    HomePage.prototype.filterItems = function (event) {
        var search = event.target.value;
        this.users = this.userService.users;
        this.chats = this.chatService.chats;
        if (search) {
            switch (this.view) {
                case 'chats':
                    this.chats = this.chats.map(function (chats) {
                        return chats.filter(function (chat) {
                            return (chat.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
                        });
                    });
                    break;
                case 'users':
                    this.users = this.users.map(function (users) {
                        return users.filter(function (user) {
                            return (user.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
                        });
                    });
                    break;
            }
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/luidi/Desktop/projetos/ionic3-chat-firebase/src/pages/home/home.html"*/'<ion-header>\n  <logged-header [title]="view"></logged-header>\n\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="view">\n      <ion-segment-button value="chats">Chats</ion-segment-button>\n      <ion-segment-button value="users">Users</ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n  <ion-toolbar>\n    <ion-searchbar (ionInput)="filterItems($event)"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <div [ngSwitch]="view">\n    <ion-list *ngSwitchCase="\'chats\'" no-lines>\n      <button ion-item *ngFor="let chat of chats | async" (click)="onChat(chat)">\n        <ion-avatar item-left>\n          <div id="avatar">\n            <img class="round" [src]="chat.photo || \'assets/imgs/logo.png\'">\n          </div>\n        </ion-avatar>\n        <h2>{{chat.title}}</h2>\n        <p *ngIf="chat.lastMessage; else customMessage">{{chat.timestamp | date:\'dd/MM/y H:mm\'}} - {{chat.lastMessage}}</p>\n        <ng-template #customMessage>\n          <p>No message</p>\n        </ng-template>\n      </button>\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'users\'" no-lines>\n      <button ion-item *ngFor="let user of users | async" (click)="onChatCreate(user)">\n        <ion-avatar item-left>\n          <div id="avatar">\n            <img class="round" [src]="user.photo || \'assets/imgs/logo.png\'">\n          </div>\n        </ion-avatar>\n        {{user.name}}\n      </button>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/luidi/Desktop/projetos/ionic3-chat-firebase/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__providers_chat_chat__["a" /* ChatService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
var Chat = /** @class */ (function () {
    function Chat(lastMessage, timestamp, title, photo) {
        this.lastMessage = lastMessage;
        this.timestamp = timestamp;
        this.title = title;
        this.photo = photo;
    }
    return Chat;
}());

//# sourceMappingURL=chat.model.js.map

/***/ })

});
//# sourceMappingURL=0.js.map