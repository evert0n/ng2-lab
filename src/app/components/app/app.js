"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var services_1 = require('../../services');
var pipes_1 = require('../../pipes');
var auth_1 = require('../auth/auth');
var login_1 = require('../login/login');
var reset_password_1 = require('../reset_password/reset_password');
var register_1 = require('../register/register');
var account_1 = require('../account/account');
var todos_1 = require('../todos/todos');
var github_issue_reader_1 = require('../github_issue_reader/github_issue_reader');
var github_issue_reader_repo_1 = require('../github_issue_reader_repo/github_issue_reader_repo');
var App = (function () {
    function App(router, location, client) {
        client.session.subscribe(function (auth) {
            router.recognize(location.path()).then(function (instruction) {
                if (auth && isAuthComponent(instruction))
                    router.navigate(['/Todos']);
                else if (!auth && !isAuthComponent(instruction))
                    router.navigate(['/Auth', 'Login']);
            });
        });
    }
    App = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.Emulated,
            templateUrl: './app.html',
            styleUrls: [
                './app.css'
            ],
            directives: [
                common_1.CORE_DIRECTIVES,
                router_1.ROUTER_DIRECTIVES
            ],
            pipes: [
                pipes_1.LowerCasePipe
            ]
        }),
        router_1.RouteConfig([
            {
                path: '/',
                component: todos_1.Todos,
                useAsDefault: true,
                as: 'Todos'
            },
            {
                path: '/account',
                component: account_1.Account,
                as: 'Account'
            },
            {
                path: '/login/...',
                component: auth_1.Auth,
                as: 'Auth'
            },
            {
                path: '/github-issue-reader',
                component: github_issue_reader_1.GithubIssueReader,
                as: 'GithubIssueReader'
            },
            {
                path: '/github-issue-reader/repo/:org/:repo',
                component: github_issue_reader_repo_1.GithubIssueReaderRepo,
                as: 'GithubIssueReaderRepo'
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, router_1.Location, services_1.AuthClient])
    ], App);
    return App;
}());
exports.App = App;
function isAuthComponent(instruction) {
    if (!instruction)
        return false;
    var component = instruction.component.componentType;
    return component === auth_1.Auth
        || component === login_1.Login
        || component === reset_password_1.ResetPassword
        || component === register_1.Register;
}
//# sourceMappingURL=app.js.map