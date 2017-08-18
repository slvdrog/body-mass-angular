"use strict";angular.module("bodyMassApp",["ngCookies","ngResource","ui.router","ngSanitize","ngTouch","ng-token-auth","ui.bootstrap"]).config(["$stateProvider",function(a){a.state("welcome",{url:"/",templateUrl:"views/main.html"}).state("about",{url:"/about",templateUrl:"views/about.html"}).state("bmi",{url:"/calculator",templateUrl:"views/bmi.html",controller:"CalculatorCtrl"}).state("sign_in",{url:"/sign_in",templateUrl:"views/sign_in.html"}).state("sign_up",{url:"/sign_up",templateUrl:"views/sign_up.html"})}]).config(["$authProvider",function(a){a.configure({apiUrl:"https://body-mass-api.herokuapp.com",validateOnPageLoad:!1})}]).config(["$qProvider",function(a){a.errorOnUnhandledRejections(!1)}]).run(["$rootScope","$state","alertService",function(a,b,c){a.$on("auth:login-success",function(a,d){c.add("success","Sign in successfull"),b.go("bmi")}),a.$on("auth:login-error",function(a,b){c.add("danger","Sign in failed.")}),a.$on("auth:logout-success",function(a){c.add("success","Sign out successfull."),b.go("welcome")}),a.$on("auth:registration-email-success",function(a,d){c.add("success","Sign up successfull, please log in."),b.go("sign_in")}),a.$on("auth:registration-email-error",function(a,b){c.add("danger","Sign up failed.")}),a.$on("auth:session-expired",function(a){c.add("warning","Session expired."),b.go("welcome")})}]),angular.module("bodyMassApp").controller("CalculatorCtrl",["$scope","BodyMass","alertService","$state",function(a,b,c,d){a.category="",a.bmi="",a.handleBMIClick=function(){var c=a.bmiForm.height/100;b.save({height:c,weight:a.bmiForm.weight},function(b){a.bmi=b.bmi,a.category=b.category})},a.user.signedIn||(c.add("danger","You must be signed in to use the calculator. Please do so or sign up if you don't have an account"),d.go("sign_in"))}]),angular.module("bodyMassApp").service("BodyMass",["$resource","$auth",function(a,b){return a("https://body-mass-api.herokuapp.com/body_masses")}]),angular.module("bodyMassApp").factory("alertService",["$rootScope",function(a){var b;return a.alerts=[],b={add:function(c,d,e){a.alerts.push({type:c,msg:d,close:function(){return b.closeAlert(this)}}),e&&$timeout(function(){b.closeAlert(this)},e)},closeAlert:function(b){return this.closeAlertIdx(a.alerts.indexOf(b))},closeAlertIdx:function(b){return a.alerts.splice(b,1)}}}]),angular.module("bodyMassApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="jumbotron content-size"> <div>Web application to calculate the body mass index given the mass and height of the user.</div> <div>Created for a coding challenge as a part of job interview</div> <div>Angular Client Repository: <a href="https://github.com/slvdrog/body-mass-angular">body-mass-angular</a></div> <div>Rails API Repository: <a href="https://github.com/slvdrog/body-mass-api">body-mass-api</a></div> </div>'),a.put("views/bmi.html",'<div class="jumbotron content-size"> <p> To calculate your BMI, provide the data and hit Calculate</p> <form class="form-inline" ng-submit="handleBMIClick(bmiForm)" role="form"> <label class="sr-only" for="height">Height</label> <input type="number" name="height" id="height" ng-model="bmiForm.height" required class="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Your height in cms."> <label class="sr-only" for="weight">Weight</label> <input type="number" name="weight" id="weight" ng-model="bmiForm.weight" required class="form-control mb-2 mr-sm-2 mb-sm-0" step="0.01" placeholder="Your weight in kgs."> <div class="pt-2"> <button type="submit" class="btn btn-primary top-spacing">Calculate</button> </div> <p class="top-spacing" ng-if="bmi"> Your BMI is {{bmi}} </p> <p class="top-spacing" ng-if="category"> You are in the <b>{{category}}</b> category. </p> </form> </div>'),a.put("views/main.html",'<div class="jumbotron content-size"> <div>Calculate your body mass index</div> </div>'),a.put("views/sign_in.html",'<div class="jumbotron content-size"> <form ng-submit="submitLogin(loginForm)" role="form" ng-init="loginForm = {}" ng-if="!user.signedIn"> <div class="form-group"> <label for="email">Email</label> <input type="email" name="email" id="email" ng-model="loginForm.email" required class="form-control"> </div> <div class="form-group"> <label for="password">Password</label> <input type="password" name="password" id="password" ng-model="loginForm.password" required class="form-control"> </div> <button type="submit" class="btn btn-primary btn-lg">Sign in</button> </form> </div>'),a.put("views/sign_up.html",'<div class="jumbotron content-size"> <form ng-submit="submitRegistration(registrationForm)" role="form" ng-init="registrationForm = {}" ng-if="!user.signedIn"> <div class="form-group"> <label>Email</label> <input type="email" name="email" ng-model="registrationForm.email" required class="form-control"> </div> <div class="form-group"> <label>Password</label> <input type="password" name="password" ng-model="registrationForm.password" required class="form-control"> </div> <div class="form-group"> <label>Password confirmation</label> <input type="password" name="password_confirmation" ng-model="registrationForm.password_confirmation" required class="form-control"> </div> <button type="submit" class="btn btn-primary btn-lg">Register</button> </form> </div>')}]);