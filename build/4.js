webpackJsonp([4],{

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageModule", function() { return ChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ChatPageModule = /** @class */ (function () {
    function ChatPageModule() {
    }
    ChatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], ChatPageModule);
    return ChatPageModule;
}());

//# sourceMappingURL=chat.module.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_message_model__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_message_message__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_chat_chat__ = __webpack_require__(221);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ChatPage = /** @class */ (function () {
    function ChatPage(navCtrl, navParams, authService, userService, messageService, chatService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.userService = userService;
        this.messageService = messageService;
        this.chatService = chatService;
    }
    ChatPage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.recipient = this.navParams.get("user");
        this.title = this.recipient.name;
        this.userService.currentUser.first().subscribe(function (currentUser) {
            _this.sender = currentUser;
            _this.chat1 = _this.chatService.getChat(_this.sender.$key, _this.recipient.$key);
            _this.chat2 = _this.chatService.getChat(_this.recipient.$key, _this.sender.$key);
            if (_this.recipient.photo) {
                _this.chat1.first().subscribe(function (chat) {
                    _this.chatService.updatePhoto(_this.chat1, chat.photo, _this.recipient.photo);
                });
            }
            var doSubscription = function () {
                _this.messages.subscribe(function (messages) {
                    _this.scrollToBottom(0);
                });
            };
            _this.messages = _this.messageService.getMessages(_this.sender.$key, _this.recipient.$key);
            _this.messages.first().subscribe(function (messages) {
                if (messages.length == 0) {
                    _this.messages = _this.messageService.getMessages(_this.recipient.$key, _this.sender.$key);
                    doSubscription();
                }
                else {
                    doSubscription();
                }
            });
        });
    };
    ChatPage.prototype.sendMessage = function (newMessage) {
        var _this = this;
        if (newMessage) {
            var timestamp_1 = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database.ServerValue.TIMESTAMP;
            this.messageService.create(new __WEBPACK_IMPORTED_MODULE_4__models_message_model__["a" /* Message */](this.sender.$key, newMessage, timestamp_1), this.messages).then(function () {
                _this.chat1.update({
                    lastMessage: newMessage,
                    timestamp: timestamp_1
                });
                _this.chat2.update({
                    lastMessage: newMessage,
                    timestamp: timestamp_1
                });
            });
        }
    };
    ChatPage.prototype.scrollToBottom = function (duration) {
        var _this = this;
        setTimeout(function () {
            if (_this.content && _this.content.scrollToBottom) {
                _this.content.scrollToBottom(duration || 300);
            }
        }, 50);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]) === "function" && _a || Object)
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/home/luidi/Desktop/projetos/ionic3-chat-firebase/src/pages/chat/chat.html"*/'<ion-header>\n  <logged-header [title]="title" [user]="recipient"></logged-header>\n</ion-header>\n\n<ion-content padding>\n  <message-box *ngFor="let message of messages | async" [message]="message" [isSender]="(message.userId == sender.$key)"></message-box>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-item no-lines>\n      <ion-input type="text" placeholder="Message..." [(ngModel)]="newMessage" (keyup.enter)="sendMessage(newMessage); newMessage=\'\'"></ion-input>\n      <button ion-button item-right (click)="sendMessage(newMessage); newMessage=\'\'"><ion-icon name="send"></ion-icon></button>\n    </ion-item>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/luidi/Desktop/projetos/ionic3-chat-firebase/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__providers_message_message__["a" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_message_message__["a" /* MessageService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__providers_chat_chat__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_chat_chat__["a" /* ChatService */]) === "function" && _g || Object])
    ], ChatPage);
    return ChatPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=chat.js.map

/***/ })

});
//# sourceMappingURL=4.js.map