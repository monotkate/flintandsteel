/* global describe */
/* global module */
/* global beforeEach */
/* global inject */
/* global it */
/* global expect */
/* global spyOn */

describe('SidenavCtrl', function() {
    "use strict";

    var $rootScope, scope, ctrl, $mdSidenav, $state, ideaSvcMock, loginSvcMock;

    beforeEach(module('flintAndSteel'));
    beforeEach(module('ui.router'));

    beforeEach(inject(function(_$rootScope_, $controller, _$state_, _$mdSidenav_, _ideaSvcMock_, _loginSvcMock_) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $state = _$state_;
        $mdSidenav = _$mdSidenav_;
        ideaSvcMock = _ideaSvcMock_;
        loginSvcMock = _loginSvcMock_;

        spyOn($state, 'go');
        /*
        // TODO - figure out how to test the $mdSidenav calls
        spyOn($mdSidenav, 'isLockedOpen');
        spyOn($mdSidenav, 'close');
        */

        ctrl = $controller('SidenavCtrl', {
            $scope: scope,
            $state: $state,
            $mdSidenav: $mdSidenav,
            ideaSvc: ideaSvcMock,
            loginSvc: loginSvcMock
        });
    }));

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });

    describe('$scope.navTo()', function() {
        var state;

        beforeEach(function() {
            state = undefined;
        });

        it('should navigate to the passed in state', function() {
            state = 'home';
            scope.navTo(state);

            expect($state.go).toHaveBeenCalledWith(state);
            // TODO - figure out how to test the $mdSidenav calls.
        });

        it('should navigate to the home if user is guest and tries to add idea', function() {
            var expectedState = 'home';

            state = 'addIdea';
            scope.navTo(state);

            expect($state.go).toHaveBeenCalledWith(expectedState);
            // TODO - figure out how to test the $mdSidenav calls.
        });

        it('should navigate to the add idea page if user is logged in and tries to add idea', function() {
            var account = {'username': 'MainManDarth'};

            loginSvcMock.checkLogin(account);
            state = 'addIdea';
            scope.navTo(state);

            expect($state.go).toHaveBeenCalledWith(state);
            // TODO - figure out how to test the $mdSidenav calls.
        });

        it('should navigate to the idea with id mock_idea', function() {
            state = 'idea';
            scope.navTo(state);

            expect($state.go).toHaveBeenCalledWith(state, {ideaId: 'mock_idea'});
            // TODO - figure out how to test the $mdSidenav calls.
        });
    });

    describe('$scope.$on(newIdeaAdded)', function() {

        beforeEach(function() {
            spyOn(ideaSvcMock, 'getIdeaHeaders');
        });

        it('should catch the newIdeaAdded event', function() {
            $rootScope.$emit('newIdeaAdded');

            expect(ideaSvcMock.getIdeaHeaders).toHaveBeenCalled();
        });
    });

});
